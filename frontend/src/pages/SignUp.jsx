import { useState } from "react";

function Signup() {
    const[formData, setFormData]=useState({
        name:"",
        email:"",
        password:"",
    })
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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

        <button 
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;