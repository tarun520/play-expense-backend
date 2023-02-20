const express=require('express')
const app=express();
const router=express.Router();
const purchases=require('../controllers/purchase')
const authenticate=require('../middleware/auth')

router.get('/premium/premiummembership',authenticate,purchases.purchasepremium)
router.post('/updatetransactionstatus',authenticate,purchases.updatestatus)
module.exports=router;