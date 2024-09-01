import { API_BASE_URL } from "../../constants/constants";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../providers/context/app-context";
import Textbox from "../../Component/specific/dashboard-side-nav/Textbox";
import { toast } from "sonner";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setCurrentUser } = useAppContext();
  const navigate = useNavigate();

  const handleFormSubmit = async ({ email, password }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        toast.error("Invalid email or password.");
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setCurrentUser(data.user);
      toast.success("Login successful! Redirecting to Dashboard...");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-lighter-shade-s-color p-4 lg:p-8">
      <span className="py-2 text-sm text-center text-muted-text-color">
        Prioritize your tasks; schedule them accordingly.
      </span>
      <div className="flex flex-col justify-center items-center flex-1 max-w-5xl mx-auto">
        <div className="flex-1 w-full max-w-lg flex items-center justify-center">
          <form
            className="p-8 md:p-10 lg:p-12  flex flex-col gap-6"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div>
              <p className="text-primary-color text-3xl font-bold text-center">
                Welcome Back!
              </p>
              <p className="text-center text-base text-muted-text-color">
                Keep your credentials safe.
              </p>
            </div>

            <Textbox
              placeholder="abc@gmail.com"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded-lg border border-muted-text-color"
              register={register}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder="your password"
              type="password"
              name="password"
              label="Password"
              className="w-full rounded-lg border border-muted-text-color"
              register={register}
              error={errors.password ? errors.password.message : ""}
            />

            <span className="text-sm text-muted-text-color hover:text-primary-color hover:underline cursor-pointer text-center">
              Forgot Password?
            </span>

            <button
              type="submit"
              className="w-full h-12 bg-primary-color text-white rounded-lg hover:bg-accent-color transition-colors duration-300"
            >
              Submit
            </button>

            <div className="text-center">
              <h4 className="text-primary-color inline">
                Don't Have An Account?
              </h4>
              <Link
                to="/registration"
                className="font-semibold text-primary-color ml-1"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
