const Order=require('../purdefine')
const User=require('../define')
const expense=require('../expdefine')
const sequelize=require('../database/db')

exports.gettheleaderboard=async(req,res,next)=>{
    try{
        const users=await User.findAll({

            order:[['totalexpenses','DESC']]
        });
        // const expenses=await Expense.findAll({
        //     attributes:['userId',]
        //     ,group:['userId']
        // });
        // console.log(arrofuserexpenses)
        // let userexpenses={};
        
        // console.log(userexpenses)
        // var arrofuserexpenses=[];
        // users.forEach((user)=>{
        //     arrofuserexpenses.push({name:user.name,totalexpenses:expenses['userId']||0})
        // })
        // arrofuserexpenses.sort((a,b)=>b.totalexpenses-a.totalexpenses)
        // console.log(arrofuserexpenses)
        res.status(200).send(users)

        
    }
    catch(err)
    {
        throw new Error(err)
    }

   
}