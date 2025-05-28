import {} from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Roles } from "../../static/types";

const Unauthorized = () => {
  const authUserData = localStorage.getItem("user-data");

  const user = authUserData && JSON.parse(authUserData);

  if(!user){
    throw new Error('User object is null')
  }

  const goTo = () => {
    if (user['user']["roles"] === Roles["STUDENT"]) {
      return "/student/dashboard";
    }
    if (user['user']["roles"] === Roles["TEACHER"]) {
      return "/teacher/dashboard";
    }
  };

  return (
    <div className="min-w-screen h-screen bg-dark-bg text-slate-50">
      <div className="flex flex-col justify-center items-center gap-4 pt-[12em]">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl">UnAuthorized</h1>
          <h2 className="text-3xl pt-0.5">401</h2>
        </div>
        <div className="text-xl flex flex-col justify-center items-center">
          <p>You're not authorized to access this Page</p>
          <p className="mt-2">
            Go back to your{" "}
            <Link to={{ pathname: goTo() }}>
              <Button variant="contained">Dashboard</Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
