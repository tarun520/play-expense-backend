const razorpay=require('razorpay')
const Order=require('../purdefine')

exports.purchasepremium=(req,res,next)=>{
    const rzp=new razorpay({
        key_id:'rzp_test_P50nvoaTKdgqqq',
        key_secret:'kvl71zSdEFli9Gfzj8lUs5eR'
    })
    const amount=2500;
    rzp.orders.create({amount,currency:'INR'},(err,order)=>{
        if(err)
        {
            throw new Error(JSON.stringify(err))
        }
        req.user.createOrder({orderId:order.id,status:'PENDING'})
        .then(()=>{
            return res.status(201).json({order,key_id:rzp.key_id})
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
         Promise.All([promise1,promise2])
         .then((res)=>{
             res.status(201).json({success:true,message:'transaction successfull'})
         }).catch(err=>
             {throw new Error(err)})
    }
    catch(err){
        throw new Error(err)
    }

   
}