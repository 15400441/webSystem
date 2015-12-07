/**
 * ActivityController
 *
 * @description :: Server-side logic for managing Activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	showActivities: function(req, res) {

 		if (req.method == "POST") {

 			Person.create(req.body.Person).exec( function(err, model) {

 				return res.send("Successfully Created!");

 			});
 		}

 		else {

 			var request = require("request");

 			var url = "http://thirdsail.herokuapp.com/event/json";

 			request({
 				url: url,
 				json: true
 			}, function (error, response, body) {

 				if (!error && response.statusCode === 200) {

             /**Activity.find().exec( function(err, activities) {

 			 for (var i = activities.length - 1; i >= 0; i--) {
            	activities[i].destroy();
            };

          }); **/


           /** Activity.create(body).exec(function (err, activities) {
            	 console.log(activities);
            	});**/
 		}  
 	});  

 			Activity.find().exec( function(err, activities) {

 				return res.view('main', {'activities': activities});

 			});

 		}
 	},
 	

 	main: function(req, res) {

 		
 		Activity.find()
 		.where({highLighted: {contains: "yes"}})
 		.sort('name')
 		.exec( function (err, activities) {

            //return res.json(activities);
            return res.view('main', {'activities': activities});

          });
 	},




 	json: function(req, res) {

 		Activity.find().exec( function(err, activities) {

 			return res.json(activities);
 			


 		});
 	},

 	create: function(req, res) {

     var id=req.session.user.id;
     if (req.method == "POST") {

      Activity.create(req.body.Activity).exec( function(err, activity) {
        console.log(activity.id);

       //add relationship
        User.findOne(id).exec( function (err, model) {

          if (model !== null) {
            model.regists.add(activity.id);  

            model.save( function (err, model) {

              if (err) 
                return res.send("Already Created");

            });
          }
          else {
            return res.send("User not found!");
          }
        })



        return res.view("create",{"addSuccess":"added Successfully"});

      });
    }

    else{


      return res.view("create", {"addSuccess":""});
    }





  },




  search: function(req, res) {
    var name=req.query.name;
    var venue=req.query.venue;
    var organizer=req.query.organizer;
    var date=req.query.date;
    if (name==undefined) {name=""};
    if (venue==undefined) {venue=""};
    if (organizer==undefined) {organizer=""};
    if (date==undefined) {date=""};
    var queryString="";
    if (req.method == "GET"){



     Activity.find().paginate({page: req.query.page, limit: 2})
     .where({name: {contains: name}})
     .where({venue: {contains: venue}})
     .where({organizer: {contains: organizer}})
     .where({date: {contains: date}})
     .sort('name')
     .exec( function(err, activities) {

      Activity.count()
      .where({name: {contains: name}})
      .where({venue: {contains: venue}})
      .where({organizer: {contains: organizer}})
      .where({date: {contains: date}})
      .exec( function(err, value) {

        var pages = Math.ceil(value / 2 );

        queryString="name="+name+"&venue="+venue+"&organizer="+organizer+"&date="+date
        console.log(queryString);
        return res.view( 'search', 
          {'activities': activities, 
          'count':pages, 
          'current':req.query.page,
          'name':req.query.name,
          'venue':req.query.venue,
          'organizer':req.query.organizer,
          'date':req.query.date,
          'queryString':queryString

        });

      });

    });


   }

   else
   { 


    Activity.find().paginate({page: req.query.page, limit: 2})
    .where({name: {contains: req.body.Activity.name}})
    .where({venue: {contains: req.body.Activity.venue}})
    .where({organizer: {contains: req.body.Activity.organizer}})
    .where({date: {contains: req.body.Activity.date}})
    .sort('name')
    .exec( function(err, activities) {

     Activity.count()
     .where({name: {contains: req.body.Activity.name}})
     .where({venue: {contains: req.body.Activity.venue}})
     .where({organizer: {contains: req.body.Activity.organizer}})
     .where({date: {contains: req.body.Activity.date}})
     .exec( function(err, value) {

      var pages = Math.ceil(value / 2 );

      queryString="name="+req.body.Activity.name+"&venue="+req.body.Activity.venue+"&organizer="+req.body.Activity.organizer+"&date="+req.body.Activity.date
      return res.view( 'search', 
       {'activities': activities, 
       'count':pages, 
       'current':req.query.page,
       'name':req.body.Activity.name,
       'venue':req.body.Activity.venue,
       'organizer':req.body.Activity.organizer,
       'date':req.body.Activity.date,
       'queryString':queryString

     });

    });

   });



  }

},








