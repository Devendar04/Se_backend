import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/userContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);

        // Navigate based on role
        if (data.user.role === 'student') {
          navigate('/studentDashboard');
        } else if (data.user.role === 'teacher') {
          navigate('/teachersDashboard');
        } else {
          console.error('Invalid role detected');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }

    // Reset form fields
    setEmail('');
    setPassword('');
  };

  return (
    <form
      className="w-full flex flex-col items-center"
      onSubmit={submitHandler}
    >
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <div className="flex gap-4 mb-4">
        <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          <i className="fab fa-google-plus-g text-indigo-700 text-lg"></i>
        </a>
        <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          <i className="fab fa-facebook-f text-indigo-700 text-lg"></i>
        </a>
        <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          <i className="fab fa-github text-indigo-700 text-lg"></i>
        </a>
        <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          <i className="fab fa-linkedin-in text-indigo-700 text-lg"></i>
        </a>
      </div>
      <span className="text-sm text-gray-600 mb-4">or use your email for login</span>
      <input
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
      />
      <input
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
      />
      <a href="#" className="text-sm text-indigo-700 hover:underline mb-3">
        Forgot your password?
      </a>
      <button
        type="submit"
        className="w-full bg-indigo-700 text-white flex justify-center py-2 rounded-lg font-semibold hover:bg-indigo-800"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
