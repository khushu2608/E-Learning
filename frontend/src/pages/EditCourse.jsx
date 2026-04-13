import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';

function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {token} = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0,
        thumbnail: null
    })
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/course/${id}`,{
                method:"GET",
                headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
                });
                const data = await res.json();
                const course = data.course;
                if (course) {
                    setFormData({
                        title: course.title,
                        description: course.description,
                        price: course.price,
                        thumbnail: course.thumbnail
                    });
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchCourse();
    }, [id]);
    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("title", formData.title);
        form.append("description", formData.description);
        form.append("price", formData.price);
        form.append("thumbnail", formData.thumbnail);

        const res = await fetch(`http://localhost:8080/api/course/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: form
        });

        const data = await res.json();

        if (data.success) {
            navigate("/instructor")
            handleSuccess("Course Updated Successfully ✅");
        }
        else{
            handleError(data.message);
        }
    };
    const handleChange = (e)=>{
        const { name,value,files} = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value

        })
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Update Course
                </h2>

                <form className="space-y-4" onSubmit={handleUpdate}>

                    {/* Title */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Course Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter course title"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Enter course description"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ></textarea>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Upload Thumbnail
                        </label>
                        <input
                            type="file"
                            name="thumbnail"
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Update Course
                    </button>

                </form>
            </div>
        </div>
    );
}

export default EditCourse