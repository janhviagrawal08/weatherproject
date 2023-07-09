const express = require("express");
const https = require("https");
const bodyparser = require ("body-parser");

const app= express()
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");        //to access html document
});
app.post("/", function(req, res){
   console.log(req.body.cityname);
   const query= req.body.cityname;
   const apikey = "65289dc0fe37edd48158f83eb57350f6";
   const unit = "metric";
https.get("https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apikey +"&units="+unit, function(response){
  
   response.on("data", function(data){
    const weatherdata = JSON.parse(data);
    const weatherdescription = weatherdata.weather[0].description;
    const temp = weatherdata.main.temp; 
    const icon = weatherdata.weather[0].icon;
    const imageurl = "https://openweathermap.org/img/wn/" +icon+ "@2x.png" ;
    //can use res.write for multiple things to be printed and then add res.send(); at the end   
    res.write("<h1>The temperature in "+ query +" is "+ temp + " degree celsius.</h1>");
    res.write("<img src ="+ imageurl + ">" );
    res.write("<p><i>WEATHER STATUS: "+ weatherdescription +" </i></p>");
    res.send();
   });   
}); 
   console.log("post request received.")
});


   // res.send("server is up and running");
app.listen(3000,function(){
    console.log("server at 3000");
});