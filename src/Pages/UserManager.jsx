import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/UserManager.css';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  useEffect(() => {
    axios.get('http://localhost:8081/users/')
      .then(response => {
        setUsers(response.data.data);  // Store users in the state
        setLoading(false);  // Stop loading when data is fetched
      })
      .catch(error => {
        setError("Error fetching users");
        setLoading(false);  // Stop loading if error occurs
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.user_id !== id));  // Remove the deleted user
      })
      .catch(error => console.error("Error deleting user:", error));
  };

  return (
    <div className="user-container ">
      <h1>User Manager</h1>
      <Link to="/user/create"><button>Create User</button></Link>

      {loading && <p>Loading users...</p>}  {/* Show loading message */}
      {error && <p className="text-red-500">{error}</p>}  {/* Show error message */}
      
      {/* Display users in a table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th >ID</th>
              <th >Name</th>
              <th >Email</th>
              <th >Role</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.user_id}>
                  <td >{user.user_id}</td>
                  <td >{user.name}</td>
                  <td >{user.email}</td>
                  <td >{user.role}</td>
                  <td >
                    <Link to={`/user/edit/${user.user_id}`} className="edit">Edit</Link>
                    <button
                      onClick={() => handleDelete(user.user_id)}
                      className="delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No users available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
