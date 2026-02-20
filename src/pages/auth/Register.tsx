import { EyeIcon, EyeOff, IdCard, Mail, Shield, User } from "lucide-react";
import { Button } from "../../components";
import { useNavigate } from "react-router";
import useAuthRegister from "../../hooks/auth/useAuthRegister";
import type { AuthRegisterRequest } from "../../types/auth/auth";
import { object, string } from "yup";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { useState } from "react";

export default function Register() {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const navigate = useNavigate();
  const { mutate, error } = useAuthRegister();

  const schema = object().shape({
    firstName: string().required("Your first name is required"),
    lastName: string().required("Your last name is required"),
    userName: string().required("Write a username to use your account"),
    email: string().email("Invalid email format").required("Email is required"),
    password: string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "Password must have 8 characters, at least one uppercase, one lowercase, one number and one special character",
      ),
  });

  return (
    <Formik<AuthRegisterRequest>
      initialValues={{
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
      }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        mutate(values);
        resetForm();
      }}
    >
      {({ errors, touched, submitCount }) => (
        <div className="flex min-h-dvh w-full items-center justify-center bg-white">
          <Form className="flex flex-col">
            <div className="grid grid-cols-2 auto-rows-min gap-2 min-w-fit min-h-fit shadow-gray-400 shadow-md p-5 rounded-md">
              <div className="flex flex-col justify-center col-span-2 w-full max-h-dvh pt-5">
                <h1 className="text-3xl text-neutral-900 font-bold">
                  Register
                </h1>
                <p className="text-neutral-500">
                  Create your account to get started
                </p>
              </div>
              <div className="flex flex-col items-center row-start-2 relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <Field
                  component="input"
                  name="firstName"
                  type="text"
                  className="w-full h-[6dvh] pl-10 bg-gray-200 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="First Name"
                />
                {((touched.firstName || submitCount > 0) && errors.firstName) ||
                error?.message ? (
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="break-words text-warning-500"
                  />
                ) : (
                  <div className=""></div>
                )}
              </div>
              <div className="flex flex-col items-center row-start-2 relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <Field
                  name="lastName"
                  component="input"
                  type="text"
                  className="w-full h-[6dvh] pl-10 bg-gray-200 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Last Name"
                />
                {touched.firstName || errors.firstName || error?.message ? (
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="break-words text-warning-500"
                  />
                ) : null}
              </div>
              <div className="flex flex-col items-center col-span-2 relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <IdCard className="w-4 h-4 text-gray-500" />
                </div>
                <Field
                  name="userName"
                  component="input"
                  type="text"
                  className="w-full h-[6dvh] pl-10 bg-gray-200 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Username"
                />
                {touched.firstName || errors.firstName || error?.message ? (
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="break-words text-warning-500"
                  />
                ) : null}
              </div>
              <div className="flex flex-col items-center col-span-2 row-start-4 relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <Mail className="w-4 h-4 text-gray-500" />
                </div>
                <Field
                  name="email"
                  component="input"
                  type="email"
                  className="w-full h-[6dvh] pl-10 bg-gray-200 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Email Address"
                />
                {touched.firstName || errors.firstName || error?.message ? (
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="break-words text-warning-500"
                  />
                ) : null}
              </div>
              <div className="flex flex-col items-center col-span-2 row-start-5 relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <Shield className="w-4 h-4 text-gray-500" />
                </div>
                <Field
                  name="password"
                  component="input"
                  type={passwordShown ? "text" : "password"}
                  className="w-full h-[6dvh] pl-10 bg-gray-200 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisiblity}
                >
                  {passwordShown ? (
                    <div className="h-fit w-fit bg-neutral-00 p-1 rounded-lg">
                      <EyeIcon className="w-6 h-6 text-gray-600" />
                    </div>
                  ) : (
                    <div className="h-fit w-fit bg-neutral-400 p-1 rounded-lg">
                      <EyeOff className="w-6 h-6 text-gray-600" />
                    </div>
                  )}
                </button>
                {touched.firstName || errors.firstName || error?.message ? (
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="break-words text-warning-500"
                  />
                ) : null}
              </div>
              <div className="flex items-center justify-center col-span-2 row-start-6 relative">
                <Button className="h-full w-full" type="submit" variant="solid">
                  Register
                </Button>
              </div>
              <div className="flex items-center justify-center col-span-2 row-start-7 relative">
                <p>
                  Already Have an account?
                  <span className="ml-1" onClick={() => navigate("/login")}>
                    <Button variant="outline" size="sm" type="button">
                      Login
                    </Button>
                  </span>
                </p>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
