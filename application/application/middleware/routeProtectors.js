const {
  successPrint,
  errorPrint,
  requestPrint,
} = require("../helpers/debug/debugPrinters");

const routeProtectors = {};

routeProtectors.userIsLoggedIn = function (req, res, next) {
  if (req.session.username) {
    successPrint("user is logged in.");
    next();
  } else {
    errorPrint("user is not logged in.");
    req.flash("error", "You must be logged in to create a Post!");
    res.redirect("/users/login");
  }
};

module.exports = routeProtectors;
