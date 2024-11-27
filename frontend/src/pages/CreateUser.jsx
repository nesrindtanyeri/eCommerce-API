import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Empty fields check
    if (!name || !email || !password) {
      toast.error('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users', {
        name,
        email,
        password,
      });
      console.log('User created successfully:', response.data);

      // Show success notification
      toast.success('User created successfully!');

      // Reset the form
      setName('');
      setEmail('');
      setPassword('');
      setErrorMessage(''); // Reset error message
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('A user with this email already exists.');
        toast.error('A user with this email already exists.');
      } else {
        setErrorMessage('An error occurred while creating the user.');
        toast.error('An error occurred while creating the user.');
      }
      console.error('An error occurred while creating the user:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-4 text-primary">Create User</h1>
      {errorMessage && <div className="text-error mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
