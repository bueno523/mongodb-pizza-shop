var Order = require('../models/order');

//get orders function
exports.getOrders = async(req,res)=>{
   let ordersList= [];
   try{
    ordersList = await Order.find()
    res.setHeader('Content-type', 'text/json');
    res.send(ordersList);
   }catch{
    console.log("Something happend at getting orders")
    ordersList=[]
   }
};

//create order function
exports.createOrder = async(req, res) =>{ 

    let newOrder = new Order({
        id: req.body.id,
        size: req.body.size,
        base: req.body.base,
        toppings: req.body.toppings,
        price: req.body.price,
        address: req.body.address
    });
    console.log('')
    try{
        await newOrder.save(); 
        console.log('order created succesfully');
        console.log(newOrder)
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
        await Order.findByIdAndRemove(req.body.id)
        console.log('order removed succesfully')
        console.log(req.body.id)
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