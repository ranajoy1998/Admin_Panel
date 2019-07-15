const mongoose = require('mongoose');

var Category = mongoose.model('Category', {
    category_id: { type: String },
    category_name: { type: String }
});

module.exports = { Category };