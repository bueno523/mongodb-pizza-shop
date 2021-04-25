
var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    size: String,
    base: String,
    toppings: [{type: String}],
    price: Number,
    address: String
})

module.exports = mongoose.model('Order', orderSchema);