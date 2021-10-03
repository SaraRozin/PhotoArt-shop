const controller = require("../controllers/userPicture.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/userPicture/all", controller.findAll);
  app.post("/api/userPicture/create", controller.create);
  app.get("/api/userPicture/find", controller.findOne);
  app.get("/api/userPicture/findCond", controller.findCond);
  app.put("/api/userPicture/update", controller.update);
  app.delete("/api/userPicture/delete", controller.delete);

};
