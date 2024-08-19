const {Router} = require("express");
const authRouter = Router();

const authController = require("../controllers/authController");

authRouter.get("/login", authController.login_get)
authRouter.get("/sign-up", authController.sign_up_get)


module.exports = authRouter;