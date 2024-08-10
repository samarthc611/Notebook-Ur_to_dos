const express = require('express');
const User = require('../Models/User');
const { query, validationResult, body } = require('express-validator');
const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../Middleware/fetchuser');

// ROUTE 1 : to create a user using /api/auth/createuser  login not required
router.post('/createuser',[
    body('name','invalid name').isLength({min:3}),
    body('email','invalid email').isEmail(),
    body('password','invalid password').isLength({min:5}),
] , async (req,res)=>{
    const errors = validationResult(req);
    let success = false;
    try {
        if(!errors.isEmpty()){
            return res.status(400).json({success , errors:errors.array()}); 
        }
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password,salt);
        User.create({
            name:req.body.name,
            email:req.body.email,
            password:securedPassword
        })
        const data = {
            user : {
                id : User.id
            }
        }
        success = true;
        var token = jwt.sign(data, 'jwt--secret');
        console.log(token);
        res.json({success,token});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured.")
    }
    
})


// ROUTE 2 : to authenticate a user /api/auth/login  login not required
router.post('/login',[
    body('email','invalid email').isEmail(),
    body('password','Password should not be empty').exists(),
] , async (req,res)=>{
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({success , errors:errors.array()}); 
    }
    const {email,password} = req.body
    try {
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({success , errors:"Please enter correct credentails"}); 
        }
        const passwordcomp = await bcrypt.compare(password , user.password);
        if(!passwordcomp){
            success = false;
            return res.status(400).json({success , errors:"Please enter correct credentails"}); 
        }
        const data = {
            user : {
                id : user.id
            }
        }
        success = true;
        var tokenauth = jwt.sign(data, 'jwt--secret'); 
        res.json({success , tokenauth});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured.")
    }
    
})


// ROUTE 3 : to get a user /api/auth/getuser   login required
router.post('/getuser', fetchuser,async (req,res)=>{
    try {
        userid = req.user.id;
        const user = await User.findById(userid).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured.")
    }
})

// ROUTE 4 : to get a user /api/auth/edituser   login required
router.put("/edituser", async (req, res) => {
    const { ename, eemail,_id } = req.body;
    let edituser = {};
  
    // Update newnote object based on provided values
    if (ename !== undefined) {
        edituser.name = ename;
    }
    if (eemail !== undefined) {
        edituser.email = eemail;
    }

    edituser._id = _id;
    try {
      // Find the note and update it
      let olduser = await User.findById(_id);
      if (!olduser) {
        return res.status(404).send("Not Found");
      }
  
      
  
      // Update the note
      edituser = await User.findByIdAndUpdate(
        _id,
        { $set: edituser },
        { new: true }
      );
      res.json( edituser );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });


module.exports =  router