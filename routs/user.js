const express=require("express")
const {login,register, isSuperAdmin, superAdmin, userById, isAdmin, admin, profile} = require("../controllers/user");
const router = express.Router();

router.post("/login",login)
router.post("/register",register)
router.get("/supeadmin/:userId",isSuperAdmin,superAdmin)
router.get("/admin/:userId",isAdmin,admin)
router.get("/profile/:userId",profile)

router.param('userId',userById);
module.exports=router