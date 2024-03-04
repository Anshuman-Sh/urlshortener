const router = require("express").Router();
const urlRoutes = require("./urls.routes");
const userRoutes = require("./users.routes");

const defaultRoutes = [
  {
    path: "/",
    routes: userRoutes,
  },

  {
    path: "/",
    routes: urlRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

module.exports = router;
