import {
  createBrowserRouter as BrowserRouter,
  createRoutesFromElements as RouteElement,
  Route,
} from "react-router-dom";
import AppLayout from "./outlet";
import LoginForm from "../pages/Auths/LoginForm";
import RegistrationForm from "../pages/Auths/RegistrationForm";
import StudentDashboard from "../pages/students/Dashboard";

export const router = BrowserRouter(
  RouteElement(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<LoginForm />}></Route>
      <Route path="/signup" element={<RegistrationForm />}></Route>

      <Route path="/student">
        <Route path="dashboard" element={<StudentDashboard />}></Route>
      </Route>
    </Route>
  )
);
