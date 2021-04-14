const express=require("express")
const {userById, isAdmin} = require("../controllers/user");
const {create, list, product, productById,update, remove} = require("../controllers/product");

const router = express.Router();

router.post("/product/create/:userId",isAdmin,create)
router.put("/product/update/:productId/:userId",isAdmin,update)
router.delete("/product/delete/:productId/:userId",isAdmin,remove)
router.get("/product/list",list)
router.get("/product/:productId",product)

router.param('userId',userById);
router.param('productId',productById);
module.exports=router

