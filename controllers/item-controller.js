var Item = require('../models/item');

//get products function
exports.getItems = async(req,res)=>{
   let itemsList= [];
   try{
    itemsList = await Item.find()
   }catch{
    console.log("Something happend at getting items")
    itemsList=[]
   }
   //rendering index page, sending the fetched products
};

//create product function
exports.createItem = async(req, res) =>{ 
    const id = req.body.id;
    const name = req.body.name;
    const section = req.body.section;
    const price = req.body.price;

    if ( section=='base') {
        var newItem = new Item({
            base: {
                id: id,
                name: name,
                price: price
            }       
        });
    }
    if ( section=='size') {
        var newItem = new Item({
            size: {
                id: id,
                name: name,
                price: price
            }       
        });
    }
    if ( section=='topping') {
        var newItem = new Item({
            topping: {
                id: id,
                name: name,
                price: price
            }       
        });
    }

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
        console.log("trying to delete item with with id " + req.params.id);
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

        let newItem = await Product.findById(req.body.id);
        let section = Object.keys(myObj)[0];

        if ( section=='base') {
            newItem.base.id = req.body.id;
            newItem.base.name = req.body.name;
            newItem.base.section = req.body.section;
            newItem.base.price = req.body.price;
        }
        if ( section=='size') {
            newItem.size.id = req.body.id;
            newItem.size.name = req.body.name;
            newItem.size.section = req.body.section;
            newItem.size.price = req.body.price;
        }
        if ( section=='topping') {
            newItem.topping.id = req.body.id;
            newItem.topping.name = req.body.name;
            newItem.topping.section = req.body.section;
            newItem.topping.price = req.body.price;
        }

        await newItem.save(); 
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
