const mongoose = require('mongoose');

var Order = mongoose.model('Order', {
    fname: { type: Array },
    fdesc: { type: Array },
    cname: { type: String },
    cemail: { type: String },
    cphone: { type: String },
    caddress: { type: String },
    quantity: { type: Array },
    price: { type: Number },
    date: { type: Date }
});

module.exports = { Order };