import {
  createBrowserRouter as BrowserRouter,
  createRoutesFromElements as RouteElement,
  Route,
} from "react-router-dom";

//Layout imports
import AppLayout from "./outlet";
import TeacherLayout from "./TeacherLayout";
import StudentLayout from "./StudentLayout";

// Auths imports
import LoginForm from "../pages/Auths/LoginForm";
import RegistrationForm from "../pages/Auths/RegistrationForm";

// student views
import StudentDashboard from "../pages/students/Dashboard";
import TimeTable from "../pages/students/TimeTable";
import Exam from "../pages/students/Exam";
import UpdatePassword from "../pages/students/UpdatePassword";
import StudentExam from "../pages/students/StudentExam";

//Teacher views
import TDashboard from "../pages/Teachers/TDashboard";
import StudentList from "../pages/Teachers/StudentList";
import NewAdmission from "../pages/Teachers/NewAdmission";
import TimeTableTeacher from "../pages/Teachers/TimeTable";
import ClassProgress from "../pages/Teachers/ClassProgress";
import ClassMarks from "../pages/Teachers/ClassMarks";
import AllClasses from "../pages/Teachers/AllClasses";
import UploadExercise from "../pages/Teachers/UploadExercise";

//admin
import AdminDashboard from "../pages/Admin/dashoard";


export const router = BrowserRouter(
  RouteElement(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<LoginForm />}></Route>
      <Route path="/signup" element={<RegistrationForm />}></Route>

      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />}></Route>
        <Route path="timetable" element={<TimeTable />}></Route>
        <Route path="exams" element={<Exam />}></Route>
        <Route path="update_pass" element={<UpdatePassword />}></Route>
        {/* <Route path="exam" element={<StudentExam />}></Route> */}
      </Route>
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route path="dashboard" element={<TDashboard />}></Route>
        <Route path="students" element={<StudentList />}></Route>
        <Route path="student-admission" element={<NewAdmission />}></Route>
        <Route path="timetable" element={<TimeTableTeacher />}></Route>
        <Route path="class-progress" element={<ClassProgress />}></Route>
        <Route path="class-mark" element={<ClassMarks />}></Route>
        <Route path="all-classes" element={<AllClasses />}></Route>
        <Route path="upload-exercise" element={<UploadExercise />}></Route>
      </Route>

      <Route path="/admin">
        <Route path="dashboard" element={<AdminDashboard />}></Route>
      </Route>
    </Route>
  )
);
