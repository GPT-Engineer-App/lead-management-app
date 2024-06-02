import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import SalesManagerDashboard from "./pages/SalesManagerDashboard.jsx";
import SalesmanDashboard from "./pages/SalesmanDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/sales-manager" element={<SalesManagerDashboard />} />
        <Route exact path="/salesman" element={<SalesmanDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
