const express = require('express') 
const cors = require('cors')
const mongoose = require('mongoose')
const productRoutes = require("./product") //importing product.js file (which imports route that we are exporting there)
// above statements are kind of import statements , here we are importing express, cors and mongoose

const app = express() // creating the instance of our application

const port = 5167 // 5167 is the port on which the backend is running 

app.use(cors())
app.use(express.json())  // previously we imported the required middleware , now we are asking it to use or mount it on the app
app.use("/uploads",express.static("uploads")) //to use uploaded images
app.use("/products",productRoutes) //for all the urls declared in product.js this /products will be prefix
// time to connect to DB

mongoose.connect('mongodb://127.0.0.1:27017/grocery_app',{
    useNewUrlParser:true,                     // making sure we are using new url parser instead of using something outdated
    useUnifiedTopology:true,                   // this is to make the connection more stable and safe
})
.then(()=> console.log("Connected to Mongo DB"))
.catch((err)=> console.log("Error connecting to DB: ",err))

//defining user schema

const userSchema = new mongoose.Schema({
    role:Number,
    name:String,
    email: {type: String, required : true},
    phone: String,
    address: String,
    password: String
})

const User = mongoose.model('User', userSchema)

// defining the API endpoint for posting the data to the server from the frontend 

app.post('/register', async(req, res)=>{
    const {role,name,email,phone,address,password} = req.body
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    try{
        const newUser = new User({role,name,email,phone,address,password})
        await newUser.save()
        res.status(201).json({message : "User registered successfully"})
    }
    catch(err){
        res.status(500).json({error:"Registration failed"})
    }
})

// defining the API endpoint for validating the login data from the frontend

app.post('/login',async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({ email }); //if user is the table , we are trying to find if the email present 
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        if (user.password !== password) {    //if user found, we are checking for password match
          return res.status(401).json({ message: 'Invalid password' });
        }
    
        res.status(200).json({ message: 'Login successful', user });
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
});

//starting server

app.listen(port,()=>{
    console.log('Backend is running')
})