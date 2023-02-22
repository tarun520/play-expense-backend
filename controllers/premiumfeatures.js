const Order=require('../purdefine')
const User=require('../define')
const expense=require('../expdefine')
const sequelize=require('../database/db')

exports.gettheleaderboard=async(req,res,next)=>{
    try{
        const users=await User.findAll({

            order:[['totalexpenses','DESC']]
        });
        res.status(200).send(users)

        
    }
    catch(err)
    {
        throw new Error(err)
    }

   
}