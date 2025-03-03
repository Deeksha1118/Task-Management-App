import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ProjectManager.css';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  useEffect(() => {
    axios.get('http://localhost:8081/projects/')
      .then(response => {
        setProjects(response.data.data);  // Store projects in the state
        setLoading(false);  // Stop loading when data is fetched
      })
      .catch(error => {
        setError("Error fetching projects");
        setLoading(false);  // Stop loading if error occurs
        console.error("Error fetching projects:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/projects/${id}`)
      .then(() => {
        setProjects(projects.filter(project => project.project_id !== id));  // Remove the deleted project
      })
      .catch(error => console.error("Error deleting project:", error));
  };

  return (
    <div className="prjt-container ">
      <h1 >Project Manager</h1>
      <Link to="/project/create"><button>Create Project</button></Link>

      {loading && <p>Loading projects...</p>}  {/* Show loading message */}
      {error && <p className="text-red-500">{error}</p>}  {/* Show error message */}
      
      {/* Display projects in a table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th >ID</th>
              <th >Name</th>
              <th >Description</th>
              <th >Created_by</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.project_id}>
                  <td >{project.project_id}</td>
                  <td >{project.name}</td>
                  <td >{project.description}</td>
                  <td >{project.created_by}</td>
                  <td >
                    <Link to={`/project/edit/${project.project_id}`} className="edit">Edit</Link>
                    <button
                      onClick={() => handleDelete(project.project_id)}
                      className="delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No projects available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManager;
