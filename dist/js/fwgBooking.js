function showBooking(seat)
{
  const driver = new Driver({ opacity: 0.4, showButtons: false, stageBackground: '#ffffff', allowClose: true });
  var seat_id = "#"+seat;
  $(seat_id).click(function(){
    //
    var booking_employee_date = $('#titleDatetime').val();
    
    var request = $.ajax({
      method: "POST",url: "api/read.php",
      data: { action:"showseat", booking_seat_id:seat , booking_employee_date:booking_employee_date  }
    });
    request.fail(function (jqXHR, textStatus) {
      //504
      $("#msgbox").html("Please Check Internet");
    });
    request.done(function(msg) {

      var title = titleForm(2,seat,booking_employee_date);
      
      var description = '';
      var code = msg.code;
      if(code==200)
      {
        description += "<div class='col'>";
        // console.log(msg);
        var seat_status = msg.seat_status;
        var list = msg.list;
        $.each( list, function( key, msg ) {
          var first_name_en = msg.first_name_en;
          var last_name_en = msg.last_name_en;
          var booking_employee_time_start = msg.booking_employee_time_start;
          var booking_employee_time_end = msg.booking_employee_time_end;
          var booking_employee_id = msg.booking_employee_id;
          description += BookingStatudCard(first_name_en,last_name_en,booking_employee_id,seat,booking_employee_time_start,booking_employee_time_end);
        });

        // if(seat_status!=2)
        // {
          description += ToggleFormButton();
        // }

        description +="</div>";
        description +="<div class='row' id='alert-booking-form'>";
        description +="</div>";
      }
      else if(code==404)
      {
        // var datenow = FWGDate('today','int');
        // if( datenow < booking_employee_date ){
        //   console.log('<');
        // }
        // else if( datenow >= booking_employee_date )
        // {
        //   console.log('>=');
          description += BookingForm(seat);
        // }
      }

      driver.highlight({
        element: seat_id,
        popover: {
          title: title,
          description: description,
          position: 'top',
        } 
      });
    });
    //
  });
}

function ToggleFormB()
{
  var ch = $('#InputStartAllDay').is(":checked");
  if(ch==false)
  {
    $('#booking-form1').removeClass("d-none");
    $('#booking-form2').removeClass("d-none");
  }
  else
  {
    $('#booking-form1').addClass("d-none");
    $('#booking-form2').addClass("d-none");
  }
}

function ToggleForm()
{
  var booking_seat_id = $('#booking_seat_id').val();
  $('#BookingForm').html( BookingForm(booking_seat_id) );
  $('#btn-booking-form').hide();
  $('#booking-form-allday').hide();
  $("#InputStartAllDay").prop( "checked", false );
  $('#booking-form1').removeClass("d-none");
  $('#booking-form2').removeClass("d-none");    
}

function titleForm(type,seat,booking_employee_date)
{
    var dayname = " [" + FWGDate( 'dayname',booking_employee_date ) + "]";
  var title="";
  title +="<div class='col'>";
  title +="<div class='row display-6'>Seat: "+seat+"</div>";
  if(type==2)
  {
    title+=""
    +"<div class='row'><small>"+booking_employee_date+dayname+"</small></div>";
    title +="<hr>";
  }
  title +="</div>";

  return title;
}

function ToggleFormButton()
{
  var description = "";
  description +="<div class='row' id='BookingForm'>";
  description +="</div>";
  description +="<div class='row' id='btn-booking-form'>";
  description +="<span id='btn-add-booking' class='form-control btn btn-info' onclick='ToggleForm()'>Booking Form</span>";
  description +="</div>";
  return description;
}

function BookingStatudCard(first_name_en,last_name_en,booking_employee_id,seat,booking_employee_time_start,booking_employee_time_end)
{
  var cancel_btn = '';
  var description ="";

  if(first_name_en==localStorage.getItem("firstname") && last_name_en==localStorage.getItem("lastname"))
  {
    var a = "cancelBooking('"+booking_employee_id+"');";
    cancel_btn +="    <button class='btn btn-danger text-light mx-0 btn btn-sm' id='cancleBooking' onclick="+a+" ><i class='fa fa-trash-o' aria-hidden='true'></i></button>";
    // cancel_btn +="<input type='hidden' id='booking_employee_id' value='"+booking_employee_id+"'>"
    cancel_btn +="<input type='hidden' id='booking_seat_id' value="+seat+">"
  }
  else
  {
    cancel_btn +="";
  }

  description +="<div class='row pt-1'>";
  description +="<div class='col-8' >";
  description +="<h6>"+booking_employee_time_start+" - "+booking_employee_time_end+"</h6>";
  description +="<small><i>"+first_name_en+" "+last_name_en+"</i></small>";
  description +='</div>';
  description +="<div class='col-4'>";
  description +=cancel_btn;
  description +='</div>';
  description +='</div>';
  description +='<hr>';

  return   description;
}

