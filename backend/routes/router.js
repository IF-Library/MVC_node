const router = require("express").Router();

//Services router 
const tasksRouter = require("./tasks");
router.use("/", tasksRouter);

const userRouter = require("./users");
router.use("/", userRouter);

module.exports = router;
