import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateProject from './components/CreateProject';
import ProjectList from './pages/ProjectList';
import PrivateRoutes from './context/PrivateRoutes';import PublicRoutes from './context/PublicRoutes';

const App = () => {
  return (
    <Router>
            <Routes>
                <Route element={<PrivateRoutes/>}>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/project-list' element={<ProjectList />} />
                    <Route path='/create-project' element={<CreateProject />} />
                </Route>
                <Route element={<PublicRoutes/>}>
                    <Route path='/login' element={<Login />} />
                </Route>
            </Routes>
        </Router>
  );
};


export default App;
