var Item = require('../models/item');

//get products function
exports.getItems = async(req,res)=>{
   let itemsList= [];
   try{
    itemsList = await Item.find()
    console.log('in item controller items list:')
    console.log(itemsList)
    res.setHeader('Content-type', 'text/json');
    res.send(itemsList);
   }catch{
    console.log("Something happend at getting items")
    itemsList=[]
   }
};

//create product function
exports.createItem = async(req, res) =>{ 

    var newItem = new Item({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        type: req.body.type
    });

    try{
        await newItem.save(); 
        res.send({
            status: 200,
            message: 'Item Added Successfully'
        });
    console.log('Item added')
    }catch(error){
        console.log("Something happend at creating item");
        console.log(error);      
    }  
};

//delete product function
exports.deleteItem = async(req, res)=> {
    try{
        await Item.findByIdAndRemove(req.params.id)
        console.log("Delete item with with id " + req.params.id);
        res.setHeader('Content-type', 'text/json');
        res.send({
            status: 200,
            message: 'item deleted Successfully'
        });
    }catch(error){
        console.log("something happend in deleting item")
        console.log(error);
        res.redirect('/');
    }
};

//update items function
exports.updateItem = async(req, res)=> {
    try{

        let newItem = await Item.findById(req.body.id);
        let type = newItem.type;

        newItem.name = req.body.name;
        newItem.type = req.body.type;
        newItem.price = req.body.price;

        await newItem.save(); 
        console.log('Item updated succesfully')
        res.send({
            status: 200,
            message: 'Item updated Successfully'
        });
                
    }catch(error){
        console.log("Something happend at updating item");
        console.log(error); 
        res.redirect('/');     
    }
   
};
