const User  = require('../models/userModel.js')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const registerUser  = async (req,res) => {
  try{
    const {firstname,lastname,username,password} = req.body;
    const userExist = await User.findOne({username}).select("-password");
    if(userExist){
      return  res.status(401).json('User Name already exist')
    }
    if(password.length < 0){
        return  res.status(401).json('Password length should be grather then 6')
    }
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        firstname,
        lastname,
        username,
        password:hashPassword
    });

   await newUser.save();
   return res.status(201).json({ message: 'User registered successfully' });
  }
  catch(e){
    return res.status(500).json({message:"Server error",error:e.message });
  }
}

const loginUser = async (req,res) => {
  const {username,password} = req.body;
  try{
    const findUser = await User.findOne({username});
  if(!findUser){
    return res.status(404).json({message:"User NOt Found"});
  }

  const hashedPassword = await bcrypt.compare(password,findUser.password);
  if(!hashedPassword){
    return res.status(401).json({error:"Invalid Password"});
  }

  const jwtToken = await jwt.sign({username},process.env.JWT_KEY,{expiresIn:"1h"})

  return res.status(200).json({
    message: "Login successfully",
    token: jwtToken
  });
  }catch(e){
    return res.status(500).json({error:e.message});
  }
}

const getAllUsers = async (req,res) => {
    try{
        const getUsers = await User.find().select("-password");
        return res.status(200).json(getUsers);
    }
    catch(e){
        return res.status(500).json({error:e});
    }
}


const getByid = async (req, res) => {
    const { id } = req.params;
    try {
      const findUser = await User.findById(id).select("-password");
      if (!findUser) {
        return res.status(404).json("User not found"); // 404 Not Found
      }
      return res.status(200).json(findUser);
    } catch (e) {
      return res.status(500).json({ message: "Server error" });
    }
  }


const DeleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteById = await User.findByIdAndDelete(id);
      if (!deleteById) {
        return res.status(404).json({ message: "User not found" }); // 404 Not Found
      }
      return res.status(200).json({ message: "User deleted" });
    } catch (e) {
      return res.status(500).json({ message: "Server error" });
    }
  }

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, username } = req.body;
    try {
      const updateDetails = await User.findByIdAndUpdate(id, {
        firstname,
        lastname,
        username
      }, { new: true, runValidators: true }).select("-password");
  
      if (!updateDetails) {
        return res.status(404).json({ message: "User not found" }); // 404 Not Found
      }
  
      return res.status(200).json({message:"User Details Updated"});
    } catch (e) {
      return res.status(500).json({ message: "Server error" });
    }
  }
module.exports = { registerUser,getAllUsers,getByid,DeleteUser,updateUser,loginUser};