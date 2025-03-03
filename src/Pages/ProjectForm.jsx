import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProjectForm.css';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    created_by: '',
  });

  const navigate = useNavigate();  // Use history to redirect to the home page after project is created

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8081/projects/', formData)
      .then((response) => {
        console.log('Project created successfully:', response.data);
        navigate('/');  // Redirect to the home page after project creation
      })
      .catch((error) => {
        console.error('Error creating project:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Created By</label>
          <input
            type="number"
            name="created_by"
            value={formData.created_by}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
