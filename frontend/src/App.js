import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import MasterDashboard from "./pages/MasterDashboard";
import CreateProblem from "./pages/CreateProblem";
import MyProblems from "./pages/MyProblems";
import EditProblem from "./pages/EditProblem";
import ProblemSets from "./pages/ProblemSets";
import ProblemBrowser from "./pages/ProblemBrowser";
import ProblemDetails from "./pages/ProblemDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to = "/login" />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/home' element={<Home/>} />
        <Route path="/master-dashboard" element={<MasterDashboard />} />
        <Route path="/create-problem" element={<CreateProblem />} />
        <Route path="/my-problems" element={<MyProblems />} />
         <Route path="/edit-problem/:id" element={<EditProblem />} />
         <Route path="/problem-sets" element={<ProblemSets />} />
         <Route path="/problems" element={<ProblemBrowser />} />
         <Route path="/problems/:id" element={<ProblemDetails />} />
      </Routes>
    </div>
  );
}

export default App;
