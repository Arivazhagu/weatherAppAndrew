const request = require('request');

const geoCode =(place,calback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'
    +encodeURIComponent(place)
    +'.json?access_token=pk.eyJ1IjoiYXJpdmF6aGFndWFsIiwiYSI6ImNraHZldWx6MzB0dnQyeXA1eWcwZHgwdm8ifQ.qV4XHZY_Ne3l90pXqQambw&limit=3';
    const objForWeather = {url,json:true}
    const coord = request(objForWeather,(err, response)=>{        
        const {features:feat} = response.body         
        const {coordinates} =((feat.length===0)?{}:feat[0].geometry) 

        if (err) {
            calback('ERROR connecting MAPBOX..!',undefined)
        }else if (feat.length <= 0) {
            calback('No results received from MAPBOX..!',undefined)
        
    }else if (!feat[0]) {        
        calback('No results received from MAPBOX..!',undefined)
    }
    else{
        calback(undefined, {lattitude:coordinates[0],longitude:coordinates[1]});
        }        
    })          
}
module.exports = geoCode;