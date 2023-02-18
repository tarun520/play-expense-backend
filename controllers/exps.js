const express=require('express');
const exps=require('../expdefine')
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app=express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.postexps=async(req,res,next)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.choosecategory;
    try {
        const data=await exps.create({amount:amount,description:description,category:category})
        console.log(data);
        res.status(201).json({data:data})
        } catch (error) {
            console.log(err)
            res.status(500).json({err:err})
        }

}
exports.getall=async(req,res,next)=>{
    try{
   const expenses= await exps.findAll()
   res.status(200).json({allexpenses:expenses})
    }
    catch (error) {
        console.log(err)
        res.status(500).json({err:err})
    }
}
exports.delete=async(req,res,next)=>{
    try{
    const id=req.params.id;
   await exps.destroy({where:{id:id}})
   res.status(200)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({err:err})
    }
}