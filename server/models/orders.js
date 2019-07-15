const mongoose = require('mongoose');

var Order = mongoose.model('Order', {
    fname: { type: String },
    fdesc: { type: String },
    cname: { type: String },
    cemail: { type: String },
    cphone: { type: String },
    caddress: { type: String },
    quantity: { type: String },
    price: { type: String },
    date: { type: Date }
});

module.exports = { Order };