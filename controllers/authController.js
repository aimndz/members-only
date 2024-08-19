const asynHandler = require("express-async-handler");

// Handle sign up GET
exports.sign_up_get = asynHandler(async (req, res) => {
    res.render("sign-up");
})

// Handle sign up POST
exports.sign_up_post = asynHandler(async (req, res) => {
    //Not implemented yet
})

// Handle login get
exports.login_get = asynHandler(async (req, res) => {
    res.render("login");
})

// Handle login POST
exports.login_post = asynHandler(async (req, res) => {
    // Not implemented yet
})