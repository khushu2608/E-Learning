import { useState } from "react";
import{useNavigate} from "react-router-dom";
function Signup() {
    const navigate = useNavigate();
    const[formData, setFormData]=useState({
        name:"",
        email:"",
        password:"",
        role:""
    })
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
          const response = await fetch("http://localhost:8080/api/auth/signup",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
          }
          );
          const data = await response.json();
          if(response.ok){
            alert("Sign-Up Successfull");
            navigate("/login")
          }
          else{
            alert(data.message);
          }
        }
        catch(error){
          console.log(error);
          
        }

    };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-3 p-4 border rounded"
        />
        <div className="flex gap-4 mb-4">
  
        <button
          type="button"
          onClick={() => setFormData({ ...formData, role: "student" })}
          className={`flex-1 p-2 border rounded 
            ${formData.role === "student" ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          Student
        </button>

        <button
          type="button"
          onClick={() => setFormData({ ...formData, role: "instructor" })}
          className={`flex-1 p-2 border rounded 
            ${formData.role === "instructor" ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          Instructor
        </button>

      </div>

        <button 
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;