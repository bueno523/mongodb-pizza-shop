
var mongoose = require('mongoose');

var toppingSchema = new mongoose.Schema({
    id: { type: Number, unique: true},
    name: { type: String, unique: true},
    price: Number
})

module.exports = mongoose.model('Topping', toppingSchema);