const express=require('express');
const exps=require('../expdefine')
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const user=require('../define');
const { where } = require('sequelize');

const app=express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.postexps=async(req,res,next)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.choosecategory;
    if(amount)
    try {
        const data=await exps.create({amount:amount,description:description,category:category,userId:req.user.id})
        const totalexpenses=Number(req.user.totalexpenses)+Number(amount)
        user.update({
            totalexpenses:totalexpenses
        },{where:{id:req.user.id}})
        console.log(data)
        res.status(201).json({data:data})
        } catch (error) {
            console.log(error)
            res.status(500).json({error:error})
        }

}
exports.getall=async(req,res,next)=>{
    try{
   const expenses= await exps.findAll({where:{userId:req.user.id}})
   res.status(200).json({allexpenses:expenses})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({err:error})
    }
}
exports.delete=async(req,res,next)=>{
    try{
    const id=req.params.id;
   exps.destroy({where:{id:id,userId:req.user.id}})
   .then((noofrows)=>{
    if(noofrows===0)
    {
        return noofrows.status(400).json({success:failed,message:'this is not your expense'})
    }
    return  res.status(200)
   })
  
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({err:err})
    }
}