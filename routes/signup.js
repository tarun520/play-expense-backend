const express=require('express')
const app=express();
const router=express.Router();
const conts=require('../controllers/signup')

router.post('/user/signup',conts.signup)



module.exports=router