const express=require('express')
const app=express();
const router=express.Router();
const exps=require('../controllers/exps.js')

router.post('/expenses/add',exps.postexps)
router.get('/expenses/getall',exps.getall)
router.delete('/expenses/delete/:id',exps.delete)
module.exports=router
