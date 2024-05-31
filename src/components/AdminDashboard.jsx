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
    <div className="mt-10">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
