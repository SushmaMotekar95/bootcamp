var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    var name= req.body.name
    var email=req.body.email
    var Number=req.body.Number

    var data={
        "name":name,
        "email":email,
        "Number":Number,
      
    }
    db.collection('users_register').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Register Record Inserted Succesfully")
    })
    //return res.redirect('signup_successful.html')

    return res.redirect(`/signup_successful.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&Number=${encodeURIComponent(Number)}`);
})

app.post("/payment_success",(req,res) => {
    var name= req.body.name
    var email=req.body.email
    var Number=req.body.Number
    var paymentId = req.body.paymentId

    var data={
        "name":name,
        "email":email,
        "Number":Number,
        "paymentId": paymentId
    }
    db.collection('user_payment').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("payment Record Inserted Succesfully")
    })
    //return res.redirect('signup_successful.html')

    return res.redirect(`/showdata.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&Number=${encodeURIComponent(Number)}&paymentId=${encodeURIComponent(paymentId)}`);

})


app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000") 

/*const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/Database');
const db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// Define Mongoose schema for registered users
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    Number: String
});

// Define Mongoose model for registered users
const User = mongoose.model('User', userSchema);

// Define Mongoose schema for successful payments
const paymentSchema = new mongoose.Schema({
    name: String,
    email: String,
    Number: String,
    paymentId: String // Add field for payment ID from Razorpay
});

// Define Mongoose model for successful payments
const Payment = mongoose.model('Payment', paymentSchema);

// Route to handle enrollment form submission
app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var Number = req.body.Number;

    var user = new User({
        name: name,
        email: email,
        Number: Number
    });

    user.save()
        .then(result => {
            console.log("User data saved successfully:", result);
            // Redirect to signup successful page
            return res.redirect(`/signup_successful.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&Number=${encodeURIComponent(Number)}`);
        })
        .catch(err => {
            console.error("Error saving user data:", err);
            return res.status(500).send("Error saving user data");
        });
});

// Route to handle successful payment
app.post("/payment_success", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var Number = req.body.Number;
    var paymentId = req.body.paymentId; // Get payment ID from Razorpay

    var payment = new Payment({
        name: name,
        email: email,
        Number: Number,
        paymentId: paymentId
    });

    payment.save()
        .then(result => {
            console.log("Payment data saved successfully:", result);
            return res.redirect(`/signup_successful.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&Number=${encodeURIComponent(Number)}&Payment_Id=${encodeURIComponent(paymentId)}`);
            // return res.status(200).send("Payment successful!");
        })
        .catch(err => {
            console.error("Error saving payment data:", err);
            return res.status(500).send("Error saving payment data");
        });
});

// Serve the index.html page
app.get("/", (req, res) => {
    res.set({
        "Allow-acces-Allow-Origin": '*' 
    });
    return res.redirect('index.html');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});*/
