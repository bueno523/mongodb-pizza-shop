var Order = require('../models/order');

//get orders function
exports.getOrders = async(req,res)=>{
   let ordersList= [];
   try{
    ordersList = await Order.find()
   }catch{
    console.log("Something happend at getting orders")
    ordersList=[]
   }
};

//create order function
exports.createOrder = async(req, res) =>{ 
    const id = req.body.id;
    const name = req.body.name;
    const section = req.body.section;
    const price = req.body.price;

    let newOrder = new Order({
        id: req.body.id,
        size: req.body.size,
        toppings: req.body.toppings,
        price: req.body.price,
        address: req.body.address
    });

    try{
        await newOrder.save(); 
        res.setHeader('Content-type', 'text/json');
        res.send({
            status: 200,
            message: 'Order Sent Successfully'
        });
            
    }catch(error){
        console.log("Something happend at creating Order");
        console.log(error);      
    }
};

//remove order function
exports.deleteOrder = async(req, res)=> {
    try{
        await Order.findByIdAndRemove(req.params.id)
        console.log("trying to delete order with with id " + req.params.id);
        res.setHeader('Content-type', 'text/json');
        res.send({
            status: 200,
            message: 'Order Removed Successfully'
        });
    }catch(error){
        console.log("something happend in deleting order")
        console.log(error);
        res.redirect('/');
    }
    
};