const express=require('express')
const app=express();
const router=express.Router();
const premium=require('../controllers/premiumfeatures')
const authenticate=require('../middleware/auth')

router.get('/premium/leaderboard',authenticate,premium.gettheleaderboard)

module.exports=router