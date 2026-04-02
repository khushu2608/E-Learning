import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./Components/ProtectedRoutes"
import StudentPage from "./pages/StudentPage";
import InstructorPage from "./pages/InstructorPage";
function App() {
  return (
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
    </Routes>
    <ToastContainer />
    
  </BrowserRouter>
  
  )
}

export default App;