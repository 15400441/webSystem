// isAdmin.js
module.exports = function(req, res, next) {


  console.log(req.session.user.type);
  if (req.session.user.type == 'admin' || req.session.user.type=='staff' ) {
    return next(); //proceed to the next policy,
  }

  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};