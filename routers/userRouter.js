const express = require("express")
const router = express.Router();
const authenticateToken = require("./middleware/authentication.js")
const {registerUser,getAllUsers,getByid,deleteUser,loginUser,updateUser} = require("../controllers/user.js");

router.post("/register",registerUser);
router.get("/",authenticateToken,getAllUsers);
router.get("/:id",authenticateToken,getByid);
router.delete("/delete/:id",authenticateToken,deleteUser);
router.post("/login",loginUser);
router.put("/update/:id",authenticateToken,updateUser);
module.exports = router;