const {
  addCourse,
  getInstructorCourse,
  updateCourse,
  deleteCourse,
  displayCourse
} = require("../Controllers/CourseController");

const isInstructor = require("../middlewares/isInstructor");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const router = require("express").Router();

//  Create course
router.post(
  "/",
  authMiddleware,
  isInstructor,
  upload.single("thumbnail"), 
  addCourse
);

//  Get all courses
router.get("/", displayCourse);

// Get instructor courses
router.get(
  "/instructor",
  authMiddleware,
  isInstructor,
  getInstructorCourse
);

// Update course
router.patch(
  "/:id",
  authMiddleware,
  isInstructor,
  upload.single("thumbnail"), 
  updateCourse
);

//Delete course
router.delete(
  "/:id",
  authMiddleware,
  isInstructor,
  deleteCourse
);

module.exports = router;