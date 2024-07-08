import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Dashboard from './components/Dashboard';
import ProjectList from './pages/ProjectList';
import CreateProject from './components/CreateProject';
import Login from './components/Login';
import { AuthProvider } from './context/AuthProvider';
import {PrivateRoute} from './context/ProtectedRoute';

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

  // return (
  //   <AuthProvider>
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/login" element={<Login />} />
  //         <Route element={<PrivateRoute />}>
  //           <Route path="/dashboard" element={<Dashboard />} />
  //         </Route>
  //       </Routes>
  //     </BrowserRouter>
  //   </AuthProvider>
  // );
}

export default App;
