const express=require('express');
const user=require('../define')
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const app=express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.isuser=(req,res,next)=>{
    const {email,password}=req.body;
    user.findAll({where:{email:email}})
    .then(users=>{
        let user=users[0];
        if(user)
        {
            if(user.password===password)
            {
                return res.status(201).json({message:'user logged in'})
            }
            else{
                throw new Error('password incorrect');
                res.status(401).json({message:'password incorrect'})
                 
            }
        }
        else{
            throw new Error('user not found');
            return res.status(404).json({message:'user not found'})
        }

    })
    .catch(err=>console.log(err))

}