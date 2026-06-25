import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import Class from "./pages/Class";
import Notes from "./pages/Notes";
import Navbar from "./components/Navbar";
import ClassPage from "./pages/ClassPage";

function App() {
  return (
    <BrowserRouter>
      
      <h1 className="main-title">
        Welcome Back Jada!
      </h1>

      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/class" element={<Class />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/class/:id" element={<ClassPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;