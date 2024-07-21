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

const getAllUsers = async (req,res) => {
    try{
        const getUsers = await User.find().select("-password");
        return res.status(200).json(getUsers);
    }
    catch(e){
        return res.status(500).json({error:e});
    }
}


const getByid = async (req,res) => {
    const {id} = req.params;
    try{
        const findUser = await User.findById(id).select("-password");
    if(!findUser){
        return res.status(401).json("User NOt found");
    }
    return res.status(201).json(findUser)
    }catch(e){
        return res.status(500).json(e)
    }
}

const DeleteUser = async (req,res) => {
    const {id} = req.params;
    try{
        const deletebyid = await User.findByIdAndDelete(id);
        if(!deletebyid){
            return res.status(401).json({message:"User Not Fount"})
        }
        return res.status(201).json({message:"User Deleted"})
    }
    catch(e){
        return res.status(500).json(e)
    }

}

const UpdateUser = async (req,res) => {
    const {id} = req.params;
    const { firstname, lastname, username } = req.body
    try{
        const updateDetails = await User.findByIdAndUpdate(id,{
            firstname,
            lastname,
            username
        },{ new: true, runValidators: true }).select("-password");

        if(!updateDetails){
            return res.status(401).json({message:"User Not Fount"})
        }

        return  res.status(200).json(updateDetails)
    }
    catch(e){
        return res.status(500).json({ message: "Server error", error: e.message });
    }
}

module.exports = { registerUser,getAllUsers,getByid,DeleteUser};