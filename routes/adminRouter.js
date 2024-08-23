const { Router } = require("express");
const adminRouter = Router();

const adminController = require("../controllers/adminController");
const checkAuth = require("../middleware/checkAuth");
const isMember = require("../middleware/isMember");
const isAdmin = require("../middleware/isAdmin");

adminRouter.get("/admin", checkAuth, isMember, adminController.admin_get);
adminRouter.post("/admin", checkAuth, isMember, adminController.admin_post);

adminRouter.get("/:id/delete", checkAuth, isAdmin, adminController.delete_get);
adminRouter.post(
  "/:id/delete",
  checkAuth,
  isAdmin,
  adminController.delete_post
);

module.exports = adminRouter;
