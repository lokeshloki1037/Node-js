const request =require('request');

const geocode = (address ,  callback) => {
 const geocodeURL ="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibG9rZXNobG9raTEwMzciLCJhIjoiY2twYzgweXBwMTl6YzJubXBlajJsbzJ0NCJ9.VvqBPm7LZDGmOgBX8quB0g&limit=1";
 request({url : geocodeURL , json:true}, (error , {body} = {}) => {

  if(error){
    callback('not able to connect to the server',undefined)
  }else if(body.features.length === 0){
callback('please enter the co`rrect address',undefined )
  }else{
    callback(undefined,{
      latitude:body.features[0].center[1],
      longitude:body.features[0].center[0],
      location:body.features[0].place_name, 
    });
  }
 });
}

module.exports= geocode;