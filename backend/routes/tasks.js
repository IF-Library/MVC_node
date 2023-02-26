const router = require("express").Router();

const taskController = require("../controllers/taskController");


router.route("/task").post((req, res) => taskController.create(req, res));

router.route("/task").get((req, res) => taskController.getAll(req, res));

router.route("/task/:id").get((req, res) => taskController.get(req, res));

router.route("/task/:id").put((req, res) => taskController.upadate(req, res));

router.route("task/:id").delete((req, res) => taskController.delete(req, res));

module.exports = router;

