"use strict"; 
require('dotenv').config()
const express=require('express');
const Sequelize=require('sequelize')
const sequelize=require('./database/db')
const user=require('./models/define')
const expenses=require('./models/expdefine')
const Order=require('./models/purdefine')
const forgotpassword=require('./models/forgot-pass-define')
const bodyParser = require('body-parser');
const cors=require('cors')
const signuproutes=require('./routes/signup')
const loginroutes=require('./routes/login')
const expenseroutes=require('./routes/exps.js')
const purchaseroutes=require('./routes/purchase')
const premiumfeatureroutes=require('./routes/premiumfeatures')
const resetpassroutes=require('./routes/reset-password')
const helmet=require('helmet')
const compression=require('compression')
const morgan=require('morgan')
const fs=require('fs')
const path=require('path')

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const accesslogstream=fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags:'a'}
)

app.use(helmet())
app.use(compression())
app.use(morgan('combined',{stream:accesslogstream}))
app.use(signuproutes)
app.use(loginroutes)
app.use(expenseroutes)
app.use(purchaseroutes)
app.use(premiumfeatureroutes)
app.use(resetpassroutes)

user.hasMany(expenses);
expenses.belongsTo(user)

user.hasMany(Order);
Order.belongsTo(user)

user.hasMany(forgotpassword);
forgotpassword.belongsTo(user);

sequelize.sync()
.then(app.listen(3000))
.catch(err=>console.log(err))

