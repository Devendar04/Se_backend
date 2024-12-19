import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/userContext';
import {  useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('');

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate(); 

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      role: role,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);

        // Navigate based on role
        if (data.user.role === 'student') {
          navigate('/studentDashboard');
        } else if (data.user.role === 'teacher') {
          navigate('/teachersDashboard');
        }
      }
    } catch (error) {
      console.error('Registration failed', error);
    }

    // Reset form fields
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setRole('');
  };

  return (
    <form
      className="w-full flex flex-col items-center"
      onSubmit={submitHandler}
    >
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <div className="flex gap-4 mb-4">
        <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          <i className="fab fa-google-plus-g text-indigo-300 text-lg"></i>
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
      <span className="text-sm text-gray-600 mb-4">
        or use your email for registration
      </span>
      <div className="flex gap-2">
        <input
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          type="text"
          placeholder="First Name"
          className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
        />
        <input
          required
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          type="text"
          placeholder="Last Name"
          className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
        />
      </div>
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
      <input
        required
        value={role}
        onChange={(e) => setRole(e.target.value)}
        type="text"
        placeholder="Role (e.g., student or teacher)"
        className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="w-full bg-indigo-700 text-white flex justify-center py-2 rounded-lg font-semibold hover:bg-indigo-800"
      >
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
