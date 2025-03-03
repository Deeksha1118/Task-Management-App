import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  useEffect(() => {
    axios.get('http://localhost:8081/tasks/')
      .then(response => {
        setTasks(response.data.data);  // Store tasks in the state
        setLoading(false);  // Stop loading when data is fetched
      })
      .catch(error => {
        setError("Error fetching tasks");
        setLoading(false);  // Stop loading if error occurs
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.task_id !== id));  // Remove the deleted task
      })
      .catch(error => console.error("Error deleting task:", error));
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <Link to="/task/create"><button>Create Task</button></Link>

      {loading && <p>Loading tasks...</p>}  {/* Show loading message */}
      {error && <p className="text-red-500">{error}</p>}  {/* Show error message */}
      
      {/* Display tasks in a table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th >ID</th>
              <th >Title</th>
              <th >Description</th>
              <th >Assigned To</th>
              <th >Status</th>
              <th >Due Date</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.task_id}>
                  <td >{task.task_id}</td>
                  <td >{task.title}</td>
                  <td >{task.description}</td>
                  <td >{task.assigned_to}</td>
                  <td >{task.status}</td>
                  <td >{task.due_date}</td>
                  <td >
                    <Link to={`/task/edit/${task.task_id}`} className="edit">Edit</Link>
                    <button
                      onClick={() => handleDelete(task.task_id)}
                      className="delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center px-4 py-2">No tasks available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManager;
