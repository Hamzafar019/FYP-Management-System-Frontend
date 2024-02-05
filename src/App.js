import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Coordinator from "./components/coordinatorComponents/Coordinator";
import Supervisor from "./components/supervisorComponents/Supervisor";
import Admin from "./components/adminComponents/Admin";
import Student from "./components/studentComponents/Student";

function App() {
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );

  const handleLogin = (role) => {
    localStorage.setItem("userRole", role);
    setUserRole(role);

    // Simulate changing the URL without using react-router-dom
    window.history.pushState(null, "", `/${role}`);
  };

  const handleSignOut = () => {
    // localStorage.removeItem('userRole');
    localStorage.clear();
    setUserRole(null);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // localStorage.removeItem("userRole");
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
        return <Student />;
      case "coordinator":
        return <Coordinator />;
      case "supervisor":
        return <Supervisor />;
      case "admin":
        return <Admin />;
      default:
        return <LoginForm onLogin={handleLogin} />;
    }
  };

  return (
    <>
      {userRole !== null && <Navbar onSignOutClick={handleSignOut} />}
      {/* {<Navbar onSignUpClick={handleSignUp} />} */}
      {renderComponentByRole()}
    </>
  );
}

export default App;
