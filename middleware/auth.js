const jwt=require('jsonwebtoken')
const User=require('../models/define')

const authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorisation')
        const user=jwt.verify(token,'urhuwqjiakeiq')
        console.log(user)
        User.findByPk(user.userid).then(user=>{
            req.user=user;
            next();
        }).catch(err=>console.log(err))
    }
    catch(err)
    {
        return res.status(404).json({success:false})
    }
}
module.exports=authenticate;