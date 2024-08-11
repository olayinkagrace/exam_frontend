"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../public/logo.jpg";
import Image from "next/image";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    // Convert email to lowercase before setting the state
    if (e.target.name === "email") {
      setForm({ ...form, email: e.target.value.toLowerCase() });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.info("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://exam-backend-ubjk.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      setLoading(false);

      if (response.ok) {
        toast.success("Signup successful");
        router.push("/admin/users");
      } else {
        const data = await response.json();
        toast.error(data.error || "Signup failed");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const navigateToUsers = () => {
    router.push("/admin/users");
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="flex justify-end">
        <button
          onClick={navigateToUsers}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition duration-300"
        >
          All Users
        </button>
      </div>

      <div className="mt-14 sm:mt-32 flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full transform transition-all duration-500 hover:scale-105"
        >
          <div className="flex justify-center">
            <Image src={logo} width={70} height={50} alt="logo" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center mt-5 text-gray-800">
            Register Student
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter student name"
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter student email address"
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-purple-500"
            />
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
              {loading ? "Signing Up..." : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
