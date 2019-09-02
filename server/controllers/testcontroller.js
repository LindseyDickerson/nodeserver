// var express = require('express'); //1
// var router = express.Router(); //2


   //3    //4 //5            //6
// router.get('/', function (req, res) {
        //7
//     res.send('Hey!!! This is a test route!')
// });

// router.get('/about', function (req, res) {
//     res.send('This is an about route');
// });

 //1 pass in an object
// router.get('/contact', function (req, res) {
//     res.send({user: "kenn", email: "kenn@beastmode.com:"});
// });

 //2 Pass in an array
// router.get('/projects', function (req, res) {
//     res.send(['Project 1', 'Project 2']);
// });

 //3 Pass in an array of objects
// router.get('/mycontacts', function (req, res) {
//     res.send([
//         {user: "quincy", email: "kenn@beastmode.com"},
//         {user: "aaron", email: "aaron@beastmode.com"},
//         {user: "quincy", email: "quincy@beastmode.com"},
//         {user: "tom", email: "tom@beastmode.com"}
//     ]);
// });

    //8
// module.exports = router;
//commenting out everything above so I can have for future reference. Module requested that it be deleted.

// --------------Start code-----------

var express = require ('express')
var router = express.Router()
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test');

/******************
 * Controller Method #1: Simple Response
 */
      //1        //2 
 router.post('/one', function(req, res) {
     //3
    res.send("Test 1 went through!")
 });
 

 /* ********************
 Controller Method #2: Persisting Data
 ************************ */
router.post('/two', function (req, res) {
    let testData = "Test data for endpoint two";

    TestModel
    .create({
        testdata: testData
    }).then(dataFromDatabase => {
        res.send("Test two went through!")
    })
});

/* ********************
Controller Method #3: req.body
************************/

router.post('/three', function (req, res) {
    var testData = req.body.testdata.item;


    TestModel
    .create({
    testdata: testData  
    })
    res.send("Test three went through!")
    console.log("Test three went through!")
});

// STEP 4 - use this with postman

router.post('/four', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then( 
        function message() {
            res.send("Test 4 went through!");
        }
    );
});

//Step 5 --- Return Data in a promise
router.post('/five', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(data) {
            res.send(data);
        }
    );
});

// Route 6 - Return Response as JSON

router.post('/six', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(testdata) {
            res.json({
                testdata: testdata
            });
        }
    );
});

// route 7 - handle errors

router.post('/seven', function (req,res) {
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function creatSuccess(testdata) {
            res.json({
                testdata: testdata
            });

        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

/* **************************
GET: Get simple message from server
*****************************/
router.get('/helloclient', function (req, res) {
    res.send('This is a message from the server to the client.')
})


module.exports = router;