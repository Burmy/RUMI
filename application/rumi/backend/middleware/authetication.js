const authentication = {};
const jwt_decode = require("jwt-decode");

authentication.authentication = function (req, res, next) {
  let token;
  if (
    req.method == "POST" ||
    req.method == "DELETE" ||
    req.method == "PUT" ||
    req.method == "POST" ||
    req.method == "GET" // for testing
  ) {
    let cookies = req.headers.cookie;

    if (!cookies || cookies.indexOf("token") == -1) {
      res
        .send(401)
        .send("Authentication failed, please login or contact admin.");
      return;
    }

    token = cookies
      .split(";")
      .find((cookie) => {
        return cookie.indexOf("token") >= 0;
      })
      .substring(6);

    req.headers.loginUserId = jwt_decode(token).payload.userId;
  }
  next();
};

module.exports = authentication;
