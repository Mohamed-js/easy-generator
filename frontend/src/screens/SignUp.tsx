import { useState } from "react";
import { z } from "zod";
import FormInput from "../components/utils/FormInput";
import Button from "../components/utils/Button";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken } from "../store/sessionSlice";

const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const validation = signUpSchema.safeParse(signUpData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        signUpData
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch(setToken(token));
      navigate("/");
      toast.success("Registered in successfully!");
    } catch (err: any) {
      console.log(err);
      err.response?.data?.message.forEach((msg) => {
        toast.error(msg || "Something went wrong");
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="border border-primary rounded-xl w-full max-w-xl p-4 py-8 md:py-8 shadow-lg mt-8">
        <h1 className="text-center text-xl md:text-3xl font-semibold mb-8 leading-snug">
          Welcome To Easy Generator <br /> Join Us Now!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            title="Name"
            name="name"
            type="text"
            placeholder="Enter your name..."
            onChange={handleChange}
            required
          />
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
            SignUp
          </Button>
        </form>
        <NavLink
          className="block text-primary mt-4 underline text-sm"
          to="/login"
        >
          Already have an account? Login here.
        </NavLink>
      </div>
    </div>
  );
};

export default SignUp;
