// src/components/Layout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from '../layouts/Header';
import './Layout.css';

const Layout = () => {
  const isLoggedIn = false; // Replace with actual auth logic

  return (
    <div className="layout-container">
      {/* Header */}
      <Header isLoggedIn={isLoggedIn} />

      {/* Body: Sidebar + Main */}
      <div className="layout-body">
        {isLoggedIn && (
          <aside className="sidebar">
            <ul>
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to="/messages">Messages</Link></li>
              <li><Link to="/saved">Saved Projects</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </aside>
        )}

        <main className="main-content">
          <Outlet />
        </main>
      </div>

   
    </div>
  );
};

export default Layout;
