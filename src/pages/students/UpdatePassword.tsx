import { ChangeEvent, FC, useState, JSX, FormEvent } from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import { useTheme } from "../../context/ThemeContext";

const UpdatePassword: FC = (): JSX.Element => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const handlePasswordUpdate = (e: FormEvent): void => {
    e.preventDefault();
  };

  const { themeMode } = useTheme()
  
  return (
    <div className={`w-screen min-h-screen ${themeMode === 'light' ? 'bg-[#f6f6f9]' : 'bg-sidebar-dark'}`}>
      {/* sidebar section  */}
      <Sidebar />

      {/* Deside the sidebar  */}
      <div className="w-[82vw] min-h-screen absolute right-0 flex flex-col">
        {/* Navbar section  */}
        <Navbar />

        {/* Password Update form  */}
        <div className="absolute bottom-0 w-[82vw] h-full flex  justify-center items-start gap-3 pt-20 pl-2">
          <div className={`w-full max-w-md space-y-8 rounded-xl p-8 shadow-2xl shadow-gray-400 hover:shadow-none ${themeMode === 'dark' && 'bg-amber-50'}`}>
            <div className="flex flex-col gap-0">
              <h2 className="text-left text-2xl font-bold text-[#00000070]">
                Create new password
              </h2>
              <span className="text-[12px] space-y-0 text-[#383737ad]">
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
                  <button type="button" className="btn-cancel-update-pass">
                    Cancel
                  </button>
                </div>

                {/* signup or password page  */}
                <div className="text-sm pt-5">
                  <Link
                    to={{ pathname: "" }}
                    className="font-medium text-[#999595b4] text-[10px]"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
