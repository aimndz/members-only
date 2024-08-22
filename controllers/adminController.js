const asynHandler = require("express-async-handler");

// Handle delete GET
exports.delete_get = asynHandler(async (req, res) => {
  res.render("delete");
});

// Handle delete POST
exports.delete_post = asynHandler(async (req, res) => {
  // Not implemented yet
});
