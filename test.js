let dateString = "25/6/2018"
var dateSplit = dateString.split("/");
var date = dateSplit[0]
var month = dateSplit[1]
var year = dateSplit[2]
console.log("date: " + date + "\nmonth: " + month +"\nyear: " + year)

let today = new Date(year+"-"+month+"-"+date);
let yesterday = new Date();
yesterday.setDate(today.getDate() - 1)
yesterday.setHours(0,0,0,0)
let tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1)
tomorrow.setHours(23,59,59,59)
console.log("today: " +today+"\nyesterday: " +yesterday+"\ntomorrow: " +tomorrow)
