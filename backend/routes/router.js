const router = require("express").Router();

//Services router 
const tasksRouter = require("./tasks");
router.use("/", tasksRouter);

const userRouter = require("./users");
router.use("/", userRouter);

const loginRouter = require("./login");
router.use("/", loginRouter);

module.exports = router;
