const { Router } = require("express");
const adminRouter = Router();

const adminController = require("../controllers/adminController");

adminRouter.get("/admin", adminController.admin_get);
adminRouter.post("/admin", adminController.admin_post);

adminRouter.get("/delete", adminController.delete_get);
adminRouter.post("/delete", adminController.delete_post);

module.exports = adminRouter;
