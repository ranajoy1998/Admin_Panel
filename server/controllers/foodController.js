const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Food } = require('../models/food');


router.get('/', (req, res) => {
    Food.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Foods :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Food.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Food :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var fd = new Food({
        fname: req.body.fname,
        fprice: req.body.fprice,
        category_id: req.body.category_id,
        fdesc: req.body.fdesc,
        fpic: req.body.fpic
    });
    fd.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Food Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var fd = {
        fname: req.body.fname,
        fprice: req.body.fprice,
        category_id: req.body.category_id,
        fdesc: req.body.fdesc,
        fpic: req.body.fpic
    };
    Food.findByIdAndUpdate(req.params.id, { $set: fd }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Food Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Food.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Food Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;