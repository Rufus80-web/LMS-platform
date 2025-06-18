import {
  createBrowserRouter as BrowserRouter,
  createRoutesFromElements as RouteElement,
  Route,
} from "react-router-dom";

//Layout imports
import AppLayout from "./outlet";
import ThemeLayout from "./ThemeLayout";
import StudentLayout from "./StudentLayout";
// Auths imports
import LoginForm from "../pages/Auths/LoginForm";
import RegistrationForm from "../pages/Auths/RegistrationForm";
import Unauthorized from "../pages/401/Unauthorized";
import ProtectedRoute from "./ProtectRoute";
import PasswordResetEmailRequest from "../pages/Auths/PasswordResetEmailRequest";
import HandlePasswordReset from "../pages/Auths/HandlePasswordReset";
import AuthenticateVerificationcode from "../pages/Auths/AuthenticateVerificationcode";
// student views
import StudentDashboard from "../pages/students/Dashboard";
import TimeTable from "../pages/students/ExamSubmission";
import Exam from "../pages/students/Exam";
import UpdatePassword from "../pages/students/UpdatePassword";
import ExercisePage from "../pages/students/ExercisePage";
import SubmissionDetail from "../pages/students/SubmissionDetails"


//Teacher views
import TDashboard from "../pages/Teachers/TDashboard";
import StudentList from "../pages/Teachers/StudentList";
import NewAdmission from "../pages/Teachers/NewAdmission";
import TimeTableTeacher from "../pages/Teachers/Announcement";
import ClassProgress from "../pages/Teachers/ClassProgress";
import ClassMarks from "../pages/Teachers/ClassMarks";
import AllClasses from "../pages/Teachers/AllClasses";
import UploadExercise from "../pages/Teachers/UploadExercise";
import EventManagement from "../pages/Teachers/EventManagement";
import DisplayEvent from "../pages/Teachers/DisplayEvent";
import EditEvent from "../pages/Teachers/EditEvent";
import DisplayStudentPage from "../pages/Teachers/DisplayStudent";
import TeacherUpdateStudent from "../pages/Teachers/TeacherUpdateStudent";
import TeacherProfilePage from "../pages/Teachers/TeacherProfile";
import ManageExamPage from "../pages/Teachers/ManageExamPage";

//admin
import AdminDashboard from "../pages/Admin/dashoard";
import Teachers from "../pages/Admin/components/Teachers";
import CreateTeacher from "../pages/Admin/CreateTeacher";
import Students from "../pages/Admin/components/Students";
import CreateStudent from "../pages/Admin/CreateStudent";
import Courses from "../pages/Admin/components/Courses";
import CreateCourse from "../pages/Admin/CreateCourse";
import DisplayTeacherInfo from "../pages/Admin/DisplayTeacherInfo";
import DisplayStudentInfo from "../pages/Admin/DisplayStudentInfo";
import DisplayCourseInfo from "../pages/Admin/DisplayCourseInfo";
import Announcement from "../pages/Admin/components/Announcement";
import DisplayAnnouncementInfo from "../pages/Admin/DisplayAnnouncement";
import CreateAnnouncement from "../pages/Admin/CreateAnnouncement";
import AdminProfile from "../pages/Admin/AdminProfile";
import Logs from "../pages/Admin/Logs";
import Users from "../pages/Admin/components/Users";
import Roles from "../pages/Admin/Roles";
import EditTeacherInfo from "../pages/Admin/EditTeacherInfo";
import EditStudentInfo from "../pages/Admin/EditStudentInfo";
import EditCourseInfo from "../pages/Admin/EditCourseInfo";
import EditAnnouncement from "../pages/Admin/EditAnnouncement";
import UserRoleList from "../pages/Admin/UserRoleList";
import EditUserRole from "../pages/Admin/EditUserRole";

