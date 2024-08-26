module.exports = (req, res, next) => {
  const subLayoutPaths = ["/login", "/sign-up", "/join", "/create", "/admin"];

  if (
    subLayoutPaths.includes(req.path) ||
    /^\/\d+\/delete$/.test(req.path) // Matches '/:id/delete'
  ) {
    res.locals.layout = "layouts/sub";
  } else {
    res.locals.layout = "layouts/main";
  }
  next();
};
