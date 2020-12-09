const path = require('path');
const express = require('express');
const chalk = require('chalk');
const { static } = require('express');
const Coords = require('../src/utils/mapBoxCoord');
const weatherData = require('../src/utils/weatherData');

const app = express();
const hbs= require('hbs');

//paths for config
const viewPath = (path.join(__dirname,'../templates1/views'));
const staticPath = path.join(__dirname,'../public')
const partialsPath = (path.join(__dirname,'../templates1/partials'));

//view engine configs//
app.set('view engine','hbs');
app.set('views',viewPath);
app.use(express.static(staticPath));
hbs.registerPartials(partialsPath);


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather Data',
        CreatedBy:'Arivazhagu',
        type:'Created by Arivazhagu'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        type:'Created by Arivazhagu',
        title:'ABOUT PAGE'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        type:'Created by Arivazhagu',
        title:'HELP PAGE'
    })
})

app.get('/weatherData',(req,res)=>{
    if (!req.query.address) {
        return (res.send({
            Error:'Please send address value'
        }))
    }
    Coords(req.query.address,(error,res1)=>{    
        if (error) {          
            return (res.send({
                Error:error
            }))
        }         
        const {lattitude:lat,longitude:long}= res1;
            weatherData(long,lat,(error,resWeatherReport)=>{
                if (error) {
                    return (res.send({
                        error
                    }))
                }
                console.log(resWeatherReport);
                res.send({report:resWeatherReport});                            
            });     
    });

})

app.get('/coordinates',(req,res)=>{
    const styler ='font-weight:bold;font-size:2rem;text-decoration:dotted;font-style:italic;color:purple;border:2px;border-radius:10px;display:flex;align-items:center;justify-content:center;'
    res.send(`<div style=${styler}>Coordinates sender</div>`);
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
    msg:'Help Directory Not Found',
    type:'ERROR',
title:'Weather App'});
})

app.get('*',(req,res)=>{
    res.render('404',{msg:'Page Not Found',
    type:'ERROR',
    title:'Weather App'});
})

app.listen(3000,()=>{
    console.log('App listening on port 3000.')
})