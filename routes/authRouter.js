const {Router} = require("express");
const authRouter = Router();

const authController = require("../controllers/authController");

authRouter.get("/login", authController.login_get)
authRouter.post("/login", authController.login_post)

authRouter.get("/sign-up", authController.sign_up_get)
authRouter.post("/sign-up", authController.sign_up_post)

authRouter.get("/logout", authController.logout_get)

module.exports = authRouter;