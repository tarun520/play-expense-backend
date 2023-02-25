const express=require('express');
const exps=require('../expdefine')
const bodyParser = require('body-parser');
const sequelize = require('../database/db');
const user=require('../define');
const AWS=require('aws-sdk');
const { response } = require('express');

const app=express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.postexps=async(req,res,next)=>{
    const t=await sequelize.transaction()
    try {
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.choosecategory;
    

        const data=await exps.create({amount:amount,description:description,category:category,userId:req.user.id},{transaction:t})
        const totalexpenses=Number(req.user.totalexpenses)+Number(amount)
        await user.update({totalexpenses:totalexpenses},{where:{id:req.user.id},transaction:t})
        t.commit()
        res.status(201).json({data:data})
        }
         catch (error) {
           await t.rollback()
            console.log(error)
            res.status(500).json({error:error})
        }

}

const ITEMS_PER_PAGE = 2;
exports.getall = async (req, res, next) => {
  try {
    const page=+req.query.page||1;
    const expenses = await exps.findAll({
      where: { userId: req.user.id },
      offset: (page - 1) * 2,
      limit: 2,
    });
    const totalexpenses = await exps.findAll({ where: { userId: req.user.id } });
    res.status(200).json({
      success:true,
      allexpenses: expenses,
      currentpage: page,
      hasnextpage: (ITEMS_PER_PAGE * page < totalexpenses.length),
      nextpage: page + 1,
      haspreviouspage: page > 1,
      previouspage: page - 1,
      lastpage: Math.ceil(totalexpenses / ITEMS_PER_PAGE),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
};
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

async function uploadToS3(data, filename) {
    // try{
        const BUCKET_NAME = 'expensetracker563';
  
    const s3bucket = new AWS.S3({
      accessKeyId: 'AKIAYQF6SJQJWX6V665H',
      secretAccessKey: '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',
    });
  
      var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL:'public-read'
      }
      return new Promise((resolve,reject)=>[
        s3bucket.upload(params, (err, s3response) => {
            if (err) {
              console.log('Something went wrong', err);
              reject(err)
            } else {
              console.log('Uploaded successfully', s3response);
              resolve(s3response.Location)
            }
          })
      ])
    // }
    // catch(err){
    //     throw new Error(err)
    // }

  }
  
  exports.download = async (req, res) => {
    try {
      const expenses = await exps.findAll({ where: { userId: req.user.id } });
      const stringifiedExpenses = JSON.stringify(expenses);
      const userid=req.user.id
      const filename = `Expense.txt${userid}/${new Date()}`;
      const fileurl =await uploadToS3(stringifiedExpenses, filename);
      console.log(fileurl)
      res.status(201).json({ fileurl, success: true });
    } catch (error) {
      console.log(error);
         res.status(500).json({ err: error });
    }
  };

  
  
  
  
  