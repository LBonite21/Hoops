const express = require('express');
const app = express();
let port = 3002;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const { networkInterfaces } = require('os');
const cors = require('cors');

// const nets = networkInterfaces();
// const results = Object.create(null); // Or just '{}', an empty object


require('./model/AccountModel');
const Account = mongoose.model("account");

let password = "qgqYI52yqFJvnIXt";
let dbName = "HoopsCapstone";
const mongoUri = `mongodb+srv://lemon:${password}@hoops.8snys.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("Connected to Mongo")
});

mongoose.connection.on("error", (err) => {
    console.log(`Error: ${err}`)
});

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const routes = require('./routes');
routes(app);

app.listen(port, () => {
    // for (const name of Object.keys(nets)) {
    //     for (const net of nets[name]) {
    //         // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    //         if (net.family === 'IPv4' && !net.internal) {
    //             if (!results[name]) {
    //                 results[name] = [];
    //             }
    //             results[name].push(net.address);
    //         }
    //     }
    // }
    
    // console.log(results);
    console.log(`Server is running on ${port}`);
});