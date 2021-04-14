
const Order=require("../models/order")

// exports.orderById= (req,res,next,id) => {
//     Order.findById(id).exec((err,order) => {
//         if(err || !order){
//             return res.status(400).json({
//                 error : "User not found"
//             });
//         }
//         req.order = order;
//         next();
//     });
// }


exports.create = ((req,res) => {
    const order = new Order(req.body);
    order.save((err,data)=>{
        if(err) {
            return res.status(400),json({error:err});
        }
        res.json({data})
    })
})