const express=require('express')
const app=express();
const router=express.Router();
const exps=require('../controllers/exps.js')
const authenticate=require('../middleware/auth')

router.post('/expenses/add',authenticate,exps.postexps)
router.get('/expenses/getall',authenticate,exps.getall)
router.delete('/expenses/delete/:id',authenticate,exps.delete)
module.exports=router
