const router = require("express").Router();
const userRoutes = require("./users");
const cartRoutes = require("./cart");
const walmartRoutes = require("./walmart");

// User routes
router.use("/users", userRoutes);

// Item routes
router.use("/cart", cartRoutes);
router.use("/walmart", walmartRoutes);

module.exports = router;
