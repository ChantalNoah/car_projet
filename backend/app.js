

const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config({path: './config/.env'});
const cors = require("cors");


//routes declaration
const userRouter = require("./routes/user.route");
const statutRouter = require("./routes/statut.route");
const reservationRouter = require("./routes/reservation.route");
const markRouter = require("./routes/mark.route");
const historyRouter = require("./routes/history.route");

const carmodelRouter = require("./routes/carmodel.route");
const carRouter = require("./routes/car.route");
//const imguploadRouter = require("./routes/imgupload.route");
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//console.log('ici');
app.use(cors());
const PORT = process.env.PORT || 3300;
app.use('/api/user', userRouter);
app.use('/api/reservation', reservationRouter);
app.use('/api/statut', statutRouter);
app.use('/api/mark', markRouter);
app.use('/api/history', historyRouter);
app.use('/api/carmodel', carmodelRouter);
app.use('/api/car', carRouter);
//app.use('/api/img', imguploadRouter);
app.use('/image', express.static('images'));

var server = app.listen(PORT,function() {
    console.log(`Server is live at localhost:${PORT}`);
});