function BookingForm(tmp_seat)
{
  var d = new Date();
  var Hour = d.getHours();
  var Hours = Hour + 1;
  var date = document.getElementById("titleDatetime").value;
  // var date = document.getElementById("booking_employee_date").value;
  var r="";

  r +=""
  +"<div id='booking-form' class='col' >"
  +"<div id='booking-form0' class='row' >"
  +"<div class='col-4'>"
  +"<label>Date :</label>"
  +"</div>"
  +"<div class='col-8'>"
  +"<input type='text' class='form-control form-control-sm docs-date' name='datePicker' id='Inputdate' value='"+date+"' onclick='' disabled></input>"
  +"</div>"
  +"</div>"
  +"";


  r +=""

  +"<div id='booking-form-allday' class='row mt-1' >"
  +"<div class='col-4'>"
  +"<label></label>"
  +"</div>"
  +"<div class='col-5'>"
  +"<input type='checkbox' class='form-control-sm' id='InputStartAllDay' onclick='ToggleFormB()' checked> All Day"
  +"</div>"
  +"<div class='col-3'></div>"
  +"</div>"

  +"<div id='booking-form1' class='row mt-1 d-none'>"
  +"<div class='col-4'>"
  +"<label>Start :</label>"
  +"</div>"
  +"<div class='col-4'>"
  +"<select class='form-select form-control-sm' id='InputHourStart' required=''>"
  +"";
  
  var i=6;
  while(i<=23)
  {
    var ss = "";
    // console.log( Hour+"<"+i +" && "+ date+"=="+FWGDate('today','int') );
    // if(Hour<i)
    // {
      if(date==FWGDate('today','int'))
      {
        if(Hour==i)
        {
          var ss = "selected='selected'";
        }
        r +="<option "+ss+" value='"+i+"'>"+i+"</option>";        
      }
      else
      {
        r +="<option "+ss+" value='"+i+"'>"+i+"</option>";
      }
    // }
    i++; 
  }
  r +="</select>";
  r +="</div>";
  r +="<div class='col-4'>";
  r +="<select class='form-select form-control-sm' id='InputMinStart' required=''>";
  r +="<option value='0' selected='selected'>00</option>";
  r +="<option value='30'>30</option>";
  r +="</select>";
  r +="</div>";
  r +="</div>";
  r +="<div id='booking-form2' class='row mt-1 mb-1 d-none'>";
  r +="<div class='col-4'>";
  r +="<label>End :</label>";
  r +="</div>";
  r +="<div class='col-4'>";
  r +="<select class='form-select form-control-sm' id='InputHourEnd'>";
  var i=6;
  while(i<=23)
  {
    var ss = "";
    if(date==FWGDate('today','int'))
    {
      if(Hour==i)
      {
        var ss = "selected='selected'";
      }
      r +="<option "+ss+" value='"+i+"'>"+i+"</option>";        
    }
    else
    {
      r +="<option "+ss+" value='"+i+"'>"+i+"</option>";
    }
    i++;  
  }
  r +="</select>";
  r +="</div>";
  r +="<div class='col-4'>";
  r +="<select class='form-select form-control-sm' id='InputMinEnd'>";
  r +="<option value='0'>00</option>";
  r +="<option value='30' selected='selected'>30</option>";
  r +="</select>";
  r +="</div>";
  r +="</div>";

  r +="<div id='booking-form3' class='row'>";
  r +="<span id='btn-add-booking' class='form-control btn btn-warning' onclick='addBooking()'>Booking</span>";
  r +="<input type='hidden' id='seat_number' value='"+tmp_seat+"'>"
  r +="</div>";
  r +="<div id='booking-form-res' class='row'>";
  r +="</div>";
  r +="</div>";
  r +="</div>";
  
  return r;
}

