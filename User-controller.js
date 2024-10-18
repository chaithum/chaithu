const User = require('../model/User')
const bcrypt = require('bcryptjs')

const getAllUser = async(req, res, next) => {
    let users;
 
    try {
        users = await User.find()
    }
    catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(404).json({ message : "users are not found"})
    }
 
    return res.status(200).json({users});
}


const signUp = async(req, res, next) => {
    const { username, email,phoneNumber, password,confirmPassword} = req.body;
      if(password !== confirmPassword){
        return res.status(400).json({message: "Passwords does not matched"});
      }
    let existingUser;
 
    try {
 
        existingUser = await User.findOne({email})
    } catch(err){
        console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message : "User is already exists!"})
    }
    const hashedPassword = bcrypt.hashSync(password);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword);
    const user = new User({
        username, email,phoneNumber,
        password: hashedPassword,
        confirmPassword:hashedConfirmPassword
    });
 
    try {
 
        user.save()
        return res.status(201).json({ user })
    }
    catch(e){console.log(e);}
}
 

const logIn = async(req, res, next) => {
    const { email, password } = req.body;
 
    let existingUser;
 
    try{
        existingUser = await User.findOne({email})
       }catch(e){
        console.log(err);
       }
       if(!existingUser){
           return res.status(404).json({message : "User is not found"})
       }
 
       const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
 
       if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password!"});
    }
 
    return res.status(200).json({user: existingUser});
}


const updatePassword=async(req,res,next)=>{
    const {email, password,confirmPassword}=req.body;
    if(password !== confirmPassword){
        return res.status(400).json({message: "Passwords does not matched"});
      }
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }
    catch(e){
        console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message : "User is not found"})       
    }
    const hashedPassword = bcrypt.hashSync(password);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword);
    try {
 
        User.updateOne({email:{email}},{$set:{password:{hashedPassword}}},{$set:{confirmPassword:{hashedConfirmPassword}}})
        return res.status(201).json({message:"updated password" })
    }
    catch(e){console.log(e);}
}

const updateProfile=async(req,res,next)=>{
    const { username, email,phoneNumber, password,confirmPassword} = req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }
    catch(e){
        console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message : "User is not found"})       
    }
    try {
 
        User.updateOne({email:{email}},{$set:{password:{password}}},{$set:{username:username}},{$set:{phoneNumber:phoneNumber}},{$set:{confirmPassword:{confirmPassword}}})
        return res.status(201).json({message:"updated password" })
    }
    catch(e){console.log(e);}
}
module.exports = {getAllUser, signUp , logIn, updatePassword,updateProfile};


  

