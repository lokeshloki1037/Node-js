const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utilites/geocode')
const weather = require('./utilites/weather');

const app = express();

//define paths for express config
const publicdirpath = path.join(__dirname,'./public');
const viewcoustum = path.join(__dirname, '../template/views');
const partialspath = path.join(__dirname,'../template/partials');
//setup handlebars engine and views location
app.set('view engine' , 'hbs');
app.set('views',viewcoustum);
//setup static directory to serve
app.use(express.static(publicdirpath));
hbs.registerPartials(partialspath);

app.get('/', (req,res) => {
    res.render('index', {
        title:'page',
        body:'weather'
    })
})
app.get('/about',(req,res) => {
    res.render('about' , {
        title:'lokesh',
        body:'  about'
    });
})
app.get('/help' , (req,res) => {
    res.render('help' , {
        contact:88888888888,
        emergency:8888882123
    });
});
app.get('/index',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'location does not found',
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} ={}) => {
        if(error){
            return res.send({error})
        }
        weather(latitude,longitude,(error,weatherdata) => {
            if(error){
                return console.log('please provide correct address');
            }else{
                res.send({
                    weather:weatherdata,
                    location,
                    address:req.query.address
                })
            }
        })
    })
    // res.send({
    //     forecaste:'it is raining',
    //     location:req.query.address
    // })
})
app.get('/product',(req,res) => {
    if(!req.query.search){
      return res.send({
    error:'you must provide a search term',
       })
    }
   console.log( req.query.search);
  res.send({
      products:[],
  });
});
app.get('/help/*',(req,res)=>{
    res.render('404',{
    title:404,
    body: 'lokesh' ,
    errormsg: 'help file not found'
    })
})
app.get('/*', (req,res)=>{
res.render('404',{
    title:404,
    body:'lokesh loki',
    errormsg:'file not found'
});
});

let PORT = 3000;
app.listen(PORT , () => {
console.log('server is running at number '+ PORT);
});