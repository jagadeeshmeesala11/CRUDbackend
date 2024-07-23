const express = require("express");
const router = express.Router();

const {CreateTask,getTasks,updateTask,deleteTask} = require("../controllers/taskController.js")

router.post("/create",CreateTask);
router.get("/",getTasks);
router.put("/update/:id",updateTask);
router.delete("/delete/:id",deleteTask);

module.exports = router;