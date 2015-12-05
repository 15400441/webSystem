/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
	var a =  {
        "name": "Singing Contest",
        "shortDes": "一年一度既HKBU Singing Contest又到喇！身為浸大人既你點可能錯過！？無論你係咩系、Bachelor/AD Promgramme，我地都歡迎你報名！身邊有唱得之人就梗係要推薦佢黎喇！",
        "fullDes": "一年一度既HKBU Singing Contest又到喇！身為浸大人既你點可能錯過！？無論你係咩系、Bachelor/AD Promgramme，我地都歡迎你報名！身邊有唱得之人就梗係要推薦佢黎喇！ 主辦單位：音樂學會 報名日期：4/2-8/2 (12-6pm) 報名地點：Main Podium 詳情可閱Poster 或去到報名Counter查詢",
        "image": "https://scontent-hkg3-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/537765_488319141230614_2037745642_n.jpg?oh=7aa48d32b25169e36c8a131255123ebe&oe=56645008",
        "organizer": "Music Society",
        "date": "2015-11-22",
        "time": "morning",
        "venue": "SWT501",
        "quota": "10",
        "highLighted": "yes",
        "createdAt": "2015-11-14T10:22:48.197Z",
        "updatedAt": "2015-11-19T13:21:20.779Z",
        "id": 1
      };

    Activity.create(a).exec( function(err, model) {

       // model.belongsTo.add(2);
         model.belongsTo.add(1);
         model.save();

    });


    a =  {
        "name": "Culture and Politics in European Cinema",
        "shortDes": "Design green partnership agreement between Kyoto and Hong Kong",
        "fullDes": "Aspects to focus on Design green partnership agreement between Kyoto and Hong Kong Ex. Low-carbon society, waste management, etc. Discover cultural differences Forcibly ideate green solutions using the cultural differences Extend the ideas by combining participants’ research topics",
        "image": "http://www.comp.hkbu.edu.hk/fieldinformatics/images/2015/poster.png",
        "organizer": "Music Society",
        "date": "2015-11-12",
        "time": "morning",
        "venue": "SWT501",
        "quota": "10",
        "highLighted": "yes",
        "createdAt": "2015-11-14T10:24:20.449Z",
        "updatedAt": "2015-11-14T10:24:20.449Z",
        "id": 2
      };

    Activity.create(a).exec( function(err, model) {
        model.belongsTo.add(1);
       // model.belongsTo.add(2);  // the id for admin
       // model.belongsTo.add(4); // the id for boss
        model.save();
    });



     a = {
        "name":"Workshop on Design for Sustainability",
        "venue":"RRS638",
        "date":"2015-11-27",
        "organizer":"comp",
        "quota":"20",
        "shortDes":"Design green partnership agreement between Kyoto and Hong Kong",
        "fullDes":"Aspects to focus on Design green partnership agreement between Kyoto and Hong Kong Ex. Low-carbon society, waste management, etc. Discover cultural differences Forcibly ideate green solutions using the cultural differences Extend the ideas by combining participants’ research topics",
        "image":"http://www.comp.hkbu.edu.hk/fieldinformatics/images/2015/poster.png",
        "createdAt":"2015-10-06T13:05:42.233Z",
        "updatedAt":"2015-10-06T13:05:42.233Z",
        "id":3,
         "time":"morning",
         "highLighted": "yes"
      };

    Activity.create(a).exec( function(err, model) {
        model.belongsTo.add(1);
       // model.belongsTo.add(2);  // the id for admin
       // model.belongsTo.add(4); // the id for boss
        model.save();
    });


    a = {
        "name":"FWD Challenge Award 2015 (Winter Challenge)",
        "venue":"RRS638",
        "date":"2015-10-19",
        "organizer":"comp",
        "quota":"50",
        "shortDes":"In alignment of the theme of “Smarter Hong Kong, Smarter Living” from the Government’s 2014-2015 Budget and the Digital 21 Strategy, one of the initiatives is the release of government information for public consumption. Thus, Open Data access and its usage become important and crucial issues for driving Hong Kong to be a Smart City.",
        "fullDes":"In alignment of the theme of “Smarter Hong Kong, Smarter Living” from the Government’s 2014-2015 Budget and the Digital 21 Strategy, one of the initiatives is the release of government information for public consumption. Thus, Open Data access and its usage become important and crucial issues for driving Hong Kong to be a Smart City. Currently, Public Sector Information available for free access covers real-time data such as road traffic information, geo-referenced public facility data, property market statistics, population census statistics, etc. Making good use of these available data should provide more opportunities for different sectors to improve their competitiveness. And thus, we pick the “Open Data Challenge” as the next challenge for the FWD Challenge Award 2015.",
        "image":"https://www.comp.hkbu.edu.hk/v1/pic/news/655.jpg",
        "createdAt":"2015-10-08T01:59:01.815Z",
        "updatedAt":"2015-10-08T01:59:01.815Z",
        "id":4,
        "time":"morning",
        "highLighted": "yes"
      };

    Activity.create(a).exec( function(err, model) {
        model.belongsTo.add(1);
       // model.belongsTo.add(2);  // the id for admin
       // model.belongsTo.add(4); // the id for boss
        model.save();
    });


   


    var user = {"username": "admin", "password":"123456", "id":1, "type":"admin"}

    User.create(user).exec( function (err, model)  {});

    user = {"username": "s1", "password":"123456", "id":2 ,"type":"staff"}

    User.create(user).exec( function (err, model)  {});

    user = {"username": "s2", "password":"123456", "id":3, "type":"staff"}

    User.create(user).exec( function (err, model)  {});

    user = {"username": "m1", "password":"123456", "id":4, "type":"member"}

    User.create(user).exec( function (err, model)  {});

    user = {"username": "m2", "password":"123456", "id":5, "type":"member"}

    User.create(user).exec( function (err, model)  {});

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
