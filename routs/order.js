const express=require("express")
const {userById } = require("../controllers/user");
const {productById,reduceQuantity} = require("../controllers/product")
const {create, orderById} = require("../controllers/order");

const router = express.Router();

router.post("/order/create/:productId/:userId",reduceQuantity,create)

router.param('userId',userById);
router.param('productById',productById)


module.exports=router

