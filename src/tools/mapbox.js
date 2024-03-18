const request = require("request");
const mapbox =(country,callback) =>{
    const geourl =`https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=pk.eyJ1Ijoid2FsYWExMzc3IiwiYSI6ImNsdDY3OGdyNzA3aGoyam12a25mcnFrY2UifQ.EARxHCA2p863yplUsvFodw`;
   
    request({url:geourl,json:true},(error,response)=>{

    if(error)
    callback("unabletoconnect gecode service",undefined)
    else if (response.body.message){
      callback(response.body.message,undefined)
    }
    else if (response.body.features.length ==0){
      callback("unable to find location",undefined)
    }
    else {
      const Longitude=response.body.features[0].center[0];
      const Latitude=response.body.features[0].center[1];
      console.log("response.body is: ",response.body);
      console.log("The Latitude is: ",Latitude);
      console.log("The Longitude is: ",Longitude);
     
     
      callback(undefined, 
        {Longitude:Longitude,
          Latitude:Latitude
        })
    
    }
    })
  }

  module.exports=mapbox;
  