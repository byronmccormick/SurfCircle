import User from '../models/user.model.js';
import bcyrptjs from 'bcryptjs';

export const signup = async (req,res)=>{
    const {username,email,password}= req.body;
    
    if(!username || !email || !password || username=="" || email=="" || password==""){
        return res.status(400).json({message: 'All fields are required'});
    }

    const hashedPassword = bcyrptjs.hashSync(password,10)

    const newUser = new User({
        //in ES6 if key-values are similair we can short hand like this
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}