import { ChangeEvent, FC, useState, JSX } from "react";
import InputField from "../../components/InputField";
import FormHeader from "../../components/FormHeader";
import FormSelect from "../../components/FormSelect";
import { Link } from "react-router-dom";

const RegistrationForm: FC = (): JSX.Element => {
  type Gender = "Male" | "Female" | "Other" | undefined;
  type FormDataType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    telephoneNumber: string;
    address: string;
    gender: Extract<Gender, "Male" | "Female">;
    dob: string;
    level: string;
    readonly role: "student";
  };

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephoneNumber: "",
    address: "",
    gender: "Male",
    dob: "",
    level: "",
    role: "student",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //UI Content
  const renderContent = () => {
    switch (step) {
      case 1: {
        return (
          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              {/* email field  */}
              <InputField
                id="firstName"
                name="firstName"
                value={formData.firstName}
                label="First Name"
                type="text"
                placeholder="Provide First name here..."
                isRequired={true}
                onChange={handleChange}
              />
              <InputField
                id="lastName"
                name="lastName"
                value={formData.lastName}
                label="Last Name"
                type="text"
                placeholder="Provide Last name here..."
                isRequired={true}
                onChange={handleChange}
              />
              <InputField
                id="email"
                name="email"
                value={formData.email}
                label="Email"
                type="email"
                placeholder="Provide email address..."
                isRequired={true}
                onChange={handleChange}
              />
              {/* password filed  */}
              <InputField
                id="password"
                name="password"
                value={formData.password}
                label="Password"
                type="password"
                isRequired={true}
                placeholder="Provide a connection password..."
                onChange={handleChange}
              />
              <InputField
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                label="Confirm Password"
                type="password"
                isRequired={true}
                placeholder="Confirm connection password..."
                onChange={handleChange}
              />
            </div>

            {/* submit button  */}
            <div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        );
      }
      case 2: {
        return (
          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              {/* email field  */}
              <InputField
                id="telephone"
                name="telephoneNumber"
                value={formData.telephoneNumber}
                label="Telephone Number"
                type="number"
                placeholder="Provide phone number..."
                onChange={handleChange}
              />
              <InputField
                id="Address"
                name="address"
                value={formData.address}
                label="Address"
                type="text"
                placeholder="Provide your address..."
                onChange={handleChange}
              />
              <InputField
                id="gender"
                name="gender"
                value={formData.gender}
                label="Gender"
                type="text"
                isRequired={true}
                placeholder="Provide your gender here..."
                onChange={handleChange}
              />
              {/* password filed  */}
              <InputField
                id="dob"
                name="dob"
                value={formData.dob}
                label="Date of Birth"
                type="date"
                isRequired={true}
                placeholder="Provide Birth date..."
                onChange={handleChange}
              />
              <FormSelect
                name="level"
                value={formData.level}
                label="Level"
                isRequired={true}
                onChange={handleChange}
              />
            </div>

            

            {/* submit button  */}
            <div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:cursor-pointer"
              >
                Prev
              </button>
            </div>
            {/* <div className="flex justify-center items-center">
              <p className="text-[10px]">
                Already member?{" "}
                <Link
                  className="font-medium text-sm text-indigo-600 hover:text-indigo-500"
                  to={{ pathname: "/login" }}
                >
                  Login
                </Link>
              </p>
            </div> */}
          </div>
        );
      }
      default:
        throw new Error("Invalid action performed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <FormHeader title="Sign Up" />
        <form className="mt-6 space-y-6">{renderContent()}</form>
      </div>
    </div>
  );
};

export default RegistrationForm;
