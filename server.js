const express = require('express');

var app = express();

const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials'); 

app.set('view engine', 'hbs');




//所有的 request 都會經過這個 middleware , 如果沒有呼叫 next , server 無法將執行 request path 
app.use((req,res,next) => {
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log',log + '\n',(err) => {
       if (err){
           console.log('Unable to append to server.log.');
       }
   });
   next();
  

});

// app.use((req,res,next) => {
//     res.render('maintain.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});


app.get('/',(req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    
    res.render('home.hbs',{
        title: 'My Home',
        pageTitle: 'This is MY homepage',
        message: 'Welcome to my home'
    });
});

app.get('/project',(req,res) => {
     res.render('project.hbs',{
         title: 'My Projects',
         pageTitle: 'Project list',
         message: 'Hello My Pofolio'
     });

});

app.get('/about',(req,res) => {
   res.render('about.hbs',{
       pageTitle: 'About Page'
   });
});

app.get('/bad',(req,res) => {
    res.send({
       errorMessage: 'No Data'
    });
});

app.listen(port,()=>{
    console.log(`Server listen on ${port}`);
});