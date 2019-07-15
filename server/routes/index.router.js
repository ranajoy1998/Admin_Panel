const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ctrlUser = require('../controllers/aduser.controller');
const usr = require('../controllers/user.controller');
var ObjectId = require('mongoose').Types.ObjectId;
const User = mongoose.model('User');

const jwtHelper = require('../config/jwtHelper');
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post('/registeruser', usr.registeruser);
router.post('/authenticateuser', usr.authenticateuser);
router.get('/usrProfile',jwtHelper.verifyJwtToken, usr.usrProfile);

router.get('/users/', (req, res) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/users/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No User with given id : ${req.params.id}`);

    User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;