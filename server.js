/**
1.  CREATING server
-   create server with Express JS
-   to install Express JS:
    'npm install --save express'
-   app.get('/'... focuses on the root URL '/'
-   app.listen creates a server on port 3000
-   in order to set up the server, first compile in the terminal
-   with 'node server.js'
-   'localhost:3000' on the webbrowser should echo 'Hello World!'
*/
const express = require('express')
const app = express()
const body_parser = require('body-parser');
const request = require('request');

// apiKey can be generated from https://openweathermap.org/api
// without the api the app does not work
const apiKey = '***';

/* give Express access to the files in public directory */
app.use(express.static('public'));


/**
-   body-parser from the Express middleware allows us to access the value
    stored in the req-body object (the name of the city typed in from the
    client side)
**/
app.use(body_parser.urlencoded({extended: true}));


//  set up template engine
//  EJS is accessed by default in the views directory
app.set('view engine', 'ejs')


// get route
app.get('/', (req, res) => {
  // this line sends 'Hello World!' to the client
  // what we really want to send is index.ejs
    // res.send('Hello World!')
 res.render('index', {weather: null, error: null});
 /**
-   instead of res.send we use res.render when working with templating lang.
-   res.render will reder our view and then send the equivalent HTML to client
 **/
})


// post route
app.post('/', (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, (err, response, body) => {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again!'});
        }else{
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again!'});
            }else{
                let weather_text = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weather_text, error: null});
            }
        }
    });
    // res.render('index');
    // console.log(req.body.city);
})


app.listen(3000, () =>{
  console.log('Example app listening on port 3000!')
})

/*
2.  SETTING UP THE INDEX VIEW
-   in order to respond with the HTML files we use Embedded JavaScript or EJS
-   EJS is a templating langugage

-   Set up template engine in order to use the EJS in Express
-   template engine allows you to use the static template files
-   at runtime, the template engine replaces variables in template file with actual
    values and transforms the template into an html file sent to the client
-   this approach makes it easier to design the html page

-   to install ejs in the terminal:
    'npm install ejs --save'
*/
