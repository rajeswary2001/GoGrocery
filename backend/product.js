const express = require("express")
const router = express.Router()   //mini application server , our case giving api end point for adding products 
const multer = require("multer")
const path = require("path")
const mongoose = require("mongoose")
const fs =require("fs")
//create a uploads folder to store the uploaded images
const uploadDir = "uploads"
if(!fs.existsSync(uploadDir)){ //checking if exists or not 
    fs.mkdirSync(uploadDir)
}
//configuring multer for file storage
const storage = multer.diskStorage({
    destination: (req,file,cb)=> cb(null,uploadDir),
    filename: (req,file,cb)=> cb(null,Date.now()+path.extname(file.originalname)),
});

const upload = multer({storage})

const productSchema = new mongoose.Schema({
    vendorEmail: {type: String, required : true},
    name:{type: String, required: true},
    costPerLb:{type:Number, required : true},
    image: {type:String, required: true},
})

const Product = mongoose.model("Product", productSchema)

router.post("/addproduct", upload.single("image"), async (req, res) => {
    try {
      const {vendorEmail, name, costPerLb } = req.body;
      const image = req.file?.filename; // uploaded image filename
  
      const newProduct = new Product({ vendorEmail, name, costPerLb, image });
      await newProduct.save();
  
      res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
      console.error("Error adding product:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

module.exports = router;

