function KickStartDashboard()
{
  $checkLogout = checkLogout();
  if($checkLogout==true)
  {

    $("#titleDatetime").val( FWGDate('today','int') );
    $("#DatetimeValue").val( FWGDate('today','timestamp') );
    $("#InputDatetimeStart").val(FWGDate(2,0));
    $("#InputDatetimeEnd").val(FWGDate(3,0)); 
    displayDashboard();
    // setInterval("getDashboardStatus()", 60000);

  }  
}

function displayDashboard()
{
  showSeat('margin-top:1px; margin-left: 18px;','AA','A',1,8,4);
  showSeat('margin-top:1px; margin-left: 40px;','AB','A',9,14,11);
  showSeatAC('AC','A',15,20,0);
      
  showSeat('margin-top:1px; margin-left: 40px;','BA','B',1,20,5);

  showSeat('margin-top 1px; margin-left: 35px;','CA','C',1,8,4);
  showSeat('margin-top 1px; margin-left: 35px;','CB','C',9,22,15);
  showSeat('margin-top 1px; margin-left: 35px;','CC','C',23,26,24);

  showSeat('margin-top:0px; margin-left: 20px;','DA','D',1,20,5);
  showSeat('margin-top:-2px; margin-left: 10px;','DB','D',21,26,23);
  showSeat('margin-top:1px; margin-left: 1px;','DC','D',27,34,30);

  showSeat('margin-top:0px; margin-left: 20px;','EA','E',1,24,5);
  showSeat('margin-top:-20px; margin-left: 10px;','EB','E',25,27,0);
}

function FWGDate(sw,subsw)
{
  // var d = new Date().toLocaleDateString();
  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes();

  if(sw=='dayname')
  {
    var arrayOfWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var year = subsw.substring(0, 4);
    var month = subsw.substring(5, 7)-1;
    var day = subsw.substring(8, 10);

    var dateObj = new Date(year, month, day);
    var weekdayNumber = dateObj.getDay();
    var date = arrayOfWeekdays[weekdayNumber];
  }
  else if(sw=='today')
  {
    if(subsw=='string')
    {
      var dayArr= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      dt.setDate(dt.getDate());
      var monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
      var date = dayArr[dt.getDay()].toUpperCase() +", "+ dt.getDate() +" "+ monthArr[dt.getMonth()].toUpperCase() +" "+ dt.getFullYear();  
    }
    else if(subsw=='int')
    {
      var month = (dt.getMonth()+1);
      var date = dt.getFullYear() + "-" +month+ "-" + dt.getDate();
      // console.log(date);
    }
    else if(subsw=='timestamp')
    {
      // dt.setTime(dt.getTime() + 86400000 );

      var date = dt.setTime(dt.getTime() );

      // var month = (dt.getMonth());
      // var dateS = dt.getFullYear() + "-" +month+ "-" + dt.getDate();

      // var datum = Date.parse(dateS);
      // var date = datum/1000;
    }
    
  }
  else if(sw==2)
  {
    var month = (dt.getMonth()+1);
    var date = dt.getFullYear()+"-"+month+"-"+dt.getDate()+" "+time;
  }
  else if(sw==3)
  {
    var duration = '30';
    var month = (dt.getMonth()+1);
    var time = dt.getTime() + (duration * 60 * 1000);

    var date = dt.getFullYear()+"-"+month+"-"+dt.getDate()+" "+time;
  }
  return date;
}

function getDashboardStatus() 
{
  $('#main-panel').load('dashboard.html');
  displayDashboard();
}

function datePicker()
{
  var aa = $('#Inputdate');
  // instance = new dtsel.DTS(aa);
  instance = new dtsel.DTS('input[name="datePicker"]');
}

function showSeat(style,group,name,start,end,sub)
{
  // var marginleft = "style='margin-top:1px; margin-left: 21px;'";
  var text = "<div class='row' style='"+style+"'>";
  var i = start;
  var cut = sub;
  while (i <= end) {
    var css = "SeatAvailableB";
    textname = name+i;
    
    text += "<div id='"+textname+"' class='"+css+"' >"+
              textname+
            "</div>";

    if(i==cut && sub!=0)
    {
      text+="</div><div class='row' style='"+style+"'>";
      cut=cut+sub;
    }

    showIconStatus(textname);

    i++;
  }
  idname = "#"+group;
  $(idname).html(text);

  var j = start;
  while (j <= end) {
    var textname = name+j;
    showBooking(textname);
    j++;
  }

}

