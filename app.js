const express=require('express');
const Sequelize=require('sequelize')
const sequelize=require('./database/db')
const user=require('./define')
const expenses=require('./expdefine')
const bodyParser = require('body-parser');
const cors=require('cors')
const signuproutes=require('./routes/signup')
const loginroutes=require('./routes/login')
const expenseroutes=require('./routes/exps.js')

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.use(signuproutes)
app.use(loginroutes)
app.use(expenseroutes)

user.hasMany(expenses);
expenses.belongsTo(user)

sequelize.sync()
.then(app.listen(3000))
.catch(err=>console.log(err))

