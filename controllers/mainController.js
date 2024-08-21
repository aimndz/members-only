const asynHandler = require("express-async-handler");
const {body, validationResult} = require("express-validator")
const db = require("../db/queries");

// Handle home page
exports.index = asynHandler(async (req, res) => {
    res.render("index", { user: req.user });
})

// Handle join GET
exports.join_get = asynHandler(async (req, res) => {
    res.render("join");
})

// Handle join POST
exports.join_post = asynHandler(async (req, res) => {
    // Not implemented yet
})

// Handle create GET
exports.create_get = asynHandler(async (req, res) => {
    res.render("create");
})

// Handle create POST
exports.create_post = [

    // Validate title
    body("title")
        .trim()
        .notEmpty().withMessage("Title should not be empty."),

    // Validate message
    body("message")
        .trim()
        .notEmpty().withMessage("Message should not be empty."),

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
        if (!errors.isEmpty()){
            return res.status(400).render("create", {
                title: "Create",
                errors: errorMap,

                // Pass the input back to the form
                inputs: req.body
            })
        }

        const user_id = req.user.id;
        const {title, message} = req.body;

        await db.insertMessage(user_id, title, message);
        res.redirect("/create");
    })
]