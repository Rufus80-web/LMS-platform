import { FC } from "react";

import defaultUser from "../../../../assets/images/courses/webdev.jpeg"
import { PROFILE_URL } from "../../../../services/server-urls";

type Instructor = {
  firstname: string;
  lastname: string;
  profile: string;
};

const TeacherOnLeave: FC<Instructor> = ({ firstname, lastname, profile }) => {
  // const {themeMode} = useTheme()
  return (
    <div className="flex gap-4 justify-start items-center font-light text-[#e8e6e6]">
      <div className="w-10 h-10 rounded-full">
        <img
          src={profile ? `${PROFILE_URL}/${profile}` : defaultUser}
          alt="profile.png"
          className="w-full h-full rounded-full"
        />
      </div>
      <div className={`text-[12px]`}>
        <h2>{firstname} {lastname}</h2>
        <p>Full Day</p>
      </div>
    </div>
  );
};

export default TeacherOnLeave;
