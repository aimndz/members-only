const asynHandler = require("express-async-handler");


// Handle home page
exports.index = asynHandler(async (req, res) => {
    res.render("index");
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
exports.create_post = asynHandler(async (req, res) => {
    // Not implemented yet
})