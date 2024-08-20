const express = require("express");
const path = require("path");
require("dotenv").config();

// Import router
const mainRouter = require("./routes/mainRouter");
const adminRouter = require("./routes/adminRouter");
const authRouter = require("./routes/authRouter");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", mainRouter);
app.use("/", authRouter);
app.use("/", adminRouter);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));