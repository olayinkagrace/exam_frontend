"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import logo from "../../public/logo.jpg";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setForm({ ...form, email: e.target.value.toLowerCase() });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://exam-backend-ubjk.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("currentUser", form.email);
        toast.success(data.message || "Login successful");
        router.push("/quiz");
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-6 py-12"
      style={{
        backgroundImage: "url('/som_8.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", 
        backgroundAttachment: "fixed", 
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 shadow-lg rounded-lg p-8 max-w-md w-full transform transition-all duration-500 hover:scale-105"
      >
        <div className="flex justify-center mb-2">
          <Image
            src={logo}
            width={50}
            height={30}
            alt="logo"
            className="rounded-full shadow-lg transition transform hover:rotate-12 duration-500"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-purple-500"
            />
          </div>
        </div>
        <div className="mb-6 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-purple-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-105 ${
              loading
                ? "bg-purple-300 text-gray-500"
                : "bg-purple-500 hover:bg-purple-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0116 0h-4l4 4-4 4V12z"
                  ></path>
                </svg>
                Logging In...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
