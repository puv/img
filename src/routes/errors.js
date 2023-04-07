const Router = require("express").Router;
const GUIrouter = Router();
const APIrouter = Router();

GUIrouter.get("*", (req, res) => {
  // This will return a 404 "page" for unknown GET Requests.

  res.render("pages/errors/_404");
}).all("*", (req, res) => {
  // This will return 404 to any request that's "not" GET Requests.

  res.sendStatus(404);
});

// This down there will cover all API errors.
APIrouter.get("/", (req, res) => {
  // This will send (Ok "200") to /api to conform that the api is working

  res.sendStatus(200);
}).all("*", (req, res) => {
  // This will return not found to all requests that goes to (Not Found "404") api routes,
  // unlike the normal page.

  res.sendStatus(404);
});

module.exports.GUIErrors = GUIrouter;
module.exports.APIErrors = APIrouter;
