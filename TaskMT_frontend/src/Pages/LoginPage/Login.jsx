import { API_BASE_URL } from "../../constants/constants";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../providers/context/app-context";
import Textbox from "../../Component/specific/dashboard-side-nav/Textbox";
import { useState } from "react";

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
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      localStorage.setItem("token", data.token);

      setCurrentUser(data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex  flex-col justify-center items-center min-h-screen bg-[#f3f4f6] p-4 lg:flex-row">
      <div className="w-full md:w-auto flex ga-40 flex-col md:flex-row items-center">
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center gap-5 md:gap-y-10 2xl:-mt-20 ">
            <span className="flex gap-1  py-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600 text-nowrap">
              Prioritize your tasks; schedule them accordingly.
            </span>

            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-primary-color">
              <span>Personal</span>
              <span>Task Manager</span>
            </p>

            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
        <form
          className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="">
            <p className="text-blue-600 text-3xl font-bold text-center">
              Welcome back!
            </p>
            <p className="text-center text-base text-gray-700 ">
              Keep all your credential safge.
            </p>
          </div>

          <Textbox
            placeholder="abc@gmail.com"
            type="email"
            name="email"
            label="Email Address"
            className="w-full rounded-full"
            register={register}
            error={errors.email ? errors.email.message : ""}
          />

          <Textbox
            placeholder="your password"
            type="password"
            name="password"
            label="password"
            className="w-full rounded-full"
            register={register}
            error={errors.password ? errors.password.message : ""}
          />

          <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
            Forget Password?
          </span>

          <button
            type="submit"
            className="w-full h-10 bg-blue-700 text-white rounded-full"
          >
            Submit
          </button>
        </form>

        <div className=" mt-6 text-nowrap">
          <h4 className="text-primary inline">Do Not Have An Account?</h4>
          <Link to="/registration" className="font-semibold text-center ml-1 ">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
