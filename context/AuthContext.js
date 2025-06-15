import { createContext, useContext, useEffect, useState } from 'react';
import socket from '../socket/socket';
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() =>{
  // TEMPORARY: Simulate logged-in user
  if (!user) {
    setUser({
      _id: 'demo123',
      token: 'demoToken',
      role: 'freelancer',
      skills: ['React', 'Node'],
    });
  }

  if (user) socket.connect();
  socket.emit('join', user?._id);
}, [user]);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
