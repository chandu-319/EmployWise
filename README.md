# EmployWise - Employee Management System

A modern, responsive employee management system built with React and Vite, featuring a sleek UI and efficient user management capabilities.

## Features

- 👥 Employee listing and management
- 🔐 Secure authentication system
- ✏️ Employee profile editing
- 🎨 Modern UI with responsive design
- 📱 Mobile-friendly interface
- 🔄 Real-time updates
- 🎯 Pagination for better performance

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd EmployWise
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
EmployWise/
├── src/
│   ├── components1/
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── UserList.jsx
│   │   ├── EditUser.jsx
│   │   ├── Pagination.jsx
│   │   ├── LogoutButton.jsx
│   │   └── Style.css
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## Dependencies

    "axios": "^1.8.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.4.0"

## Development Guidelines

1. **Styling**:
   - Uses CSS modules for component-specific styles
   - Follows BEM naming convention
   - Implements responsive design principles

2. **State Management**:
   - Uses React hooks for state management
   - Implements proper error handling
   - Manages loading states

3. **Code Quality**:
   - Follows React best practices
   - Uses functional components
   - Implements proper error boundaries

## Deployment

The project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration and deploy

## Assumptions and Considerations

1. **Browser Support**:
   - Modern browsers (Chrome, Firefox, Safari, Edge)
   - Mobile browsers (iOS Safari, Android Chrome)
   - Minimum screen width: 320px

2. **Performance**:
   - Pagination is implemented to handle large user lists
   - Images are optimized for web use
   - CSS animations are hardware-accelerated

3. **Security**:
   - No sensitive data is stored locally
   - API calls are made over HTTPS
   - Form inputs are sanitized

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool
- [React Router](https://reactrouter.com/) for routing
- [Axios](https://axios-http.com/) for HTTP requests 
