
var mongoose = require('mongoose');

var baseSchema = new mongoose.Schema({
    id: { type: Number, unique: true},
    name: { type: String, unique: true},
    price: Number
})

module.exports = mongoose.model('Base', toppingSchema);