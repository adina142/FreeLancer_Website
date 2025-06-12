import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageTitleProvider } from './context/PageTitleContext';
import Layout from './components/Layout';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Experience = lazy(() => import('./pages/Experience'));
const Skills = lazy(() => import('./pages/Skills'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Job = lazy(() => import('./pages/Job'));


const App = () => {
  return (
    <PageTitleProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes under layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="experience" element={<Experience />} />
             <Route path="job" element={<Job />} />
            <Route path="skills" element={<Skills />} />
          </Route>
        </Routes>
      </Suspense>
    </PageTitleProvider>
  );
};

export default App;
