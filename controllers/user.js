const User= require('../models/user');
const jwt = require("jsonwebtoken")
require("dotenv").config()
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    secureConnection: false,
    port: process.env.SMTP_PORT,
      auth: {
        user:  process.env.SMTP_USERNAME,
        pass:  process.env.SMTP_PASSWORD
      }
    });

exports.userById= (req,res,next,id) => {
        User.findById(id).exec((err,user) => {
            if(err || !user){
                return res.status(400).json({
                    error : "User not found"
                });
            }
            req.profile = user;
            next();
        });
    }

exports.login = ((req, res) => {
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

const newUser = (req, res) => {
    const { name, email, password, role } = req.body;
    const data = new User({ name, email, password, role });
    data.save((err, success) => {
        if (err) {
            return res.status(400), json({ error: err });
        }
        const mailInfo = {
            from: "reshmasubban25@gmail.com",
            to: "reshmas2021@srishakthi.ac.in",
            subject: "It works",
        };
        //transporter.sendMail(mailInfo);
        res.send("email sent");
        res.json({
            message: "signup succesfull"
        })
    })
}

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    User.findOne({ email }, ((err, user) => {
        if (user) {
            return res.status(400).json({ error: "user with this email already exits" });
        }
    }))
    await newUser(req, res)
}

// const newUser = new User({ name, email, password, role });
// newUser.save((err, success) => {
//     if (err) {
//         return res.status(400), json({ error: err });
//     }
//     const mailInfo = {
//         from: "reshmasubban25@gmail.com",
//         to: "reshmas2021@srishakthi.ac.in",
//         subject: "It works",
//     };
//     //transporter.sendMail(mailInfo);
//     res.send("email sent");
//     res.json({
//         message: "signup succesfull"
//     })
// })

// exports.register = (req, res) => {
//     const { name, email, password, role } = req.body;
//     User.findOne({ email }, ((err, user) => {
//         if (user) {
//             return res.status(400).json({ error: "user with this email already exits" });
//         }
//     }))
    
// }

exports.isSuperAdmin = (req,res,next) => {
    if(req.profile.role != 1){
        return res.status(403).json({
            error:"Super Admin Resource! Access Denied"
        })
    }
    next();
}

exports.profile = (req,res) => {
    return res.json(req.profile)
}

exports.superAdmin = (req,res) =>{
    User.find({role:{$ne:1}})
    .select(["name","email"])
        .exec((err,data) =>{
            if(err){
                return res.status(400).json({
                    error:"No user found"
                })
            }
            res.json(data)
        })
}
exports.isAdmin = (req,res,next) => {
    if(req.profile.role != 2){
        return res.status(403).json({
            error:"Admin Resource! Access Denied"
        })
    }
    next();
}
exports.admin=((req,res) =>{
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
