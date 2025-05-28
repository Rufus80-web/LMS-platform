import { ChangeEvent, FC, useState, JSX, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import CheckBox from "../../components/CheckBox";
import { toast } from "react-hot-toast";
import { loginRequest } from "../../api/auths.api";
import { Credentials } from "../../static/Interface";
import { Roles } from "../../static/types";
import { parseJWT } from "../../services/decode-token";
import { motion, AnimatePresence } from "framer-motion";

const LoginForm: FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("error");

  const route = useNavigate();

  // Stops the loader when called
  const setSuccess = (msg: string, url: string) => {
    setTimeout(() => {
      setIsLoading(false);
      toast.success(msg);
      setMessage(msg);
      setTimeout(() => route(`${url}/dashboard`), 2000);
    }, 2000);
  };

  // Display Error messages
  const setError = (msg: string) => {
    setTimeout(() => {
      setIsLoading(false);
      toast.error(msg);
      setMessage(msg);
    }, 2000);
  };

  // Handles login attempts
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const payload: Credentials = {
      email: email,
      password: password,
    };
    const configs = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    setIsLoading(true);
    setMessage("");

    try {
      const response = await loginRequest(configs);
      // Extract server-response
      const { userObj, status, message, accessToken, refreshToken } =
        await response.json();

      // Handle error response
      if (status === "error") {
        setError(message);
      } else {
        // Extract user-role from user object
        const userRole = userObj["roles"];
        setStatus(status);
        // Send the token to authsRedux Slice
        // dispatch(setToken(accessToken));
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem(
          "user-data",
          JSON.stringify(parseJWT(accessToken))
        );

        // Navigate user to thier respective dashboard
        if (userRole === Roles["STUDENT"]) {
          return setSuccess(message, "/student");
        } else if (userRole === Roles["TEACHER"]) {
          return setSuccess(message, "/teacher");
        } else if (userRole === Roles["ADMIN"]) {
          return setSuccess(message, "/admin");
        } else {
          throw new Error("Unknowned User Role");
        }
      }
    } catch (error: any) {
      console.error(error.message);
      throw new Error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-bg px-4">
      {/* Loader  */}
      {isLoading && (
        <div className="absolute flex">
          {/* <div
            className={`w-10 h-10 rounded-full border-4 border-solid rounded-tl-none border-yellow-600 ${
              isLoading && "rotate-full"
            }`}
          ></div> */}
          <div
            className={`w-10 h-10 rounded-full border-4 border-b-0 border-solid border-green-600 ${
              isLoading && "rotate-back-full"
            }`}
          ></div>
        </div>
      )}

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: "-60%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg"
        >
          <div>
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Sign In
            </h2>

            <form onSubmit={handleLogin} className="mt-6 space-y-6">
              <div className="space-y-4">
                {/* email field  */}
                <InputField
                  id="email"
                  name="email"
                  value={email}
                  label="Email"
                  type="email"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
                {/* password filed  */}
                <InputField
                  id="password"
                  name="password"
                  value={password}
                  label="Password"
                  type="password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckBox id="remember-me" name="remember-me" />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                {/* signup or password page  */}
                <div className="text-sm">
                  <Link
                    to={{ pathname: "/auths/verify-email" }}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <p className="text-center">
                No account?{" "}
                <a
                  className="decoration-none text-indigo-500 hover:ring-amber-700 hover:text-orange-400 text-sm"
                  href="/signUp"
                >
                  Sign Up
                </a>
              </p>

              {/* Return message based on status */}
              {/* <div
                className={`${
                  status === "error" ? "text-red-600" : "text-green-600"
                } flex justify-center items-center text-md animate-pulse`}
              >
                {message}
              </div> */}

              {/* submit button  */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:cursor-pointer"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginForm;
