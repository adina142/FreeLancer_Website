import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (!user) {
      console.warn('⚠️ No user found in AuthContext');
      return;
    }

    console.log('✅ User:', user);
    console.log('🔐 Sending token:', user.token);

    API.get(`/applications/dashboard`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(res => {
        console.log('📊 Dashboard response:', res.data);
        setStats(res.data);
      })
      .catch(err => {
        console.error('❌ Dashboard fetch failed:', err.response?.data || err.message);
      });

  }, [user]);

  return (
    <div>
      <h2>Dashboard</h2>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
