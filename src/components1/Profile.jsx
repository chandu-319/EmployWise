import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import Pagination from "./Pagination";
import LogoutButton from "./LogoutButton";
import "./Style.css";
const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) fetchUsers(page);
  }, [isLoggedIn, page]);

  const fetchUsers = async (pageNumber) => {
    setError(""); 
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${pageNumber}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      setError("Failed to fetch users.");
      console.error("Error fetching users:", error);
    }
  };

  const handleLogin = () => setIsLoggedIn(true);
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsers([]);
    setPage(1); 
  };

  // Handle Delete User
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setSuccessMessage("User deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Failed to delete user.");
      console.error("Error deleting user", error);
      setTimeout(() => setError(""), 3000);
    }
  };

  // Handle Edit User - Open Edit Form
  const handleEditUser = (user) => {
    setEditingUser({ ...user }); // Create a copy to avoid direct state mutation
  };

  // Handle Save Changes (Update User)
  const handleSaveChanges = async () => {
    if (!editingUser) return;
  
    try {
      await axios.put(
        `https://reqres.in/api/users/${editingUser.id}`,
        {
          first_name: editingUser.first_name,
          last_name: editingUser.last_name,
          email: editingUser.email,
        }
      );
  
      // Update users list directly with the edited user data
      setUsers(users.map((user) =>
        user.id === editingUser.id 
          ? { 
              ...user, 
              first_name: editingUser.first_name,
              last_name: editingUser.last_name,
              email: editingUser.email 
            } 
          : user
      ));
  
      setEditingUser(null);
      setSuccessMessage("User updated successfully!");
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Failed to update user.");
      console.error("Error updating user", error);
      // Clear error message after 3 seconds
      setTimeout(() => setError(""), 3000);
    }
  };
  return (
  <div className="main-container">
  {/* User List Section */}
  <div className="user-list-container">
    {!isLoggedIn ? (
      <Login onLogin={handleLogin} />
    ) : (
      <>
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
                  <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No users available.</p>
        )}

        {users.length > 0 && totalPages > 1 && (
          <div className="pagination-container">
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}

        <div className="logout-container">
          <LogoutButton onLogout={handleLogout} className="logout-btn" />
        </div>
      </>
    )}
  </div>

  {/* Edit User Section */}
  {editingUser && (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={editingUser.first_name}
          onChange={(e) => setEditingUser({ ...editingUser, first_name: e.target.value })}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={editingUser.last_name}
          onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={editingUser.email}
          onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
        />
      </div>
      <div className="button-group">
        <button className="save-btn" onClick={handleSaveChanges}>Save</button>
        <button className="cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
      </div>
    </div>
  )}
</div>

  );
};

export default Profile;