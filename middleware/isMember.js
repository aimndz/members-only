module.exports = (req, res, next) => {
  if (req.user.mem_status !== "member") {
    return res.redirect("/");
  }

  next();
};
