const request = require('request');

const weather = (longitude, latitude , response) => {
    const weather_url = "http://api.weatherstack.com/current?access_key=2b2ddef0b908de2eac3cd93c2501a7a5&query="+longitude+","+latitude;
request({url:weather_url, json:true} ,(err ,{body} ={}) => {
    if (err){
        response('unable to connect to the server',undefined);
    }else if(body.current.err){
        response('please enter the correct address',undefined);
    }else{
        response(undefined,"it is now "+body.current.temperature+" degress temperature. it fells like "+body.current.feelslike+" degrees outside and humidity is "+body.current.weather_description.humidity+" degrees out");
    }
});
}
module.exports = weather;

