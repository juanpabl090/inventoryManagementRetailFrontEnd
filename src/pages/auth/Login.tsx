import { useFormik } from "formik";
import type { AuthRequest } from "../../types/auth/auth";
import useAuth from "../../hooks/auth/useAuth";
import { Button } from "../../components";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const { mutate: login } = useAuth();
  const formik = useFormik<AuthRequest>({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values);
      formik.resetForm();
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Username"
            onChange={(e) => formik.setFieldValue("userName", e.target.value)}
          />
          <input
            type="password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Password"
            onChange={(e) => {
              formik.setFieldValue("password", e.target.value);
            }}
          />
          <Button type="submit" variant="solid">
            Login
          </Button>
          <div className="flex items-center justify-center">
            <p className="text-gray-900 mt-4">
              <span>Don't have an account? </span>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => navigate("/register")}
              >
                Sing Up
              </Button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
