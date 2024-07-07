import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import CreateProject from './components/CreateProject';
import Login from './components/Login';

function App() {
  return (
    <Router>

    <div>
      <Sidebar />
      <Routes>
        <Route exact path="/"
          element={<Dashboard />}
        />
        <Route path='/project-list'
          element={<ProjectList />}
        />
        <Route path='/create-project'
          element={<CreateProject />}
        />
        <Route path='login'
          element={<Login />}
        />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
