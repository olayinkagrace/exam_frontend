"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState({});

  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://exam-backend-ubjk.onrender.com/users"
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error("An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    setDeleting((prev) => ({ ...prev, [userId]: true }));
    try {
      const response = await fetch(
        `https://exam-backend-ubjk.onrender.com/userDelete/${userId}`,
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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 to-indigo-100 py-10 px-5">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl p-8 mb-8 flex justify-between items-center">
        <h2 className="text-xl font-extrabold text-gray-800">
          Admin Dashboard
        </h2>
        <button
          onClick={navigateToRegisterUser}
          className="bg-indigo-500 text-white text-xs px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transform transition-all duration-300 hover:scale-105"
        >
          Register Student
        </button>
      </div>
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-xl p-6 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white text-sm">
                <th className="border px-6 py-4">Name</th>
                <th className="border px-6 py-4">Email</th>
                <th className="border px-6 py-4">Password</th>
                <th className="border px-6 py-4">Scores</th>
                <th className="border px-6 py-4">Total Score</th>
                <th className="border px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="even:bg-gray-50 odd:bg-white text-center text-xs text-gray-800 hover:bg-gray-100 transform transition-colors duration-200"
                >
                  <td className="border px-6 py-4">{user.name}</td>
                  <td className="border px-6 py-4">{user.email}</td>
                  <td className="border px-6 py-4">{user.password}</td>
                  <td className="border px-6 py-4">
                    {Array.isArray(user.scores)
                      ? user.scores.map((score, index) => (
                          <div key={index} className="text-xs">
                            {`Section ${index + 1}: ${score.score}`}
                          </div>
                        ))
                      : "No scores available"}
                  </td>
                  <td className="border px-6 py-4">
                    {Array.isArray(user.scores)
                      ? user.scores.reduce(
                          (total, score) => total + score.score,
                          0
                        )
                      : 0}
                  </td>
                  <td className="border px-6 py-4">
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={deleting[user._id]}
                      className={`p-2 rounded-lg shadow text-[9px] transform transition-all duration-300 hover:scale-105 ${
                        deleting[user._id]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-700"
                      } text-white`}
                    >
                      {deleting[user._id] ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
