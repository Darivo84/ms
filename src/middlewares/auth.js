/* eslint-disable no-unused-vars */
module.exports.isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send('Please login to view this page');
  }
};
