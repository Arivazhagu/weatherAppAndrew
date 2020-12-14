const request = require('request');

const weatherdata = (lat,long,calback)=>{    
    const url = 'http://api.weatherstack.com/current?access_key=a1538cf53ace330aab6af4225cebcb83&query='+
    decodeURIComponent(lat)+','+
    decodeURIComponent(long)+'&units=f'
    const objFormap = {url,json:true}

    request(objFormap,(err, response)=>{  
        const {error,current,location} = response.body;
        const{weather_descriptions:wDesc,temperature:temp,feelslike:feel,humidity:humidity}=current;
        if (err) {
            calback("ERROR..!",undefined)
        }else if (error) {            
            calback("Error received from weatherstack..!",undefined);
        }    
        else{            
            calback(undefined,
                (`${location.name} : ${wDesc}.The temperature is ${temp}F and it feels like ${feel}F. Humidity stands at ${humidity}`))    
        }
    })
}

module.exports= weatherdata;
