const express=require("express");
const app=express();
const https=require("https");
const bodyparser=require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));
app.use("/public",express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
    var city=req.body.city;
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=4b38871522156e3f1e91ec6a5b7d01e1"

https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
     
    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp;
    const WeatherDescription=weatherData.weather[0].description;  
    const icon=weatherData.weather[0].icon
    const name=weatherData.name
    const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    res.write("<h1>The weather is currently "+WeatherDescription+"</h1>")
    res.write("<h1>The Temperature in "+name+" is "+ temp+"&deg;C</h1>")
    res.write("<img src="+imgUrl+">")
    res.send()
    })
})
  
})
app.listen(3000,function(){
    console.log("Server is running at port 3000.");
})