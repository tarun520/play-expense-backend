const Sequelize=require('sequelize');

const sequelize=require('./database/db');

const user=sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowedNull:false
    },
    name:{
        type:Sequelize.STRING,
    },
    email:{
        type:Sequelize.STRING,
        unique:true
    },
    password:{
        type:Sequelize.STRING
    },
    ispremiumuser:Sequelize.BOOLEAN,
    totalexpenses:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
})
module.exports=user