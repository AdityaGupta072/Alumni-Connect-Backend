const express= require("express");
const router= express.Router();
const User= require("../models/user");
const authMiddleware=require("../middlewares/authMiddleware");

//Get User profile id
router.get("/:id",authMiddleware, async(req,res)=>{
    try{
        const user= await User.findById(req.params.id).select("-password");
        if(!user) return res.status(404).json({message:"User not found"});
        res.json(user);
    }
    catch{
        res.status(500).json({message:"Server Error"});
    }
});

//Update User profile

router.put("/:id",authMiddleware,async(req,res)=>{
    if(req.user.id!=req.params.id){
        return res.status(403).json({message:"Unauthorized"})
    }
    try{
        const updatedUser= await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).select("-password");
        res.json(updatedUser);
    }
    catch{
        res.status(500).json({message:"Server Error"});
    }
});

//Get All users
router.get("/",authMiddleware,async(req,res)=>{
    try{
       const{name}=req.query;
       let users;
       if(name){
        const regex= new RegExp(name,"i");
        users =await User.find({name:regex}).select("-password");
       }
       else{
        users= await User.find().select("-password");
       }
       res.json(users);
    }
    catch{
        res.status(500).json({message:"Server Error"});
    }
});

module.exports=router;