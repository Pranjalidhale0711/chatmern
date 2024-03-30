// import { error } from "console";
import User from '../models/user.models.js'
import bcryptjs from'bcryptjs';
import generateTokenAndSetCookie from '../utilis/generatetokenjws.js';

export const login=async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        const isPasswordcorrect=await bcryptjs.compare(password,user?.password || "");
        if(!user||isPasswordcorrect)
        {
            return res.status(400).json({error:"invalid"})
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic,
        });


    } catch(err){
        console.log(err);
    }
    res.send("loginroute")
};
export const signup=async(req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender}=req.body;
        if(password!=confirmPassword)
        {
            return res.status(400).json({error:"password does not match"});
        }
        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({error:"user already exist"});
        }
        const salt=await bcryptjs.genSalt(10);
        const hashpassword=await bcryptjs.hash(password,salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
			fullName,
			username,
			password:hashpassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

       
			// Generate JWT token here
		    	generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		

    }
    catch(err){
        console.log(err);
    }
    // res.send("signroute")
};
export const logout=(req,res)=>{
    // res.send("logoutroute")
    try{
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json("logout successfully");

    } catch(err){
        console.log(err);
    }
};