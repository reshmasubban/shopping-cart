const express = require('express');
const app = express();
const morgan = require("morgan")
const mongoose = require('mongoose');
const authRoute = require('./routs');
//const authRoutes = require('./auth')

mongoose.connect('mongodb+srv://reshma:reshma@cluster0.edeo5.mongodb.net/myFirstDatabase',
{ useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true, })
.then(() => console.log("mongodb connected"))
.catch(err => console.log(err));

app.use(morgan('dev'))
app.use(express.json());

app.use('/api/user',authRoute);


app.listen(4000, () => console.log('Server up and running'));