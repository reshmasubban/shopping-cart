require("dotenv").config()
const router = require('express').Router();
const User= require('./user');

const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: process.env.SMTP_HOST,
//     secureConnection: false,
//     port: process.env.SMTP_PORT,
//       auth: {
//         user:  process.env.SMTP_USERNAME,
//         pass:  process.env.SMTP_PASSWORD
//       }
//     });
  



router.post('/login', async (req,  res) => {
    const { email,password } = req.body
    User.findOne({email},(err,user) => {
        if(err || !user){
            return res.status(400).json({
                error : 'User with this email does not exist'
            });
        }

        // creating token with JWT
        const token = jwt.sign({_id : user._id}, "reshma");


        const {_id,name,email,role} = user

        return res.json({token,user : { _id, name, email,role}});
    });
});

router.post('/register',async (req,res) => {
    const {name,email,password,role}=req.body;
    User.findOne({email}).exec((err,user) => {
        if(user){
            return res.status(400).json({error:"user with this email already exits"});
        }
        const newUser = new User({name,email,password,role});
        newUser.save((err,success)=>{
            if(err) {
                return res.status(400),json({error:err});
            }
            res.json({
                message:"signup succesfull"
            })
            // const mailInfo = {
            //     from: "reshmasubban25@gmail.com",
            //     to: newUser.email,
            //     subject: "It works",
            // };
            // transporter.sendMail(mailInfo);
            // res.send("email sent");
        })
    })
})



router.get("/user/:userId",(req,res) => {
    res.json({
        user:req.profile
    })
})
const isSuperAdmin = (req,res,next) => {
    if(req.profile.role != 1){
        return res.status(403).json({
            error:"Super Admin Resource! Access Denied"
        })
    }
    next();
}
router.get("/superadmin/:userId",isSuperAdmin,(req,res) =>{
    User.find({role:{$ne:1}})
    .select("name","email")
        .exec((err,data) =>{
            if(err){
                return res.status(400).json({
                    error:"No user found"
                })
            }
            res.json(data)
        })
})

const isAdmin = (req,res,next) => {
    if(req.profile.role != 2){
        return res.status(403).json({
            error:"Admin Resource! Access Denied"
        })
    }
    next();
}
router.get("/admin/:userId",isAdmin,(req,res) =>{
    User.find({role:{$nin:[1,2]}})
        .exec((err,data) =>{
            if(err){
                return res.status(400).json({
                    error:"No user found"
                })
            }
            res.json(data)
        })
    
})


router.param('userId',(req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error : "User not found"
            });
        }
        req.profile = user;
        next();
    });
})

// router.patch('update/:userId',async (req,res)=> {
//     try{
//         const updatedPost = await User.updateOne(
//             { _id: req.params.userId},
//             { $set: { router: req.body.router}
//         } );
//         res.json(updatedPost);
//     } catch (err) {
//         res.json({ message:err});
//     }
// });

module.exports = router;