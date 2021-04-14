const express = require('express');
const app = express();
const morgan = require("morgan")
const mongoose = require('mongoose');
const productRoutes = require("./routs/product")
const userRoutes = require("./routs/user")
const orderRoutes = require("./routs/order")

mongoose.connect('mongodb+srv://reshma:reshma@cluster0.edeo5.mongodb.net/myFirstDatabase',
{ useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true, })
.then(() => console.log("mongodb connected"))
.catch(err => console.log(err));

app.use(morgan('dev'))
app.use(express.json());

app.use('/api',userRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes)

app.listen(3000, () => console.log('Server up and running'));