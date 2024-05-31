"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [form, setForm] = useState({ name: '', password: '', confirmPassword: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: form.name, password: form.password })
    });

    if (response.ok) {
      alert('Signup successful');
      router.push('/login');
    } else {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto mt-10">
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="p-2 border border-gray-300 rounded mb-2" />
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required className="p-2 border border-gray-300 rounded mb-2" />
      <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required className="p-2 border border-gray-300 rounded mb-2" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Signup</button>
    </form>
  );
};

export default Signup;
