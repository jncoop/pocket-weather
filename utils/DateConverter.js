/**
 *
 * @param {number=} unixDateTime - string to capitalise
 * @return {object} custom date object
 **/

export const convertUnixDateTime = (unixDateTime) => {
  var date = new Date(unixDateTime * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var day = days[date.getDay()];
  var dt = date.getDate();
  var hr = date.getHours();
  var mn = date.getMinutes();
  var sc = date.getSeconds();

  return { y: year, m: month, date: dt, day: day, hour: hr, min: mn, sec: sc };
};
