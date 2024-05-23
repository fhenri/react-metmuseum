import { Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import DepartmentPage from './pages/DepartmentPage';
import ObjectPage from './pages/ObjectPage';
import ErrorPage from './pages/ErrorPage';

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/department/:departmentId" element={<DepartmentPage />} />
      <Route path="/object/:objectId" element={<ObjectPage />} />
      {/* Using path="*"" means "match anything", so this route
        acts like a catch-all for URLs that we don't have explicit
        routes for. */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );

}

export default App