export const router = BrowserRouter(
  RouteElement(
    <Route path="/" element={<AppLayout />}>
      <Route path="/unauthorized" element={<Unauthorized />}></Route>
      <Route index element={<LoginForm />}></Route>
      <Route path="/auths">
        <Route path="login" element={<LoginForm />}></Route>
        <Route path="signup" element={<RegistrationForm />}></Route>
        <Route
          path="verify-email"
          element={<PasswordResetEmailRequest />}
        ></Route>
        <Route path="reset-password" element={<HandlePasswordReset />}></Route>
        <Route
          path="verification-code"
          element={<AuthenticateVerificationcode />}
        ></Route>
      </Route>
      {/***************************************************************** STUDENT ROUTES********************************************************** */}
      <Route
        path="/student"
        element={
          // Securing students routes (client-side)
          <ProtectedRoute allowedRoles={["Student", "Administrator"]}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />}></Route>
        <Route path="timetable" element={<TimeTable />}></Route>
        <Route path="exams" element={<Exam />}></Route>
        <Route path="update_pass" element={<UpdatePassword />}></Route>
        {/* <Route path="writing-exam" element={<StudentExamPage />}></Route> */}
        <Route path="attend-exam" element={<ExercisePage />}></Route>
        <Route path="exam/details/:examId" element={<SubmissionDetail />}></Route>
      </Route>
      {/***************************************************************** TEACHERS ROUTES********************************************************** */}
      <Route
        path="/teacher"
        element={
          // Securing teachers routes (client-side)
          <ProtectedRoute allowedRoles={["Teacher", "Administrator"]}>
            {/* Creating a layout for the application theme mode  */}
            <ThemeLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<TDashboard />}></Route>
        <Route path="students" element={<StudentList />}></Route>
        <Route path="student-admission" element={<NewAdmission />}></Route>
        <Route path="timetable" element={<TimeTableTeacher />}></Route>
        <Route path="class-progress" element={<ClassProgress />}></Route>
        <Route path="class-mark" element={<ClassMarks />}></Route>
        <Route path="all-classes" element={<AllClasses />}></Route>
        <Route path="upload-exercise" element={<UploadExercise />}></Route>
        <Route path="manage-exams" element={<ManageExamPage />}></Route>
        <Route path="event-management" element={<EventManagement />}></Route>
        <Route path="get-event/:eventID" element={<DisplayEvent />}></Route>
        <Route path="edit-event/:eventID" element={<EditEvent />}></Route>
        <Route
          path="display-student/:studID"
          element={<DisplayStudentPage />}
        ></Route>
        <Route
          path="edit-student/:studID"
          element={<TeacherUpdateStudent />}
        ></Route>
        <Route path="profile/info" element={<TeacherProfilePage />}></Route>
      </Route>
      {/***************************************************************** ADMIN ROUTES********************************************************** */}
      <Route
        path="/admin"
        element={
          // Securing admin routes (client-side)
          <ProtectedRoute allowedRoles={["Administrator"]}>
            {/* Creating a layout for the application theme mode  */}
            <ThemeLayout />
          </ProtectedRoute>
        }
      >
        {/* Admin */}
        <Route path="dashboard" element={<AdminDashboard />}></Route>
        <Route path="manage.teachers" element={<Teachers />}></Route>
        <Route path="manage.students" element={<Students />}></Route>
        <Route path="manage-courses" element={<Courses />}></Route>
        <Route path="announcement" element={<Announcement />}></Route>
        <Route path="create-teacher" element={<CreateTeacher />}></Route>
        <Route path="create-student" element={<CreateStudent />}></Route>
        <Route
          path="create-announcement"
          element={<CreateAnnouncement />}
        ></Route>
        <Route path="create-course" element={<CreateCourse />}></Route>
        <Route
          path="info-teacher/:userID"
          element={<DisplayTeacherInfo />}
        ></Route>
        <Route
          path="info-student/:sid"
          element={<DisplayStudentInfo />}
        ></Route>
        <Route
          path="info-course/:courseId"
          element={<DisplayCourseInfo />}
        ></Route>
        <Route
          path="info-announcement/:announId"
          element={<DisplayAnnouncementInfo />}
        ></Route>
        <Route path="profile" element={<AdminProfile />}></Route>
        <Route path="log-info" element={<Logs />}></Route>
        <Route path="users.account" element={<Users />}></Route>
        <Route path="users.role" element={<Roles />}></Route>
        <Route path="edit">
          <Route path="teacher/:id" element={<EditTeacherInfo />}></Route>
          <Route path="student/:sid" element={<EditStudentInfo />}></Route>
          <Route path="course/:courseId" element={<EditCourseInfo />}></Route>
          <Route
            path="announcement/:announId"
            element={<EditAnnouncement />}
          ></Route>
        </Route>
        <Route path="users.roles/list/:id" element={<UserRoleList />}></Route>
        <Route path="users-role/edit/:id" element={<EditUserRole />}></Route>
      </Route>
    </Route>
  )
);
