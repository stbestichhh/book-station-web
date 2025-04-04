import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home.tsx';
import AuthPage from './pages/Auth.tsx';
import { AuthProvider, useAuth } from './context/auth.context.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to={'/auth'} />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/auth'} element={<AuthPage />} />
          <Route
            path={'/'}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
