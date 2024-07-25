const express = require("express");
const router = express.Router();
const authenticateToken = require("./middleware/authentication.js")

const {CreateTask,getTasks,updateTask,deleteTask} = require("../controllers/taskController.js")

router.post("/create",authenticateToken,CreateTask);
router.get("/",authenticateToken,getTasks);
router.put("/update/:id",authenticateToken,updateTask);
router.delete("/delete/:id",authenticateToken,deleteTask);

module.exports = router;