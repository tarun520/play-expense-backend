const Order=require('../purdefine')
const User=require('../define')
const Expense=require('../expdefine')
const Sequelize=require('../database/db')

exports.gettheleaderboard=async(req,res,next)=>{
    try{
        const users=await User.findAll();
        const expenses=await Expense.findAll();
        let userexpenses={};
        
        expenses.forEach((expense)=>{
            if(userexpenses[expense.userId])
            {
                userexpenses[expense.userId]=userexpenses[expense.userId] + expense.amount;
    
            }
            else{
                userexpenses[expense.userId]=expense.amount;
            }
        })
        console.log(userexpenses)
        var arrofuserexpenses=[];
        users.forEach((user)=>{
            arrofuserexpenses.push({name:user.name,totalexpenses:userexpenses[user.id]||0})
        })
        arrofuserexpenses.sort((a,b)=>b.totalexpenses-a.totalexpenses)
        console.log(arrofuserexpenses)
        res.status(200).send(arrofuserexpenses)

        
    }
    catch(err)
    {
        throw new Error(err)
    }

   
}