admin: function(req, res) {


 var type=req.session.user.type;
 var id=req.session.user.id;
 if(type!="admin")
 {
 User.findOne(id).populateAll().exec( function (err, model) {

  return res.view("admin",{"user":model});

});
}

else
{

 console.log(type+"-----------------");
 Activity.find().exec( function(err, activities) {

  return res.view('adminForAdministrator',{"activities":activities});

});

}

},



detail: function(req, res) {

 Activity.findOne(req.query.id).exec( function(err, model) {
   			        //return res.json(model);

   			        return res.view('detail', {'activity': model});

              });

},



edit: function(req, res)
{

 Activity.findOne(req.query.id).exec( function(err, model) {
   			        //return res.json(model);

                if(model!=null)
                {
                  return res.view('update', {'activity': model});
                }
                return res.send("No such record");

              });

},



update: function(req, res) {

 if (req.method == "GET") {

  Activity.findOne(req.params.id).exec( function(err, model) {

   if (model == null) 
    return res.send("No such activity!");
  else
    return res.view('update', {'activity': model});

});

} else {

  Activity.findOne(req.body.Activity.id).exec( function(err, model) {

   model.name = req.body.Activity.name;
   model.venue = req.body.Activity.venue;
   model.date = req.body.Activity.date;
   model.time = req.body.Activity.time;
   model.image = req.body.Activity.image;
   model.shorDes = req.body.Activity.shorDes;
   model.fullDes = req.body.Activity.fullDes;
   model.organizer = req.body.Activity.organizer;
   model.quota = req.body.Activity.quota;
   model.highLighted = req.body.Activity.highLighted;

   model.save();
 				//return res.json(model);
 				return res.view('update', {'activity': model});

 			});

}

},


delete: function(req, res) {
 var id=req.session.user.id;
 Activity.findOne(req.query.id).exec( function(err, model) {

  if (model != null) {
   model.destroy();

   User.findOne(id).populateAll().exec( function (err, model) {

  return res.view("admin",{"user":model});

});


 } else {		
   return res.send("Person not found");
 }

});

},



registerOne: function (req, res) {

 var id=req.session.uid;
 if(id==null || id=="undefined")
  return res.send("please login first")

 User.findOne(id).exec( function (err, model) {

  if (model !== null) {
    model.regists.add(req.body.id);

    Activity.findOne(req.body.id).exec( function (err, m) {
           if(m.quota>=1)
           {
           m.quota=m.quota-1;
           m.save();
         }
         else
         {
          return res.send("no quota");
         }

    });


    console.log(req.body.id);
    model.save( function (err, model) {

      if (err) 
        return res.send("Already added");

      return res.send("registed Successfully");

    });
  }
  else {
    return res.send("User not found!");
  }
})
},



removeActivity: function (req, res) {

  var id=req.session.user.id;
  console.log(id);
  User.findOne(id).exec( function (err, model) {

    if (model !== null) {
      model.regists.remove(req.query.aid)
      model.save();

       Activity.findOne(req.query.aid).exec( function (err, m) {
           
           m.quota=m.quota+1;
           m.save();
    });


      return res.send("Unregised Successfully");

      
    }
    else {
      return res.send("User not found!");
    }
  })

},


deleteRegister : function (req, res) {

  var uid=req.query.uid;
  
  User.findOne(uid).exec( function (err, model) {

    if (model !== null) {
      model.regists.remove(req.session.aid)
      model.save();


    Activity.findOne(req.session.aid).populateAll().exec( function (err, m) {
    
    m.quota=m.quota+1;
    return res.view("registedUsers",{"activity":m});

  });

      
    }
    else {
      return res.send("User not found!");
    }
  })

},




showRegister: function (req, res) {

  req.session.aid=req.query.id;
  Activity.findOne(req.query.id).populateAll().exec( function (err, model) {

    return res.view("registedUsers",{"activity":model});

  })
},


showRegistedActivities: function (req, res) {

  User.findOne(req.query.id).populateAll().exec( function (err, model) {

    return res.view("registedActivities",{"user":model});

  })
},









test: function(req, res) {

 Activity.find().exec( function(err, activities) {

  return res.view('test');



});

},




};

