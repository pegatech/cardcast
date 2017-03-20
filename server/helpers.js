module.exports = {
  // middleware to check if the user is authenticated
  // isAuthenticated is added to the req object by passport
  isAuth: function(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      var err = new Error('Unauthorized');
      err.status = 401;
      next(err);
    }
  }
};
