const Sequelize=require('sequelize');

const sequelize=require('../database/db');

const expense=sequelize.define('exps',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    description:{
        type:Sequelize.STRING,
    },
    category:{
        type:Sequelize.STRING
    }
})

module.exports=expense;