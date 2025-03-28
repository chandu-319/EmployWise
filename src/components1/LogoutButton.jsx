import "./Style.css"; // Import CSS for styling

const LogoutButton = ({ onLogout }) => (
    <div className="logout-container">
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
  
  export default LogoutButton;