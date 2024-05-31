"use client";

import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://bible-test.onrender.com/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data); // Directly use data since the backend returns an array of users
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Dashboard</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="even:bg-gray-100 odd:bg-white">
                  <td className="border px-4 py-2 text-gray-700">{user.name}</td>
                  <td className="border px-4 py-2 text-gray-700">{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
