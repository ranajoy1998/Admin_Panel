require('./config/config');
require('./models/db');
require('./config/passportConfig');

var categoryController = require('./controllers/categoryController');
var foodController = require('./controllers/foodController');
var ordersController = require('./controllers/ordersController');
var picController=require('./controllers/picController.js');
var publicDir = require('path').join(__dirname,'/uploads');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.use('/categories', categoryController);
app.use('/foods', foodController);
app.use('/orders', ordersController);
app.use('/pics',picController);

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    } else {
        console.log(err);
    }
});


app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
app.use(express.static(publicDir));
//console.log(publicDir);