const asynHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Handle sign up GET
exports.sign_up_get = asynHandler(async (req, res) => {
  res.render("sign-up", {
    title: "Sign up",
    user: req.user,
  });
});

// Handle sign up POST
exports.sign_up_post = [
  // Validate first name
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name should not be empty.")
    .isLength({ max: 35 })
    .withMessage("First name exceeds 35 characters.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name can only contain letters and spaces."),

  // Validate last name
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name should not be empty.")
    .isLength({ max: 35 })
    .withMessage("Last name exceeds 35 characters.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Last name can only contain letters and spaces."),

  // Validate username
  body("username")
    .trim()
    .isLength()
    .withMessage("Username must be between 3 and 20 characters long.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Username can only contain letters, numbers, and underscores."
    ),

  // Validate password
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password should be 8 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character."),

  // Validate confirm password
  body("confirm_password")
    .trim()
    .notEmpty()
    .withMessage("Confirm password should not be empty.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm password does not match password.");
      }
      return true;
    }),

  // Handle sign up
  asynHandler(async (req, res) => {
    const errors = validationResult(req);

    // Handle Errors
    if (!errors.isEmpty()) {
      // Group error messages with their 'path'
      const errorMap = errors.array().reduce((acc, error) => {
        if (!acc[error.path]) {
          acc[error.path] = [];
        }
        acc[error.path].push(error.msg);
        return acc;
      }, {});

      return res.status(400).render("sign-up", {
        title: "Sign up",
        errors: errorMap,

        // Pass the input back to the form
        inputs: req.body,
      });
    }

    // Get all inputs
    const { first_name, last_name, username, password } = req.body;

    // Handle hash password
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.insertUser(first_name, last_name, username, hashedPassword);
      res.redirect("/login");
    } catch (error) {
      // Handle errors during hashing or database operations
      console.error("Error during password hashing or saving user:", error);
      res.status(500).render("sign-up", {
        title: "Sign up",
        errors: [
          { msg: "An error occurred during sign-up. Please try again later." },
        ],
        inputs: req.body,
      });
    }
  }),
];

// Handle login get
exports.login_get = asynHandler(async (req, res) => {
  res.render("login", {
    title: "Login",
    user: req.user,
  });
});

// Handle login POST
exports.login_post = [
  // Validate username
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username should not be empty."),

  // Validate password
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password should not be empty."),

  // Handle login
  asynHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Handle Errors
    if (!errors.isEmpty()) {
      // Group error messages with their 'path'
      const errorMap = errors.array().reduce((acc, error) => {
        if (!acc[error.path]) {
          acc[error.path] = [];
        }
        acc[error.path].push(error.msg);
        return acc;
      }, {});

      return res.status(400).render("login", {
        title: "Login",
        errors: errorMap,

        // Pass the input back to the form
        inputs: req.body,
        messages: [],
      });
    }

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }

      // Handle error
      if (!user) {
        return res.status(400).render("login", {
          title: "Login",
          errors: { authentication: [info.message] },
          inputs: req.body,
        });
      }

      // Handle success
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });
    })(req, res, next);
  }),
];

exports.logout_get = asynHandler(async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
