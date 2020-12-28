function KickStartDashboard()
{
  $checkLogout = checkLogout('timeout');
  if($checkLogout==true)
  {
    // $("#titleDatetime").val( FWGDate('today','int') );
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
  showSeat('margin-top 1px; margin-left: 80px;','CC','C',23,26,24);

  showSeat('margin-top:0px; margin-left: 20px;','DA','D',1,20,5);
  showSeat('margin-top:-2px; margin-left: 10px;','DB','D',21,26,23);
  showSeat('margin-top:1px; margin-left: -10px;','DC','D',27,36,31);

  showSeat('margin-top:0px; margin-left: 20px;','EA','E',1,24,5);
  showSeat('margin-top:-20px; margin-left: 10px;','EB','E',25,27,0);

  $("#title-updated").html( "Updated at: "+FWGDate('today','updated') );

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

function getDashboardStatus() 
{
  $('#main-panel').load('dashboard.html');
  displayDashboard();
}

// function showSeatv2(style,group,name,start,end,sub)
// {
//   var text = "<div class='row' style='"+style+"'>";
//   var i = start;
//   var cut = sub;
//   while (i <= end) {
//     var css = "SeatAvailableB";
//     textname = name+i;
//     var booking_employee_date = $('#titleDatetime').val();
//     var request = $.ajax({
//       method: "POST",url: "api/read.php",
//       data: { action:"showseatCSS", booking_seat_id:textname, booking_employee_date: booking_employee_date  }
//     });
//     request.fail(function (jqXHR, textStatus) {
//       //504
//       $("#msgbox").html("Please Check Internet");
//     });
//     request.done(function(msg) {
//       var code = msg.code;
//       if(code==200)
//       {
//         css = msg.css;      
//         text += "<div id='"+textname+"' class='"+css+"' >"+textname+"</div>";
//         if(i==cut && sub!=0)
//         {
//           text+="</div><div class='row' style='"+style+"'>";
//           cut=cut+sub;
//         }
//       }

//     });
//     i++;
//   }
//   alert(text);
//   idname = "#"+group;
//   $(idname).html(text);

//   var j = start;
//   while (j <= end) {
//     var textname = name+j;
//     showBooking(textname);
//     j++;
//   }

// }