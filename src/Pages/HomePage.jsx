import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className='text-red-500'>Welcome to the Management System</h1>
      <p>Choose one of the options below to manage your tasks, projects, and users:</p>
      <div className="links">
        <Link to="/task" className="link">
          <button className="btn">Go to Task Manager</button>
        </Link>
        <Link to="/project" className="link">
          <button className="btn">Go to Project Manager</button>
        </Link>
        <Link to="/user" className="link">
          <button className="btn">Go to User Manager</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
