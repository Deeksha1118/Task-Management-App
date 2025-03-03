import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskManager from './Pages/TaskManager';
import TaskForm from './Pages/TaskForm';
import ProjectManager from './Pages/ProjectManager'; 
import ProjectForm from './Pages/ProjectForm'; 
import UserManager from './Pages/UserManager'; 
import UserForm from './Pages/UserForm';
import Home from './Pages/HomePage.jsx'; 
import './index.css';

const App = () => {
  return (
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Routes for Tasks */}
        <Route path="/task" element={<TaskManager />} />
        <Route path="/task/create" element={<TaskForm />} />
        <Route path="/task/edit/:task_id" element={<TaskForm />} />
        
        {/* Routes for Projects */}
        <Route path="/project" element={<ProjectManager />} />
        <Route path="/project/create" element={<ProjectForm />} />
        <Route path="/project/edit/:project_id" element={<ProjectForm />} />
        
        {/* Routes for Users */}
        <Route path="/user" element={<UserManager />} />
        <Route path="/user/create" element={<UserForm />} />
        <Route path="/user/edit/:user_id" element={<UserForm />} />
      </Routes>
  );
};

export default App;
