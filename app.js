const express = require("express");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const passport = require("./config/passport");
const ejsLayouts = require("express-ejs-layouts");

// Import routers
const mainRouter = require("./routes/mainRouter");
const adminRouter = require("./routes/adminRouter");
const authRouter = require("./routes/authRouter");
const setLayout = require("./middleware/setLayout");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.set("layout", "layouts/main");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(setLayout);

// Initialize session and passport
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use("/", mainRouter);
app.use("/", authRouter);
app.use("/", adminRouter);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
