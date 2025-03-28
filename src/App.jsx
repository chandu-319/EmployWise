import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components1/Login";
import UserList from "./components1/UserList";
import EditUser from "./components1/EditUser";
import axios from "axios";
import "./App.css";

// Protected Route component
const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (pageNumber) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${pageNumber}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers(page);
    }
  }, [isLoggedIn, page]);

  const handleLogin = () => setIsLoggedIn(true);
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsers([]);
    setPage(1);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route 
            path="/login" 
            element={
              isLoggedIn ? (
                <Navigate to="/users" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <UserList 
                  isLoggedIn={isLoggedIn} 
                  onLogout={handleLogout}
                  users={users}
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  onDeleteUser={handleDeleteUser}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-user/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <EditUser onUpdateUser={handleUpdateUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/users" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


