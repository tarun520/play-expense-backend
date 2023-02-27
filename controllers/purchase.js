const razorpay=require('razorpay')
const Order=require('../purdefine')
const user=require('../define')
const jwt=require('jsonwebtoken')

function generatetoken(id,name,ispremiumuser)
{
    return jwt.sign({userid:id,name:name,ispremiumuser:ispremiumuser},'urhuwqjiakeiq')
}
exports.purchasepremium=(req,res,next)=>{
    const rzp=new razorpay({
        key_id:process.env.key_id,
        key_secret:process.env.key_secret
    })
    const amount=2500;
    rzp.orders.create({amount,currency:'INR'},(err,order)=>{
        if(err)
        {
            throw new Error(JSON.stringify(err))
        }
        req.user.createOrder({orderId:order.id,status:'PENDING'})
        .then(()=>{
            return res.json({order,key_id:rzp.key_id})
        }).catch(err=>{
            throw new Error(err)
        })


    })
}
exports.updatestatus=async(req,res,next)=>{
    try{
        const {payment_id,order_id}=req.body;
        const order=await Order.findOne({where:{orderId:order_id}})
            const promise1= order.update({paymentId:payment_id,status:'success'})
            const promise2= req.user.update({ispremiumuser:true})
         Promise.all([promise1,promise2])
         .then((results)=>{
             res.status(201).json({success:true,message:'transaction successfull',token:generatetoken(req.user.id,undefined,true)})
         }).catch(err=>
             {throw new Error(err)})
    }
    catch(err){
        throw new Error(err)
    }

   
}