const router = require("express").Router();

const taskController = require("../controllers/taskController");

router.
route("/task").
post((req, res) => taskController.create(req, res))

module.exports = router;

