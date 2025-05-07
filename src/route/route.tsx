import {
  createBrowserRouter as BrowserRouter,
  createRoutesFromElements as RouteElement,
  Route,
} from "react-router-dom";
import AppLayout from "./outlet";
// Auths imports
import LoginForm from "../pages/Auths/LoginForm";
import RegistrationForm from "../pages/Auths/RegistrationForm";
// student views
import StudentDashboard from "../pages/students/Dashboard";
import TimeTable from "../pages/students/TimeTable";
import Exam from "../pages/students/Exam";
import UpdatePassword from "../pages/students/UpdatePassword";

//Teacher views
import TDashboard from "../pages/Teachers/TDashboard";

export const router = BrowserRouter(
  RouteElement(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<LoginForm />}></Route>
      <Route path="/signup" element={<RegistrationForm />}></Route>

      <Route path="/student">
        <Route path="dashboard" element={<StudentDashboard />}></Route>
        <Route path="timetable" element={<TimeTable />}></Route>
        <Route path="exams" element={<Exam />}></Route>
        <Route path="update_pass" element={<UpdatePassword />}></Route>
      </Route>
      <Route path="/teacher">
        <Route path="dashboard" element={<TDashboard />}></Route>
      </Route>
    </Route>
  )
);
