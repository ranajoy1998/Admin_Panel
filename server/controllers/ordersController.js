const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Order } = require('../models/orders');


router.get('/', (req, res) => {
    Order.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Orders :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Order.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Order :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var ord = new Order({
        fname: req.body.fname,
        fdesc: req.body.fdesc,
        cname: req.body.cname,
        cemail: req.body.cemail,
        cphone: req.body.cphone,
        caddress: req.body.caddress,
        quantity: req.body.quantity,
        price: req.body.price,
        date: req.body.date
    });
    ord.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Order Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var ord = {
        fname: req.body.fname,
        fdesc: req.body.fdesc,
        cname: req.body.cname,
        cemail: req.body.cemail,
        cphone: req.body.cphone,
        caddress: req.body.caddress,
        quantity: req.body.quantity,
        price: req.body.price,
        date: req.body.date
    };
    Order.findByIdAndUpdate(req.params.id, { $set: ord }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Order Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Order.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Order Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;