const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Category } = require('../models/category');


router.get('/', (req, res) => {
    Category.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Categories :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Category.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Category :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var ctgry = new Category({
        category_id: req.body.category_id,
        category_name: req.body.category_name
    });
    ctgry.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Category Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var ctgry = {
        category_id: req.body.category_id,
        category_name: req.body.category_name
    };
    Category.findByIdAndUpdate(req.params.id, { $set: ctgry }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Category Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Category.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Category Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;