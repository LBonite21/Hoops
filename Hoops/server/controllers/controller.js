let mongoose = require('mongoose');
let account = require('../model/AccountModel');
const bcrypt = require('bcrypt');

exports.root = (req, res) => {
    res.send("API is running!");
}

// Lists all the users
exports.list = (req, res) => {
    account.find({}, (err, result) => {
        if (err) res.send(err);
        res.json(result);
    });
}

exports.findByUsername = (req, res) => {
    let name = req.body.username;
    account.findOne({ username: name }, (err, account) => {
        if (err) res.json({
            status: false,
            account: ""
        });
        console.log(account.password);
        bcrypt.compare(password, account.password, (err, response) => {
            if (err) console.log(err);

            if (response) {
                res.json({
                    status: true,
                    account: account //set token
                })
            } else {
                res.json({
                    status: false,
                    account: ""
                })
            }
        });
    });
}

exports.handleSignIn = (req, res) => {
    let name = req.body.username;
    let password = req.body.password;

    if (password) {
        account.findOne({ username: name }, (err, account) => {
            if (err) res.json({
                status: false,
                account: {}
            });
            console.log(account.password);
            bcrypt.compare(password, account.password, (err, response) => {
                if (err) console.log(err);
    
                if (response) {
                    res.json({
                        status: true,
                        account: account //set token
                    })
                } else {
                    res.json({
                        status: false,
                        account: {}
                    })
                }
            });
        });
    } else {
        res.json({
            status: false,
            account:{}
        });
    }
}

exports.handleSignUp = (req, res) => {
    const secretKey = "6LdLMj8aAAAAAMgyGmCrT1oKQDZEAc7YhWY68ida";
    // const token = req.body.token;
    // const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

    console.log(req.body);
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({ "responseError": "Please select captcha first" });
    }

    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    request(verificationURL, function (error, response, body) {
        body = JSON.parse(body);
        console.log(body);

        if (body.success !== undefined && !body.success) {
            return res.json({ "responseError": "Failed captcha verification" });
        }
        else {
            let body = req.body;
            console.log(body);
            bcrypt.hash(body.password, 10, (err, response) => {
                if (err) console.log(err);
                let user = new account({
                    email: `${body.email}`,
                    username: `${body.username}`,
                    password: `${response}`
                });
                user.save((err, person) => {
                    if (err) {
                        res.render("signup", {
                            errmsg: "Error"
                        });
                    } else {
                        res.json({ "response": true });
                    }
                    console.log(`${body.username} added`);
                });
            });
        }
    });
}