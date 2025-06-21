import React, { useState } from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [state, setState] = useState(0);
  const [role, setRole] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate()
  //method that is responsible for sending new user data to backend
  const handleSubmit = async (e)=>{
    e.preventDefault()
    
  try {
    const res = await fetch("http://localhost:5167/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  
        role,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password, }),
    });

    const data = await res.json();
    console.log("Server response:", data);

    if (res.ok) {
      alert("Registered successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
      });
      setRole(0);
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error("Error submitting form:", err);
    alert("Something went wrong");
  }
  }

  const handleLogin = async(e)=>{
    e.preventDefault()
    try{
      const res = await fetch("http://localhost:5167/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  
          email: loginData.email,
          password: loginData.password }),
      });
      const data = await res.json()
      console.log("Server response ",data)
      if(res.ok){
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successfull")
        navigate('/account')
        window.location.reload();
      }
      else{
        alert(data.message)
      }
    } catch(err){
      console.error("Error submitting login Data", err)
      alert("Something went wrong")
    }
    
  }
  return (
    <div className="auth-wrapper">
      <div className="auth-panel">
        {!state ? (
          <div>
            <h2>Login form</h2>
            <form onSubmit ={handleLogin}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email id"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData,email: e.target.value })}
              />
              <br />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <br />
              <button type = "submit">Submit</button>
            </form>
            <p>
              Didn't have an account?{" "}
              <span
                onClick={() => setState(1)}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        ) : (
          <div>
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
              <label>Register as</label>
              <select
                value={role}
                onChange={(e) => setRole(Number(e.target.value))}>
                <option value="0">User</option>
                <option value="1">Vendor</option>
              </select>
              <label> Name</label>
              <input
                type="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({...formData,  name :e.target.value })}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email id"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {!role ? (
                <>
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) =>setFormData({ ...formData, address: e.target.value })}
                  />
                </>
              ) : (
                <>
                  <label>Store Address</label>
                  <input
                    type="text"
                    placeholder="Enter your store address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </>
              )}
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button type = "submit">Submit</button>
            </form>
            <p>
              Already have an account?
              <span
                onClick={() => setState(0)}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {" "}
                Sign In
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;
