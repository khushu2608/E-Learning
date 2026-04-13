import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./Components/ProtectedRoutes"
import StudentPage from "./pages/StudentPage";
import InstructorPage from "./pages/InstructorPage";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<SignUp/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/student" element={
              <ProtectedRoutes allowedRole="student">
                <StudentPage/>
              </ProtectedRoutes>
          }></Route>
          <Route path="/instructor" element={
        <ProtectedRoutes allowedRole="instructor">
          <InstructorPage/>
        </ProtectedRoutes>
      }></Route>
        <Route path="/addCourse" element={<AddCourse/>}></Route>
        <Route path="/editCourse/:id" element={<EditCourse/>}></Route>
    </Routes>
    <ToastContainer />
    
  </BrowserRouter>
  </div>
  )
}

export default App;