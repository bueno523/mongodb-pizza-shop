
var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
        id: { type: Number, unique: true},
        name: { type: String, unique: true},
        price: Number,
        type: {
            type: String,
            enum: ['topping', 'size', 'base']
        }

})

module.exports = mongoose.model('Item', itemSchema);