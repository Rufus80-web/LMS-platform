import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { verificationCodeRequest } from "../../api/auths.api";
import toast from "react-hot-toast";
import InputField from "../../components/InputField";
import ParticleContaner from "../../particles/Particle";

const AuthenticateVerificationcode = () => {
  const [code, setCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const route = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    try {
      if (!state) {
        throw new Error("Email prop is missing. Must be provided");
      }
      setEmail(state.email);
    } catch (error: any) {
      console.error(error);
    }
  }, []);

  const AuthenticateEmail = async (event: FormEvent) => {
    event.preventDefault();

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code, email: email }),
    };

    setIsLoading(true);
    try {
      if (!loading) {
        const response = await verificationCodeRequest(request);
        const { status, message } = await response.json();

        if (status === "error") {
          toast.error(message);
          setIsLoading(false);
        } else {
          toast.success(message);
          route("/auths/reset-password", {
            state: {
              email: email,
            },
          });
        }
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#111] to-[#082520c5] shadow-sm px-4">
      <ParticleContaner />
      <motion.div
        initial={{ opacity: 0, x: "70%", y: "0%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="w-full max-w-md space-y-8 rounded-xl bg-[#11111180] text-white p-8 shadow-lg select-none"
      >
        <motion.form onSubmit={AuthenticateEmail}>
          <div className="flex justify-start gap-0.5">
            <div className="flex justify-center items-center w-6 h-6 rounded-full text-lg text-white bg-slate-500 animate-pulse">
              2
            </div>
            <h2 className="text-2xl font-light">Reset Password Procedure</h2>
          </div>

          <div className="pt-6">
            <InputField
              id="text"
              name="text"
              value={code}
              label="Verification Code"
              type="text"
              style="text-white"
              placeholder="Enter 4-digits code sent.."
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCode(e.target.value)
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
                  <span className="animate-pulse">Verifying...</span>
                ) : (
                  "Continue"
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

export default AuthenticateVerificationcode;
