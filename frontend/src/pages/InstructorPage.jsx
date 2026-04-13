import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

function InstructorPage() {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  // 🔹 Fetch Courses
  const handleDisplay = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/course/");
      const data = await response.json();
      setCourses(data.courses || data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    handleDisplay();
  }, []);

  // 🔹 Delete Course
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/course/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.ok) {
        setCourses(prev => prev.filter(course => course._id !== id));
        handleSuccess("Deleted Successfully ✅");
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🔥 HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 rounded-2xl shadow-lg mb-6"
      >
        <h1 className="text-3xl font-bold">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-yellow-300 to-pink-400 text-transparent bg-clip-text">
            {name}
          </span> 👋
        </h1>

        <TypeAnimation
          sequence={[
            "Build amazing courses 🚀",
            2000,
            "Teach & inspire students 💡",
            2000,
            "Grow your career 📈",
            2000
          ]}
          speed={50}
          repeat={Infinity}
          className="text-lg mt-2"
        />
      </motion.div>

      {/* 🔹 STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total Courses</p>
          <h2 className="text-2xl font-bold">{courses.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Active Courses</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {courses.length}
          </h2>
        </div>
      </div>

      {/* 🔹 TOP BAR */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">

        <input
          type="text"
          placeholder="🔍 Search courses..."
          className="border px-4 py-2 rounded-lg w-full sm:w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:scale-105 hover:bg-blue-700 transition"
          onClick={() => navigate("/addCourse")}
        >
          ➕ Add Course
        </button>
      </div>

      {/* 🔹 COURSES */}
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076501.png"
            className="w-32 mb-4"
          />
          <p className="text-gray-500 text-lg">No courses yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {courses
            .filter(c =>
              c.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((course) => (

              <motion.div
                key={course._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition"
              >

                {/* Image */}
                <img
                  src={`http://localhost:8080/uploads/${encodeURIComponent(
                    course.thumbnail?.split("\\").pop()
                  )}`}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {course.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {course.description}
                  </p>

                  <p className="text-blue-600 font-bold mt-2">
                    ₹ {course.price}
                  </p>

                  {/* Buttons */}
                  <div className="flex justify-between mt-4">
                    <button
                      className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      onClick={() => navigate(`/editCourse/${course._id}`)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => handleDelete(course._id)}
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      ❌ Delete
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}

        </div>
      )}
    </div>
  );
}

export default InstructorPage;