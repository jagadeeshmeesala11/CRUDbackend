const express = require("express")
const router = express.Router();

const {registerUser,getAllUsers,getByid,DeleteUser} = require("../controllers/user.js");

router.post("/register",registerUser);
router.get("/",getAllUsers)
router.get("/:id",getByid);
router.delete("/:id",DeleteUser)
module.exports = router;