const express=require('express')
const app=express();
const router=express.Router();
const resetpass=require('../controllers/forgot-password')

router.post('/password/forgotpassword',resetpass.forgotpassword)
router.get('/password/resetpassword/:id',resetpass.resetpassword)
router.get('/password/updatepassword/:id',resetpass.updatepassword)


module.exports=router