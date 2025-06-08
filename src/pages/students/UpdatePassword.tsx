import { ChangeEvent, FC, useState, JSX, FormEvent } from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import { useTheme } from "../../context/ThemeContext";
import { studentPasswordRessesionApi } from "../../api/student.api";
import { getUserObjectId } from "../../Redux/Slices/teacherSlice";
import { toast } from "react-hot-toast";

const UpdatePassword: FC = (): JSX.Element => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handlePasswordUpdate = async (e: FormEvent): Promise<any> => {
    e.preventDefault();

    try {
      const httpRequest = await studentPasswordRessesionApi({
        studId: getUserObjectId(),
        current: currentPassword,
        _newPass: newPassword,
        _newConfirm: confirmNewPassword,
      });

      const { status, message } = httpRequest.data;
      console.log(httpRequest.data)

      if (status === "error") {
        toast.error(message);
        setError(true);
        setMessage(message);
        cancelPasswordUpdate()
      } else {
        toast.success(message, { duration: 4000 });
        setError(false);
        setMessage(message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const cancelPasswordUpdate = () => {
    setNewPassword("");
    setConfirmNewPassword("");
    setConfirmNewPassword("");
  };

  const { themeMode } = useTheme();

  return (
    <div
      className={`w-screen min-h-screen ${
        themeMode === "light" ? "bg-[#f6f6f9]" : "bg-sidebar-dark"
      }`}
    >
      {/* sidebar section  */}
      <Sidebar />

      {/* Deside the sidebar  */}
      <div className="w-[82vw] min-h-screen absolute right-0 flex flex-col">
        {/* Navbar section  */}
        <Navbar />

        {/* Password Update form  */}
        <div className="absolute bottom-0 w-[82vw] h-full flex  justify-center items-start gap-3 pt-20 pl-2 bg-gradient-to-r from-[#111] to-[#082520e8] shadow-sm">
          <div
            className={`w-full max-w-md space-y-8 rounded-xl p-8 shadow-lg shadow-[#ffffff3a] transition-all duration-150`}
          >
            <div className="flex flex-col gap-0">
              <h2 className="text-left text-2xl font-bold text-[#fff]">
                Create new password
              </h2>
              <span className="text-[12px] space-y-0 text-[#ffffff6b]">
                Your new password must be different from previously existing
                passwords.
              </span>
            </div>

            <form onSubmit={handlePasswordUpdate} className={`mt-6 space-y-6`}>
              <div className="space-y-4">
                {/* old password field  */}
                <InputField
                  id="currentPassword"
                  name="currentPassword"
                  value={currentPassword}
                  label="Current Password"
                  type="password"
                  color="text-white"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCurrentPassword(e.target.value)
                  }
                />
                {/* new password filed  */}
                <InputField
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  label="New Password"
                  type="password"
                  color="text-white"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewPassword(e.target.value)
                  }
                />
                {/* Confirm password filed  */}
                <InputField
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  label="Confirm Password"
                  type="password"
                  color="text-white"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setConfirmNewPassword(e.target.value)
                  }
                />
              </div>

              {/* form button  */}
              <div>
                <div className="flex gap-2">
                  <button type="submit" className="btn-save-update-pass">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn-cancel-update-pass"
                    onClick={cancelPasswordUpdate}
                  >
                    Cancel
                  </button>
                </div>

                {/* signup or password page  */}
                <div className="text-sm pt-5">
                  <Link
                    to={{ pathname: "/auths/verify-email" }}
                    className="font-medium text-[dodgerblue] cursor-pointer text-[10px]"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </form>

            <span
              className={`${
                error ? "text-red-500" : "text-green-600"
              } transition-all duration-100 text-lg flex justify-center items-center mt-4`}
            >
              {message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
