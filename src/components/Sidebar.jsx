// Sidebar.jsx
import { Link } from "react-router-dom";
import { FaBook, FaTasks, FaList, FaMoneyBill, FaLock, FaClock, FaCheck, FaBolt, FaTachometerAlt } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="sidebar-header">
        {open && <img src="src\assets\mindorbit.png" alt="Logo" className="sidebar-logo" />}
        <div className="toggle-btn" onClick={toggleSidebar}>
          {open ? "❮" : "❯"}
        </div>
      </div>
      <Link to="/dashboard"><FaTachometerAlt /><span>Dashboard</span></Link>
      <Link to="/assignments"><FaBook /><span>Assignments</span></Link>
      <Link to="/goals"><FaTasks /><span>Goals</span></Link>
      <Link to="/journal"><FaList /><span>Journal</span></Link>
      <Link to="/expense"><FaMoneyBill /><span>Expense Tracker</span></Link>
      <Link to="/password"><FaLock /><span>Password Manager</span></Link>
      <Link to="/timer"><FaClock /><span>Pomodoro Timer</span></Link>
      <Link to="/habits"><FaCheck /><span>Habits Tracker</span></Link>
      <Link to="/flashcards"><FaBolt /><span>Flash Cards</span></Link>
    </div>
  );
};

export default Sidebar;