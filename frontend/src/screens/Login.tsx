import { useState } from "react";
import { z } from "zod";
import FormInput from "../components/utils/FormInput";
import Button from "../components/utils/Button";
import { NavLink, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken } from "../store/sessionSlice";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const validation = loginSchema.safeParse(loginData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signin",
        loginData
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch(setToken(token));

      const params = new URLSearchParams(location.search);
      let redirectTo = params.get("redirect-to") || "/";

      if (!redirectTo.startsWith("/")) {
        redirectTo = `/${redirectTo}`;
      }

      navigate(redirectTo);
      toast.success("Logged in successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="border border-primary rounded-xl w-full max-w-xl p-4 py-8 md:py-8 shadow-lg mt-8">
        <h1 className="text-center text-xl md:text-3xl font-semibold mb-8 leading-snug">
          Welcome Back To <br /> Your Favourite Place!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            title="Email"
            name="email"
            type="email"
            placeholder="Enter your email..."
            onChange={handleChange}
            required
          />
          <FormInput
            title="Password"
            name="password"
            type="password"
            placeholder="********"
            onChange={handleChange}
            required
          />
          <Button primary className="w-full" loading={loading}>
            Login
          </Button>
        </form>
        <NavLink
          className="block text-primary mt-4 underline text-sm"
          to="/signup"
        >
          Don't have an account? Register here.
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
