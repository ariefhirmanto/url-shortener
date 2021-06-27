const controller = require("../controllers/shortlink.controller");

module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });
  app.post("/short", controller.create);
  app.get("/:short_url", controller.findURL);
  app.get("/", controller.showURL);
};