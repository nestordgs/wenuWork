import passport from 'passport';

const isAuth = (req, res, next) => {
  passport.authenticate('jwt', function(err, user) {
    if (err || !user) {
      res.status(403).send({
        message: `You don't have the authorization to request this route`,
      });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next)
};

export default isAuth;
