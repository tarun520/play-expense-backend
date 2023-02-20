const express=require('express')
const app=express();
const router=express.Router();
const logs=require('../controllers/login.js')


router.post('/user/login',logs.isuser)
module.exports=router