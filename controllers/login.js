const express=require('express');
const user=require('../define')
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const app=express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
function isstringvalidate(string)
{
    if(string==undefined || string.length===0)return true;
    return false;
}
function generatetoken(id,name)
{
    return jwt.sign({userid:id,name:name},'urhuwqjiakeiq')
}

exports.isuser=async(req,res,next)=>{
    try{
    const {email,password}=req.body;
    if(isstringvalidate(email) || isstringvalidate(password))
    {
        return res.status(400).json({message:'bad parameters something is missing'})
    }
  const users =await user.findAll({where:{email:email}})

        if(users.length>0)
        {
            bcrypt.compare(password,users[0].password,(err,result)=>{
            if(err)
            {
                return result.status(500).json({message:'somethingwent wrong'})
            }
            if(result===true)
            {
                return res.status(201).json({message:'user logged in',token:generatetoken(users[0].id,users[0].name)})
            }
            else{
               return res.status(401).json({message:'password incorrect'})
                 
            }
            })
            
        }
        else{
            return res.status(404).json({message:'user not found'})
        }
 
    }
    catch(err){
        return res.status(500).json({message:err})
    }
}