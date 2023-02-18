const express=require('express');
const user=require('../define')
const bcrypt=require('bcrypt')
const bodyParser = require('body-parser');
const app=express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
function isstringvalidate(string)
{
    if(string==undefined || string.length===0)return true;
    return false;
}

exports.signup=async(req,res,next)=>{
    try{
    const {name,email,password}=req.body;
    if(isstringvalidate(name)||isstringvalidate(email)||isstringvalidate(password))
    {
        return res.status(400).json({err:'something is missing'})
    }
    const saltrounds=10;
   bcrypt.hash(password,saltrounds,async(err,hash)=>{
     await user.create({name,email,password:hash})
    res.status(201).json({message:'successfully new user created'})
   })
}
catch(err){
    res.status(404).json(err)
    console.log(err);
}
}
