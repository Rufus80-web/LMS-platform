import { FC } from "react";

const StudentInfo: FC = () => {
  const authUserData = localStorage.getItem("user-data");

  const user = authUserData && JSON.parse(authUserData)['user'];

  if(!user){
    throw new Error('User object is null')
  }
//   const { user } = authUserData && JSON.parse(authUserData)
  return (
    <div className="pl-10 pt-3 flex flex-col gap-2">
      <div>
        <h4 className="font-semibold text-[12px]">Course</h4>
        <p className="text-sm">Data science</p>
      </div>
      <div>
        <h4 className="font-semibold text-[12px]">Name</h4>
        <p className="text-sm">
          {user.firstname} {user.lastname}
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-[12px]">DOB</h4>
        <p className="text-sm">12-05-2005</p>
      </div>
      <div>
        <h4 className="font-semibold text-[12px]">Email</h4>
        <p className="text-sm">{user.email}</p>
      </div>
      <div>
        <h4 className="font-semibold text-[12px]">Address</h4>
        <p className="text-sm">{user.address}</p>
      </div>
      <div>
        <h4 className="font-semibold text-[12px]">Tel</h4>
        <p className="text-sm">{user.contact}</p>
      </div>
    </div> 
  );
};

export default StudentInfo;