function showSeatAA(group,name,start,end,sub)
{
  var marginleft = "style='margin-top:1px; margin-left: 21px;'";
  var text = "<div class='row' "+marginleft+">";
  var i = start;
  var cut = sub;
  while (i <= end) {
    var css = "SeatAvailableB";
    textname = name+i;
    
    text += "<div id='"+textname+"' class='"+css+"' >"+
              textname+
            "</div>";

    if(i==cut && sub!=0)
    {
      text+="</div><div class='row' "+marginleft+">";
      cut=cut+sub;
    }

    showIconStatus(textname);

    i++;
  }
  idname = "#"+group;
  $(idname).html(text);

  var j = start;
  while (j <= end) {
    var textname = name+j;
    showBooking(textname);
    j++;
  }

}

function showSeatAB(group,name,start,end,sub)
{
  var marginleft = "style='margin-top:10px; margin-left: 40px;'";
  var text = "<div class='row' "+marginleft+">";
  var i = start;
  var cut = sub;
  while (i <= end) {
    textname = name+i;
    text += "<div id='"+textname+"' class='SeatAvailableB' >"+
              textname+
            "</div>";

    if(i==cut && sub!=0)
    {
      text+="</div><div class='row' style='margin-top:1px; margin-left: 40px;' >";
      cut=cut+sub;
    }
    showIconStatus(textname);
    i++;
  }
  idname = "#"+group;
  $(idname).html(text);

  var j = start;
  while (j <= end) {
    var textname = name+j;
    showBooking(textname);
    j++;
  }

}

function showSeatAC(group,name,start,end,sub)
{
  var marginleft = "style='margin-top: 2px; margin-left: -23x;'";
  var text = "<div class='row' "+marginleft+">";
  var i = start;
  var cut = sub;
  while (i <= end) {
    textname = name+i;
    text += "<div id='"+textname+"' class='SeatAvailableA' >"+
              textname+
            "</div>";
            showIconStatus(textname);
    i++;
  }
  idname = "#"+group;
  $(idname).html(text);

  var j = start;
  while (j <= end) {
    var textname = name+j;
    showBooking(textname);
    j++;
  }

}

// function showSeatB(group,name,start,end,sub)
// {
//   var marginleft = "style='margin-top 1px; margin-left: 25px;'";
//   var text = "<div class='row' "+marginleft+">";
//   var i = start;
//   var cut = sub;
//   while (i <= end) {
//     textname = name+i;
//     text += "<div id='"+textname+"' class='SeatAvailableB' >"+
//               textname+
//             "</div>";

//     if(i==cut && sub!=0)
//     {
//       text+="</div><div class='row' "+marginleft+">";
//       cut=cut+sub;
//     }
//     showIconStatus(textname);
//     i++;
//   }
//   idname = "#"+group;
//   $(idname).html(text);

//   var j = start;
//   while (j <= end) {
//     var textname = name+j;
//     showBooking(textname);
//     j++;
//   }

// }

function showSeatC(group,name,start,end,sub)
{
  var marginleft = "style='margin-top 1px; margin-left: 35px;'";
  var text = "<div class='row' "+marginleft+">";
  var i = start;
  var cut = sub;
  while (i <= end) {
    textname = name+i;
    text += "<div id='"+textname+"' class='SeatAvailableB' >"+
              textname+
            "</div>";

    if(i==cut && sub!=0)
    {
      text+="</div><div class='row' "+marginleft+">";
      cut=cut+sub;
    }
    showIconStatus(textname);
    i++;
  }
  idname = "#"+group;
  $(idname).html(text);

  var j = start;
  while (j <= end) {
    var textname = name+j;
    showBooking(textname);
    j++;
  }

}

function showSeatD(group,name,start,end,sub)
{
  var marginleft = "style='margin-top 5px; margin-left: 17px;'";
  var text = "<div class='row' "+marginleft+">";
  var i = start;
  var cut = i + sub - 1;
  while (i <= end) {
    textname = name+i;
    text += "<div id='"+textname+"' class='SeatAvailableB' >"+
              textname+
            "</div>";

    showIconStatus(textname);

    if(i==cut && sub!=0)
    {
      text+="</div><div class='row' "+marginleft+">";
      cut=cut+sub;
    }
    
    i++;
  }
  idname = "#"+group;
  $(idname).html(text);

  var j = start;
  while (j <= end) {
    var textname = name+j;
    showBooking(textname);
    j++;
  }

}

function showIconStatus(seat)
{
  var booking_employee_date = $('#titleDatetime').val();
  var request = $.ajax({
    method: "POST",url: "api/read.php",
    data: { action:"showseatCSS", booking_seat_id:seat, booking_employee_date: booking_employee_date  }
  });
  request.fail(function (jqXHR, textStatus) {
    //504
    $("#msgbox").html("Please Check Internet");
  });
  request.done(function(msg) {
    var code = msg.code;
    if(code==200)
    {
      var css = msg.css;
      document.getElementById(seat).classList.add(css);
    }
  });
}

