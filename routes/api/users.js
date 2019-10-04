const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
.get(usersController.findAll)
.post(usersController.create)
.put(usersController.update);
// console.log("FROM SERVER API updateUser ====", usersController.update)

// Matches with "/api/users/:id"
router
.route("/current/:userName")
.get(usersController.findById)

router
  .route("/:id")
  .get(usersController.findById)
  // ..put(usersController.update)
  .delete(usersController.remove);
  // console.log("FROM SERVER API ROUTE GETUSER BY ID ====", usersController.findById)

  router
  .route("/login")
  .post(usersController.find)
  // .put(usersController.update)

  

module.exports = router;
