const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/secrets");

// checking required fields in req.body
// prepares json of required fields
module.exports.initializeData = (requiredFields, req) => {
  let valid = true;
  let data = {};
  requiredFields.forEach(field => {
    if (req.body[field] == null || req.body[field] === "") {
      valid = false;
    } else {
      data[field] = req.body[field];
    }
  });
  return { valid: valid, data: data };
};

//initializes json data if fields are there in req (no hard check)
module.exports.initializePartialData = (fields, req) => {
  let data = {};
  fields.forEach(field => {
    if (req.body[field]) data[field] = req.body[field];
  });
  return { data: data };
};

// generating jwt tokens
module.exports.generateTokenMiddleware = (req, res) => {
  if (!req.user) {
    res.status(200).json({ success: false, message: "User not authenticated", data: {} });
  } else {
    let user_id = req.user.user._id;
    let token = jwt.sign(
      {
        _id: user_id
      },
      jwt_secret.JWT_SECRET_KEY,
      {
        expiresIn: "365 days"
      }
    );

    res.json({ success: true, message: "Success", data: { token: "Bearer " + token } });
  }
};

// checking if token exist
module.exports.checkLogin = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"] || req.body["token"];
  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, jwt_secret.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
          data: {}
        });
      } else {
        req.payload = decoded;
        next();
      }
    });
  } else {
    res.json({ success: false, message: "Auth token missing", data: {} });
  }
};