function CheckBooking(hourstart,minstart,hourend,minend,timestart,timeend)
{
  var flag = 0;

  var hourstart = parseInt(hourstart);
  var hourend = parseInt(hourend);
  var minstart = parseInt(minstart);
  var minend = parseInt(minend);

    // if(hourstart > hourend)
    // {
    //   console.log('Wahat');
    //   $('#booking-form-res').html("<span class='text-center text-danger'>ท่านกรอกช่วงเวลาไม่สัมพันธ์กัน กรุณากรอกใหม่</span>");
    // }
    // else if(hourstart <= hourend)
    // {
      // console.log('Yes');
      if(timestart==timeend)
      {
        alert(timestart==timeend);
        $('#booking-form-res').html("<span class='text-center text-danger'>ท่านกรอกช่วงเวลาไม่สัมพันธ์กัน กรุณากรอกใหม่</span>");
      }
      else
      {
        flag = 1;
      }
    // }

  return flag; 
}

function addBooking()
{
  // document.getElementById("btn-add-booking").style.display = "none";

  var InputStartAllDay = $('#InputStartAllDay').is(":checked");
  if(InputStartAllDay==false)
  {
    var hourstart = $("#InputHourStart").val();
    var minstart = $("#InputMinStart").val();
    var hourend = $("#InputHourEnd").val();
    var minend = $("#InputMinEnd").val();
    var timestart = hourstart+":"+minstart;
    var timeend = hourend+":"+minend;      
  }
  else
  {
    var timestart = "09:00";
    var timeend = "18:00";
  }

  var flag = CheckBooking(hourstart,minstart,hourend,minend,timestart,timeend);
  if(flag==1)
  {
    var proceed = confirm("Booking Confirm?");

        var tmp_seat = $('#seat_number').val();
        var booking_zone_id = tmp_seat.substring(0, 1);
        var datestart = $("#Inputdate").val();

        var InputStartAllDay = $('#InputStartAllDay').is(":checked");
        if(InputStartAllDay==false)
        {
          var hourstart = $("#InputHourStart").val();
          var minstart = $("#InputMinStart").val();
          var hourend = $("#InputHourEnd").val();
          var minend = $("#InputMinEnd").val();
          var timestart = hourstart+":"+minstart;
          var timeend = hourend+":"+minend;      
        }
        else
        {
          var timestart = "09:00";
          var timeend = "18:00";
        }

        if(proceed) 
        {
          var request = $.ajax({
            method: "POST",url: "api/create.php",
            data: { 
              action : "add",
              user_id : localStorage.getItem("user_id"),
              booking_employee_date : datestart,
              booking_employee_time_start : timestart,
              booking_employee_time_end : timeend,
              booking_type_id : 1,
              booking_room_id : 0,
              booking_zone_id : booking_zone_id,
              booking_seat_id : tmp_seat
            }
          });
          request.fail(function (jqXHR, textStatus) {
            //504
            $("#msgbox").html("Please Check Internet");
          });
          request.done(function(msg) {

            var code = msg.code;
            if(code==200)
            {
              if(proceed) 
              {
                console.log("Success: "+code);
                document.getElementById("booking-form0").innerHTML = "";
                document.getElementById("booking-form-allday").innerHTML = "";
                document.getElementById("booking-form-res").innerHTML = "<b class='text-center'>Booking Success</b>";
                document.getElementById("booking-form1").innerHTML = "";
                document.getElementById("booking-form2").innerHTML = "";
                document.getElementById("btn-add-booking").style.display = "none";
            
                setTimeout(() => {
                  location.reload();
                }, 1000);
              }
            }
            else if(code==404)
            {
              alert('404');
            }
            else if(code==500)
            {
              $('#booking-form-res').html("<span class='text-center text-danger'>ถูกจองไปแล้ว กรุณาจองช่วงเวลาใหม่</span>");
            }
            
          });        

        }  
  }
  
}

function cancelBooking(booking_employee_id)
{
  var proceed = confirm("Cancel Confirm?");
  if(proceed) 
  {
    // var booking_employee_id = $('#booking_employee_id').val();
    var booking_seat_id = $('#booking_seat_id').val();
    console.log(booking_seat_id);
    // console.log(booking_employee_id+booking_seat_id);
    var request = $.ajax({
      method: "POST",url: "api/delete.php",
      data: { action:"cancel" , booking_employee_id:booking_employee_id , booking_seat_id:booking_seat_id }
    });
    request.fail(function (jqXHR, textStatus) {
      //504
      $("#msgbox").html("Please Check Internet");
    });
    request.done(function(msg) {
      var code = msg.code;
      if(code==200)
      {
        location.reload();
      }
      else if(code==404)
      {
        console.log(msg);
      }
    });
  }
}

function Hi(){
  alert('g');
}