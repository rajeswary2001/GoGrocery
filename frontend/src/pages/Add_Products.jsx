import React, {useState} from "react"


function AddProducts(){
    const [formData, setData] = useState({
        name: "",
        costPerLb:0,
        image:null
    })
    

    const handleSubmit = async(e)=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(!user){
            alert("Please login to add products")
            return
        }else if (!user.role){
            alert("You dont have access to add products")
            return
        }
        const form = new FormData();
        form.append("vendorEmail", user.email); //  Backend expects vendorEmail
        form.append("name", formData.name);
        form.append("costPerLb", formData.costPerLb);
        form.append("image", formData.image); //  This goes to req.file
        
    try {
        const res = await fetch("http://localhost:5167/products/addproduct", {
          method: "POST",
          body: form,
          
        });
  
        const data = await res.json();
        if (res.ok) {
          alert("Product added successfully");
          setData({
            name:"", costPerLb:0, image:null
          })
          
        } else {
          alert(data.message || "Product upload failed");
        }
      } catch (err) {
        console.error("Error uploading product:", err);
        alert("Something went wrong");
      }
    }
    
    
    return (
      <div>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input placeholder="Enter the product name" type = "string" onChange={(e)=>setData({...formData,name :e.target.value})} required/>
            <label>Cost per Lb</label>
            <input placeholder="Enter item's cost per lb" type = "number" onChange={(e)=>setData({...formData,costPerLb:e.target.value})} required/>
            <label>Upload item's image</label>
            <input type = "file" accept="image/*" onChange={(e)=>setData({...formData,image:e.target.files[0]})}/>
            <button type = "submit">Add item</button>
        </form>
      </div>
    )
}

export default AddProducts;