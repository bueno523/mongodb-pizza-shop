
var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    id: { type: Number, unique: true},
    size: String,
    toppings: [{type: string}],
    price: Number,
    address: String
})

module.exports = mongoose.model('Order', orderSchema);