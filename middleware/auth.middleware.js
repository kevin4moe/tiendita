export const isAuthorized = function (req, res, next) {
  if (req.cookies) {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.cookie('user', 'John', { signed: true });
    next();
    // if (error) {
    //   return next(error);
    // } else {
    //   if (user === null) {
    //     var err = new Error('Not authorized! Go back!');
    //     err.status = 401;
    //     return next(err);
    //   } else {
    //     return next();
    //   }
    // }
  }
};
