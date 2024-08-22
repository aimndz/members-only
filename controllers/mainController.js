const asynHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const getRiddle = require("../config/passcodes");
const db = require("../db/queries");

// Handle home page
exports.index = asynHandler(async (req, res) => {
  const messages = await db.getAllMessages();
  console.log(messages);
  res.render("index", { user: req.user, messages: messages });
});

// Handle join GET
exports.join_get = asynHandler(async (req, res) => {
  const riddle = getRiddle();
  req.session.riddle = riddle;

  res.render("join", {
    title: "Join",
    question: riddle.question,
  });
});

// Handle join POST
exports.join_post = asynHandler(async (req, res) => {
  const { passcode } = req.body;
  const riddle = req.session.riddle;
  const user_id = req.user.id;

  if (passcode.trim().toLowerCase() === riddle.answer.toLowerCase()) {
    await db.updateMemberStatus(user_id, "member");
    res.redirect("/");
    console.log("Correct");
  } else {
    //Handle incorrect answer
    res.status(400).render("join", {
      question: riddle.question,
      errors: { passcode: ["Incorrect answer. Please try again."] },
    });
  }
});

// Handle create GET
exports.create_get = asynHandler(async (req, res) => {
  res.render("create");
});

// Handle create POST
exports.create_post = [
  // Validate title
  body("title").trim().notEmpty().withMessage("Title should not be empty."),

  // Validate message
  body("message").trim().notEmpty().withMessage("Message should not be empty."),

  // Handle create
  asynHandler(async (req, res) => {
    const errors = validationResult(req);

    // Group error messages with their 'path'
    const errorMap = errors.array().reduce((acc, error) => {
      if (!acc[error.path]) {
        acc[error.path] = [];
      }
      acc[error.path].push(error.msg);
      return acc;
    }, {});

    // Handle errors
    if (!errors.isEmpty()) {
      return res.status(400).render("create", {
        title: "Create",
        errors: errorMap,

        // Pass the input back to the form
        inputs: req.body,
      });
    }

    const user_id = req.user.id;
    const { title, message } = req.body;

    await db.insertMessage(user_id, title, message);
    res.redirect("/create");
  }),
];
