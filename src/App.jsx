import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import userRoutes from './routes/userRoutes';
import Index from "./pages/Index.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import SalesManagerDashboard from "./pages/SalesManagerDashboard.jsx";
import SalesmanDashboard from "./pages/SalesmanDashboard.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/api/users/*" element={userRoutes} />
        <Route exact path="/" element={<Index />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/sales-manager" element={<SalesManagerDashboard />} />
        <Route exact path="/salesman" element={<SalesmanDashboard />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;