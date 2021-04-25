
var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    topping:[{
        id: { type: Number, unique: true},
        name: { type: String, unique: true},
        price: Number
    }],
    size: [{
        id: { type: Number, unique: true},
        name: { type: String, unique: true},
        price: Number
    }],
    base: [{
        id: { type: Number, unique: true},
        name: { type: String, unique: true},
        price: Number
    }],
})

module.exports = mongoose.model('Item', orderSchema);