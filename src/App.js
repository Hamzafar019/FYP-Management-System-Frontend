import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Coordinator from "./components/coordinatorComponents/Coordinator";
import Supervisor from "./components/supervisorComponents/Supervisor";
import Admin from "./components/adminComponents/Admin";
import Student from "./components/studentComponents/Student";
import IndustryProject from "./components/IndustryProjects"; // Import the IndustryProject component

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);

  const handleLogin = (role) => {
    localStorage.setItem("userRole", role);
    setUserRole(role);
    // Simulate changing the URL without using react-router-dom
    window.history.pushState(null, "", `/${role}`);
  };

  const handleSignOut = () => {
    localStorage.clear();
    setUserRole(null);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.clear();
      setUserRole(null);
      // Simulate changing the URL without using react-router-dom
      window.history.pushState(null, "", "/");
    }, 900000); // 30 seconds in milliseconds
    return () => clearTimeout(timeoutId);
  }, [userRole]);

  const renderComponentByRole = () => {
    switch (userRole) {
      case "student":
        return <Student onSignOutClick={handleSignOut} />;
      case "coordinator":
        return <Coordinator onSignOutClick={handleSignOut} />;
      case "supervisor":
        return <Supervisor onSignOutClick={handleSignOut} />;
      case "admin":
        return <Admin onSignOutClick={handleSignOut} />;
      default:
        return <LoginForm onLogin={handleLogin} />;
    }
  };

  const renderPageByURL = () => {
    // Check if the URL is "/industry-project"
    if (window.location.pathname === "/industry-project") {
      return <IndustryProject />;
    }
    // Render component based on user role if URL is not "/industry-project"
    return renderComponentByRole();
  };

  return (
    <>
      {renderPageByURL()}
    </>
  );
}

export default App;
