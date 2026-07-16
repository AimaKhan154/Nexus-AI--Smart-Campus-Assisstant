//DECIDE KRTA HAI KONSA PAGE OPEN HOGA YEH APP KA TRAFFIC CONTROLLER HAI
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages (to be created)
const Landing = React.lazy(() => import('./pages/Landing'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const AIChat = React.lazy(() => import('./pages/AIChat'));
const CampusMap = React.lazy(() => import('./pages/CampusMap'));
const Announcements = React.lazy(() => import('./pages/Announcements'));
const Faculty = React.lazy(() => import('./pages/Faculty'));
const StudyHelper = React.lazy(() => import('./pages/StudyHelper'));
const PeerConnect = React.lazy(() => import('./pages/PeerConnect'));
const Feedback = React.lazy(() => import('./pages/Feedback'));

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen text-primary">Loading Nexus...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <React.Suspense fallback={<div className="flex items-center justify-center h-screen text-primary">Initializing System...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <AIChat />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/map" 
              element={
                <ProtectedRoute>
                  <CampusMap />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/announcements" 
              element={
                <ProtectedRoute>
                  <Announcements />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/faculty" 
              element={
                <ProtectedRoute>
                  <Faculty />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/study-helper" 
              element={
                <ProtectedRoute>
                  <StudyHelper />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/peer-connect" 
              element={
                <ProtectedRoute>
                  <PeerConnect />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/feedback" 
              element={
                <ProtectedRoute>
                  <Feedback />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </React.Suspense>
      </Router>
    </AuthProvider>
  );
}
