import { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { authenticateEmailRequest } from "../../api/auths.api";
import toast from "react-hot-toast";
import InputField from "../../components/InputField";
import Swal from "sweetalert2";

const PasswordResetEmailRequest = () => {
  const [email, setEmail] = useState<string>("");
  const route = useNavigate();
  const [loading, setIsLoading] = useState(false);

  const AuthenticateEmail = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    };

    if (!loading) {
      try {
        const response = await authenticateEmailRequest(request);
        const { status, message } = await response.json();

        if (status === "error") {
          setTimeout(() => {
            setIsLoading(false);
            toast.error(message);
            setEmail("")
          }, 2000);
        } else {
          setTimeout(() => {
            setIsLoading(false)
            toast.success("Verification code send. Check your mail");
            Swal.fire('Notification', message, 'info')
            route("/auths/verification-code", {
              state: {
                email: email,
              },
            });
          }, 2000)
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#111] to-[#082520c5] shadow-sm px-4">
      <motion.div
        initial={{ opacity: 0, x: "70%", y: "0%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg select-none"
      >
        <motion.form onSubmit={AuthenticateEmail}>
          <div className="flex justify-start gap-0.5">
            <div className="flex justify-center items-center w-6 h-6 rounded-full text-lg text-white bg-slate-500 animate-pulse">
              1
            </div>
            <h2 className="text-2xl font-light text-gray-900">
              Reset Password Procedure
            </h2>
          </div>

          <div className="pt-6">
            <InputField
              id="email"
              name="email"
              value={email}
              label="Email Address"
              type="email"
              placeholder="Enter your email here.."
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="flex gap-2 justify-center items-center pb-2">
            <motion.button
              type="submit"
              className={`w-full h-[6vh] rounded-lg text-white  ${
                loading ? "bg-purple-600" : "bg-blue-500"
              } mt-4 flex justify-center items-center gap-2 cursor-pointer`}
            >
              <div>
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  "Verify Email"
                )}
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 border-solid border-white rounded-tl-0 border-t-0 ${
                  loading ? "animate-spin block" : "hidden"
                }`}
              ></div>
            </motion.button>
          </div>

          <div className="font-light text-center">
            <small>@2025 &copy; All Rights Reserved</small>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default PasswordResetEmailRequest;
