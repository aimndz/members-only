const { Router } = require("express");
const mainRouter = Router();

const mainController = require("../controllers/mainController");
const checkAuth = require("../middleware/checkAuth");

mainRouter.get("/", mainController.index);

mainRouter.get("/join", checkAuth, mainController.join_get);
mainRouter.post("/join", checkAuth, mainController.join_post);

mainRouter.get("/create", checkAuth, mainController.create_get);
mainRouter.post("/create", checkAuth, mainController.create_post);

module.exports = mainRouter;
