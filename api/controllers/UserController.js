/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {


   login: function (req, res) {

    if (req.method == "GET")
        return res.view('login');
    else {

        User.findOne({username:req.body.username})
        .exec( function (err, user) {

            if (user == null) 
                return res.send("No such user");

            if (user.password != req.body.password) 
                return res.send("Wrong Password");

            req.session.username = req.body.username; 
            req.session.user = user; 
             req.session.uid = user.id; 
            res.locals.session = req.session
               
            return res.redirect("/activity/main");
        })

    }
},



loginMobile:function (req, res) {

   

        User.findOne({username:req.body.username})
        .exec( function (err, user) {

            if (user == null) 
                return res.send("No such user");

            if (user.password != req.body.password) 
                return res.send("Wrong Password");

            req.session.username = req.body.username; 
            req.session.user = user; 
            req.session.uid = user.id;
            res.locals.session = req.session
               
            return res.send("login Successfully");
        })
    
},


loginOut: function (req, res) {

    req.session.user=null;
    return res.view("login");
},

loginOutMobile: function (req, res) {

    req.session=null;
    return res.send("loginout Successfully");
},


registUI: function (req, res) {

    return res.view("regist");
},


regist: function (req, res) {

    if(req.method == "POST")
    {

        User.count()
        .where({username: req.body.User.username})
        .exec( function (err, value) {
            console.log(value);

            if(value>0)
            {
                return res.send("the username have existed, please change another");
            }
            else
            {
                User.create(req.body.User).exec( function(err, model) {

                    model.type="member";
                    model.save();

                    return res.send("Successfully Created!");

                });

            }

        })


    }

    else{
        return res.view("regist");
    }
},






    json: function(req, res) {

        User.find().exec( function(err, activities) {

            return res.json(activities);
            

        });
    },





showUserActivities:  function( req, res) {
    var id=req.session.uid;

    
    if(id==null || id=="undefined")
        return res.send("please login first");

    console.log(id+"----------------");
    User.findOne(id).populateAll().exec( 
        function (err, model) {
            
            console.log(model.regists.length);

            return res.json(model.regists);

        })
},


getUsername: function( req, res) {
    var username=req.session.username;

    return res.json(username);

        
},



};

