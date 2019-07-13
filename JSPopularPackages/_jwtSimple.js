const jwt = require("jwt-simple");
const config = require("config");
const uuid = require("uuid");

function getToken() {
  const payload = {
    //Use version 4 of Unique User Id
    id: uuid.v4(),
    name: "Timmy"
  };

  const token = jwt.encode(payload, config.get("jwtSecret"));

  return {
    token
  };
}

function validateToken(token) {
  const decoded = jwt.decode(token, "secret");
  console.log(config.get("apiKey"));
  return decoded;
}

//console.log(getToken());
console.log(
  validateToken(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlRpbW15In0.-amLD5Xi3JE9pvMho8em-A42LzdVv2VvnLKBfTutXNQ"
  )
);
