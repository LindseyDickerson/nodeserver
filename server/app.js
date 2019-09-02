require('dotenv').config(); 

var express = require('express'); //1
var app = express(); //2
var test = require('./controllers/testcontroller')
var user = require('./controllers/usercontroller') //1
var sequelize = require('./db');


//3        //4
// app.listen(3000, function(){
//      console.log('Hey man!!!') //5
//  });

//  app.use('/api/test', function(req, res){
//    res.send("This is data from the /api/test endpoint. It's from the server.");
//    });

                //2            //3
//    app.use('/test', test) 


sequelize.sync(); //tip: pass in {force: true} for resetting tables
express.json();
app.use(require('./middleware/headers'));

app.use('/test', test);

app.use('/api/user', require('./controllers/usercontroller')); //importing the user.js file, set up route to endpoints for api/user route

app.listen(3000, function(){
    console.log('App is listening on 3000.')
});
// app.use('/test/about', function(req, res){
//     res.send("This is an about route");
// });
// app.use('/test/about', test) // using the test path var to get to call "This is an about route"

