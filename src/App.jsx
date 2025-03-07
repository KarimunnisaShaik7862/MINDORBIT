import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import AssignmentsCRUD from "./pages/Assignments";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Topbar />
        <div className="main">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/dashboard" element={<h1>Dashboard Page</h1>} />
              <Route path="/assignments" element={<AssignmentsCRUD />} />
              <Route path="/goals" element={<h1>Goals Page</h1>} />
              <Route path="/habits" element={<h1>Habits Tracker Page</h1>} />
              <Route path="/flashcards" element={<h1>Flash Cards Page</h1>} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;