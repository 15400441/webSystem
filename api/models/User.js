/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    regists: {
        collection : 'Activity',
        via: 'belongsTo'
    },


  	toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  }
};

