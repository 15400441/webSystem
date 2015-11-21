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


 		if (req.method == "POST") {

 			Activity.create(req.body.Activity).exec( function(err, activity) {

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

 		Activity.find().exec( function(err, activities) {

 			return res.view('admin',{"activities":activities});
 			


 		});

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

 		Activity.findOne(req.query.id).exec( function(err, model) {

 			if (model != null) {
 				model.destroy();
 				Activity.find().exec( function(err, activities) {

 					return res.view('admin',{"activities":activities});

 				});
 				
 			} else {		
 				return res.send("Person not found");
 			}

 		});

 	},



 	test: function(req, res) {

 		Activity.find().exec( function(err, activities) {

 			return res.view('test');
 			


 		});

 	},




 };

