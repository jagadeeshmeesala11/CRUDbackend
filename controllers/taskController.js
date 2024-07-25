const Task = require("../models/taskModel.js");

const getTasks = async (req,res) => {
   try{
    const getAllTasks = await Task.find({user: req.user._id});
    return res.status(200).json({data:getAllTasks})
    
   }catch(e){
    return res.status(500).json({error:e.message});
   }
}

const CreateTask = async (req, res) => {
    try {
      const { title, completed } = req.body;
  
      
      console.log('req.user:', req.user);
  
    
      if (!req.user || !req.user._id) {
        return res.status(400).json({ message: 'User ID is missing' });
      }
  
     
      const createNewTask = new Task({
        title,
        completed,
        user: req.user._id, 
      });
  
     
      await createNewTask.save();
  
      return res.status(201).json({ message: 'Task Created' });
    } catch (e) {
      // Return an error response if something goes wrong
      return res.status(500).json({ error: e.message });
    }
  };
  

const updateTask = async (req,res) => {
    const {id} = req.params;
    const {title,completed} = req.body;
    try{
        const findTask = await Task.findByIdAndUpdate({_id:id,user: req.user._id},{
            title,
            completed
        },{ new: true, runValidators: true });

        if(!findTask){
            return res.status(404).json({message:"Task Not found"});   
        }
       
        return res.status(200).json({message:"Task Updated"});

    }
    catch(e){
        return res.status(500).json({error:e.message});
    }
}

const deleteTask = async (req,res) => {
    const {id} = req.params;
    try{
        const Delete = await Task.findByIdAndDelete(id);
    if(!Delete){
        return res.status(404).json({message:"Task Not found"});  
    }
    return res.status(200).json({message:"Task Deleted Successfully"});  
    }
    catch(e){
        return res.status(500).json({error:e.message});
    }

}


module.exports = {CreateTask,getTasks,updateTask,deleteTask};