function checkLogout()
{
  var dt = new Date();
  var time = dt.getHours();
  var login_at = localStorage.getItem("login_at")+1;
  if(time>login_at)
  {
    localStorage.clear();
    window.location.assign("login.html");
    exit(0);
  }
  else
  {
    return true;
  }
}

// function showSeat(group,name,start,end,sub)
// {
//   var text = "<div class='row'>";
//   var i = start;
//   var cut = sub;
//   while (i <= end) {
//     textname = name+i;
//     text += "<div id='"+textname+"' class='SeatAvailable' >"+
//               textname+
//             "</div>";

//     if(i==cut && sub!=0)
//     {
//       text+="</div><div class='row'>";
//       cut=cut+sub;
//     }
//     i++;
//   }
//   idname = "#"+group;
//   $(idname).html(text);

//   var j = start;
//   while (j <= end) {
//     var textname = name+j;
//     showBooking(textname);
//     j++;
//   }

// }

// function getSeatDescription(seat)
// {
//   var request = $.ajax({
//     method: "POST",url: "api/read.php",
//     data: { action:"showseat", booking_seat_id:seat }
//   });
//   request.fail(function (jqXHR, textStatus) {
//     //504
//     $("#msgbox").html("Please Check Internet");
//   });
//   request.done(function(msg) {
//     // const driver = new Driver({ opacity: 0.4, showButtons: false, stageBackground: '#ffffff', allowClose: true });
//     // var textseat = "#"+seat;
//     // console.log(textseat);

//     var code = msg.code;
//     if(code==200)
//     {
//       // $("#msgbox").html(msg.first_name_en);
//       alert("y");

//           // driver.highlight({
//           //   element: textseat,
//           //     popover: {
//           //       title: 'y',
//           //       description: 'Booking: 19:30 - 20:00',
//           //       position: 'top',
//           //     }
//           // });
//     }
//     else if(code==404)
//     {
//       // driver.highlight({
//       //   element: textseat,
//       //     popover: {
//       //       title: 'n',
//       //       description: 'Booking: 19:30 - 20:00',
//       //       position: 'top',
//       //     }
//       // });
//     }
//   });
// }

// function Popover(seat)
// {
//   var res = seat.substring(1);
//   const driver = new Driver({ opacity: 0.4, showButtons: false, stageBackground: '#ffffff', allowClose: true });
//   driver.highlight({
//     element: seat,
//       popover: {
//         title: 'Seat: '+res+'<br> Patipat Chanrungruang',
//         description: 'Booking: 19:30 - 20:00',
//         position: 'top',
//       }
//   });
// }

// function Rectangle()
// {
//     var elem = document.getElementById('draw-group');
//     var two = new Two({ width: 50, height: 50 }).appendTo(elem);

//     // var circle = two.makeCircle(-70, 0, 50);
//     var rect = two.makeRectangle(70, 0, 100, 100);
//     // circle.fill = '#FF8000';
//     // circle.stroke = 'orangered';
//     rect.fill = 'rgba(0, 200, 255, 0.75)';
//     rect.stroke = '#1C75BC';

//     // Groups can take an array of shapes and/or groups.
//     var group = two.makeGroup(rect);

//     // And have translation, rotation, scale like all shapes.
//     group.translation.set(two.width / 2, two.height / 2);
//     group.rotation = Math.PI;
//     group.scale = 0.75;

//     // You can also set the same properties a shape have.
//     group.linewidth = 7;

//     two.update();
// }

// function callCreate()
// {
//   var request = $.ajax({
//     method: "POST",url: "api/create.php",
//     data: { 
//       action : "add",
//       user_id : localStorage.getItem("user_id"),
//       booking_employee_start : $("#InputDatetimeStart").val(),
//       booking_employee_end : $("#InputDatetimeEnd").val(),
//       booking_type_id : 1,
//       booking_room_id : 0,
//       booking_zone_id : $("#InputZone").val(),
//       booking_seat_id : $("#InputSeat").val()
//     }
//   });
//   request.fail(function (jqXHR, textStatus) {
//     //504
//     $("#msgbox").html("Please Check Internet");
//   });
//   request.done(function(msg) {
//     var code = msg.code;
//     if(code==200)
//     {
//       // $("#msgbox").html(msg);
//       alert(msg);
//     }
//     else
//     {
//       // $("#msgbox").html(msg);
//       alert(msg);
//     }
//   });      
// }