"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading state set to true
  const [deleting, setDeleting] = useState({}); // State to track which users are being deleted
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://bible-test.onrender.com/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error("An error occurred while fetching users");
    } finally {
      setLoading(false); // Set loading state to false after fetching users
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    setDeleting((prev) => ({ ...prev, [userId]: true }));
    try {
      const response = await fetch(
        `https://bible-test.onrender.com/userDelete/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setUsers(users.filter((user) => user._id !== userId));
        fetchUsers()
      } else {
        toast.error(data.error || "Failed to delete user");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the user");
    } finally {
      setDeleting((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const navigateToRegisterUser = () => {
    router.push("/admin/register-user");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mb-4 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <button
          onClick={navigateToRegisterUser}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Register Student
        </button>
      </div>
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Password</th>
                  <th className="border px-4 py-2">Score</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="even:bg-gray-100 odd:bg-white text-center"
                  >
                    <td className="border px-4 py-2 text-gray-700">
                      {user.name}
                    </td>
                    <td className="border px-4 py-2 text-gray-700">
                      {user.email}
                    </td>
                    <td className="border px-4 py-2 text-gray-700">
                      {user.password}
                    </td>
                    <td className="border px-4 py-2 text-gray-700">
                      {user.score}
                    </td>
                    <td className="border px-4 py-2 text-gray-700">
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={deleting[user._id]}
                        className={`px-4 py-2 rounded-lg shadow transition duration-300 ${
                          deleting[user.id]
                            ? "bg-gray-400"
                            : "bg-red-500 hover:bg-red-700"
                        } text-white`}
                      >
                        {deleting[user.id] ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
