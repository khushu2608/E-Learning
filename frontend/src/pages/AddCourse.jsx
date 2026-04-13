import React, { useState } from 'react'
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';

function AddCourse() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "0",
        thumbnail: null
    })
    const handleChange = (e) => {
        const {name,value,files} = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title",formData.title);
        data.append("description",formData.description);
        data.append("price",formData.price);
        data.append("thumbnail",formData.thumbnail);
        try {
            const response = await fetch("http://localhost:8080/api/course/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data
            });
            const resData = await response.json();

            if (response.ok) {
                navigate("/instructor");
                handleSuccess("Course Created Successfull");
            }
            else {
                handleError(resData.message);
            }
        }
        catch (error) {
            handleError(error.message);

        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

            <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-6">

                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Add New Course
                </h2>

                <form className="space-y-4"
                onSubmit={handleSubmit}>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Course Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter course title"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            rows="4"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter course description"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price (₹)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Thumbnail Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thumbnail
                        </label>
                        <input
                            type="file"
                            name="thumbnail"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Add Course
                    </button>

                </form>
            </div>

        </div>
    );
}

export default AddCourse