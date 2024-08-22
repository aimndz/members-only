const asynHandler = require("express-async-handler");
const getRiddle = require("../config/passcodes");
const db = require("../db/queries");

// Handle admin GET
exports.admin_get = asynHandler(async (req, res) => {
  const riddle = getRiddle();
  req.session.riddle = riddle;

  res.render("admin", {
    title: "Admin",
    question: riddle.question,
  });
});

// Handle admin POST
exports.admin_post = asynHandler(async (req, res) => {
  const { passcode } = req.body;
  const riddle = req.session.riddle;
  const user_id = req.user.id;

  if (passcode.trim().toLowerCase() === riddle.answer.toLowerCase()) {
    await db.updateMemberStatus(user_id, "admin");
    res.redirect("/");
  } else {
    //Handle incorrect answer
    res.status(400).render("admin", {
      question: riddle.question,
      errors: { passcode: ["Incorrect answer. Please try again."] },
    });
  }
});

// Handle delete GET
exports.delete_get = asynHandler(async (req, res) => {
  res.render("delete");
});

// Handle delete POST
exports.delete_post = asynHandler(async (req, res) => {
  // Not implemented yet
});
