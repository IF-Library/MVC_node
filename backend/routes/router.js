const router = require("express").Router();

//Services router 
const tasksRouter = require("./tasks");
router.use("/", tasksRouter);

module.exports = router;
