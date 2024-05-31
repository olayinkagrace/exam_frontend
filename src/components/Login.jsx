import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [form, setForm] = useState({ name: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      localStorage.setItem('currentUser', form.name);
      router.push('/quiz');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto mt-10">
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="p-2 border border-gray-300 rounded mb-2" />
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required className="p-2 border border-gray-300 rounded mb-2" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
    </form>
  );
};

export default Login;
