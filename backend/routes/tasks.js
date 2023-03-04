const router = require("express").Router();
const taskController = require("../controllers/taskController");
const checkToken = require("../middlewares/authenticationToken");

router
  .route("/task")
  .post(checkToken, (req, res) => taskController.create(req, res));

router
  .route("/task/:id")
  .get(checkToken, (req, res) => taskController.get(req, res));

router
  .route("/task/:id")
  .put(checkToken, (req, res) => taskController.upadate(req, res));

router
  .route("/task/:id")
  .delete(checkToken, (req, res) => taskController.delete(req, res));

router
  .route("/task/user")
  .get(checkToken, (req, res) => taskController.getAllTasksUser(req, res));

module.exports = router;
