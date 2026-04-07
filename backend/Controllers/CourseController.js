const CourseModel = require("../models/Course");
const fs = require("fs");
//Add Course
const addCourse = async (req,res)=>{
    try{
        const {title,description,price} = req.body;

        if(!title || !description){
            return res.status(400).json({
                message:"Title and Description are required"
            })
        }
        const thumbnail = req.file ? req.file.path : "";
        const course = await CourseModel.create({
            title,
            description,
            price,
            thumbnail,
            instructor:req.user.id
        })
        
        res.status(201)
            .json({
                message:"Course Added Successfully!",
                course,
                role:req.user.role
            })
    }
    catch(error){
        res.status(500)
            .json({
                error:error.message
            })
    }

}
//DisplayCourse
const displayCourse = async (req, res) => {
  try {
    const courses = await CourseModel.find()
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });

    if (courses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No courses available",
        courses: []
      });
    }

    res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
//Delete Course
const deleteCourse = async(req,res)=>{
    try{
    const {id} = req.params;
    const course = await CourseModel.findById(`${id}`);
    if(!course){
      return res.status(404).json({
        success:false,
        message:"Course Not Available!"
      })
    }
       if (course.thumbnail) {
            fs.unlink(course.thumbnail, (err) => {
                if (err) {
                    console.log("File delete error:", err);
                } else {
                    console.log("File deleted successfully");
                }
            });
        }
    if(course.instructor.toString() !== req.user.id){
      return res.status(403).json({
        success:false,
        message:"You are not allowed to delete the course!"
      })
    }
      await CourseModel.findByIdAndDelete(`${id}`);
    res.status(200).json({
        success:true,
        message:"Course Deleted Successfully",
    })
    }
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
//Update Course
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await CourseModel.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not Available!"
      });
    }

    // Ownership check
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit the course!"
      });
    }

    const { title, price, description } = req.body;

    // If new file uploaded → delete old file
    if (req.file && course.thumbnail) {
      fs.unlink(course.thumbnail, (err) => {
        if (err) {
          console.log("File delete error:", err);
        } else {
          console.log("Old file deleted successfully");
        }
      });

      course.thumbnail = req.file.path;
    }

    // Update fields
    if (title !== undefined) course.title = title;
    if (price !== undefined) course.price = price;
    if (description !== undefined) course.description = description;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
const getInstructorCourse = async (req, res) => {
  try {
    const courses = await CourseModel.find({
      instructor: req.user.id
    }).sort({ createdAt: -1 });

    if (courses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No courses available",
        courses: []
      });
    }

    res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
module.exports = {addCourse,getInstructorCourse,updateCourse,deleteCourse,displayCourse}