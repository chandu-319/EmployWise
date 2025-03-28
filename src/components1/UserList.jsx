import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';
import LogoutButton from './LogoutButton';
import './Style.css';

const UserList = ({ 
  isLoggedIn, 
  onLogout, 
  users, 
  page, 
  totalPages, 
  onPageChange,
  onDeleteUser 
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      onDeleteUser(id);
      setSuccessMessage('User deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError('Failed to delete user.');
      console.error('Error deleting user', error);
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}
      {users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img 
                src={user.avatar} 
                alt={`${user.first_name} ${user.last_name}`} 
                className="user-avatar"
              />
              <div className="user-info">
                <h3>{user.first_name} {user.last_name}</h3>
                <p>{user.email}</p>
              </div>
              <div className="button-group">
                <button 
                  className="edit-btn" 
                  onClick={() => navigate(`/edit-user/${user.id}`)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No users available.</p>
      )}

      {users.length > 0 && totalPages > 1 && (
        <div className="pagination-container">
          <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      )}

      <div className="logout-container">
        <LogoutButton onLogout={onLogout} className="logout-btn" />
      </div>
    </div>
  );
};

export default UserList; 