import { ChangeEvent, FC, useState, JSX, FormEvent } from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import CheckBox from "../../components/CheckBox";
import Swal from "sweetalert2";

const LoginForm: FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: FormEvent): void => {
    e.preventDefault()

    if(!email || !password) {
        Swal.fire('Oops!!', 'Invalid email or password', 'error')
    } else {
        Swal.fire('Nice', 'Login Successfully', 'success')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
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
                to={{ pathname: "" }}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <p className="text-center">No account? <a className="decoration-none text-indigo-500 hover:ring-amber-700 hover:text-orange-400 text-sm" href="/signUp">Sign Up</a></p>

          {/* submit button  */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
