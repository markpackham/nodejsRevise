const moment = require("moment");

let val;

val = moment().format("YYYY-MM-DD");
val = moment().format("MMMM Do YYYY, h:mm:ss a");
val = moment()
  .subtract(3, "days")
  .calendar();
val = moment()
  .startOf("day")
  .fromNow();
console.log(val);
