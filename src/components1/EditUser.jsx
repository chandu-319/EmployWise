import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

const EditUser = ({ onUpdateUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
      } catch (error) {
        setError('Failed to fetch user details.');
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSaveChanges = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      await axios.put(
        `https://reqres.in/api/users/${user.id}`,
        {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        }
      );
      
      onUpdateUser({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar
      });
      
      setSuccessMessage('User updated successfully!');
      setTimeout(() => {
        navigate('/users');
      }, 2000);
    } catch (error) {
      setError('Failed to update user.');
      console.error('Error updating user:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          disabled={isSaving}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          disabled={isSaving}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          disabled={isSaving}
        />
      </div>
      <div className="button-group">
        <button 
          className="save-btn" 
          onClick={handleSaveChanges}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <span className="spinner"></span>
              Saving...
            </>
          ) : (
            'Save'
          )}
        </button>
        <button 
          className="cancel-btn" 
          onClick={() => navigate('/users')}
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditUser; 