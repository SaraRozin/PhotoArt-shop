const { authJwt } = require("../middlewares");
const controller = require("../controllers/picture.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
   
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/picture/all", controller.findAll);
  app.post("/api/picture/create", controller.create);
  app.get("/api/picture/find", controller.findOne);
  app.get("/api/picture/findCond", controller.findCond);
  app.put("/api/picture/update", controller.update);
  app.delete("/api/picture/delete", controller.delete);

};

