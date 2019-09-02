var express = require('express')
var router = express.Router()    //1
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); 

// Create user endpoint Starter

//2
router.post('/createuser', function (req,res) {

    var username = req.body.user.username;
    var pass = req.body.user.password;

    User.create({
        username: username,
        passwordhash:bcrypt.hashSync(pass, 10)
    }).then(
        function createSuccess(user) {
          
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
           
            res.json({
                user: user,
                message: 'created' //1
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});
module.exports = router;

router.post('/signin', function(req, res) {
    User.findOne( { where: { username: req.body.user.username } } ).then(
        function (user) {
            if(user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                  if (matches) {
                      var token = jwt.sign({id: user.id}, process,env.JWT_SECRET, {expiresIn: 60*60*24 });
                      res.json({
                          user: user,
                          message: "successfully authenticated",
                          sessionToken: token
                      });
            } else {
                res.status(502).send({ error: "you failed, yo"});
            }
        });
    }else {
                res.status(500).send({ error: "failed to authenticate" });
            }
        },
            function (err) {
                res.status(501).send({ error: "you failed, yo" });
            }
    );
});


// All below was what was refactored in module B2 - this was the step in B1
//     var username = "The Dude";
//     var pass = "therugtiedtheroomtogether";  //3

//     User.create({
//         username: username,
//         passwordhash: pass

//     }).then(
//         function message(){
//             res.send("I hate The Eagles, man");
//         }
//     );
// })

// module.exports = router;