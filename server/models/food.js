const mongoose = require('mongoose');

var Food = mongoose.model('Food', {
    fname: { type: String },
    fprice: { type: Number },
    category_id: { type: String },
    fdesc: { type: String },
    fpic: { type: String }
});

module.exports = { Food };