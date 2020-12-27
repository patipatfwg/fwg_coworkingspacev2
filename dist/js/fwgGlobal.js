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
    else if(subsw=='updated')
    {
        var month = (dt.getMonth()+1);
        var time = dt.toLocaleTimeString();
        var date = dt.getFullYear() + "-" +month+ "-" + dt.getDate() + " " + time ;
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

function checkLogout(type)
{
  var dt = new Date();
  var time = dt.getHours();
  var login_at = localStorage.getItem("login_at")+1;

  if(type=='timeout')
  {
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
  else if(type=='click')
  {
    localStorage.clear();
    window.location.assign("login.html");
  }
}