const {Router} = require("express");
const adminRouter = Router();

const adminController = require("../controllers/adminController");

adminRouter.get("/delete",  adminController.delete_get);

module.exports = adminRouter;