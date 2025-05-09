type ProfileProp = {
  profile: string;
};

const TeacherProfile = ({ profile }: ProfileProp) => {
  return (
    <div className="w-full h-max flex flex-col justify-center items-center gap-2 mt-0 pt-4 pb-4">
      <div className="w-25 h-25 rounded-full">
        <img
          className="w-full h-full rounded-full"
          src={profile}
          alt="teacher"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Rufus</h1>
        <span className="text-teal-300">Teacher</span>
      </div>
    </div>
  );
};

export default TeacherProfile;
