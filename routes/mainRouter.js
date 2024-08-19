const {Router} = require("express");
const mainRouter = Router();

const mainController = require("../controllers/mainController");

mainRouter.get("/", mainController.index);
mainRouter.get("/join", mainController.join_get);
mainRouter.get("/create", mainController.create_get);

module.exports = mainRouter;