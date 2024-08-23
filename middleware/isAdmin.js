module.exports = (req, res, next) => {
  if (!req.user.mem_status == "admin") {
    return res.redirect("/");
  }

  next();
};
