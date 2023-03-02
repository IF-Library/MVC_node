const router = require("express").Router();
const taskController = require("../controllers/taskController");
require('dotenv').config();
const jwt = require('jsonwebtoken');

router.use(checkToken);

router.route("/task").post((req, res) => taskController.create(req, res));

//router.route("/task").get((req, res) => taskController.getAll(req, res));

router.route("/task/:id").get((req, res) => taskController.get(req, res));

router.route("/task/:id").put((req, res) => taskController.upadate(req, res));

router.route("/task/:id").delete((req, res) => taskController.delete(req, res));

router.route("/task/user/:userId").get((req, res) => (taskController.getAllTasksUser(req, res)));

module.exports = router;


function checkToken(req, res, next) {
    const authHearder = req.headers['authorization'];
    const token = authHearder && authHearder.split(' ')[1];
    if (!authHearder) {
        return res.status(403).json({ msg: "Acesso negado" });
    }
    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret)
        return next();
    } catch (error) {
        return res.status(400).json({ msg: "Token inválido" })
    }
}
