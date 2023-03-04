const router = require("express").Router();
const userController = require("../controllers/userController");
const checkToken = require("../middlewares/authenticationToken");

router.route("/user").post((req, res) => userController.create(req, res));

router
  .route("/user")
  .get(checkToken, (req, res) => userController.get(req, res));

router
  .route("/user")
  .put(checkToken, (req, res) => userController.update(req, res));

router
  .route("/user")
  .delete(checkToken, (req, res) => userController.delete(req, res));

module.exports = router;
