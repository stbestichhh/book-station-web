import React, { useState } from 'react';
import { useAuth } from '../context/auth.context.tsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './auth.css';
import MotionDivZOpacity from '../components/MotionDivZOpacity.tsx';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dailyReadingGoal, setDailyReadingGoal] = useState('');
  const [yearlyReadingGoal, setYearlyReadingGoal] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/auth/signup`,
          {
            username,
            email,
            password,
            dailyReadingGoal: Number(dailyReadingGoal),
            yearlyReadingGoal: Number(yearlyReadingGoal),
          }
        );
      }
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/signin`,
        { email, password }
      );
      if (response.data.authentication_token) {
        login(response.data.authentication_token);
        navigate('/');
      }
    } catch (e) {
      console.error('Auth failed', e);
    }
  };

  return (
    <div
      className={`d-flex flex-column overflow-hidden align-items-center justify-content-center`}
      style={{
        background:
          'rgb(0,0,0) linear-gradient(216deg, rgba(0,0,0,1) 0%, rgba(37,37,37,1) 17%, rgba(70,70,70,1) 50%, rgba(105,104,104,1) 74%, rgba(0,0,0,1) 100%)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <MotionDivZOpacity classes={''}>
        <h1 className={'text-light mb-5'}>Welcome to BookStation!</h1>
        <form
          onSubmit={handleSubmit}
          className={'d-flex flex-column align-items-center'}
        >
          <div className={'auth-box d-flex flex-column align-items-center'}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            {isRegister && (
              <>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
                <input
                  type="text"
                  value={dailyReadingGoal}
                  onChange={(e) =>
                    setDailyReadingGoal(
                      isNaN(Number(e.target.value)) ? '' : e.target.value
                    )
                  }
                  placeholder="Daily reading goal"
                />
                <input
                  type="text"
                  value={yearlyReadingGoal}
                  onChange={(e) =>
                    setYearlyReadingGoal(
                      isNaN(Number(e.target.value)) ? '' : e.target.value
                    )
                  }
                  placeholder="Yearly reading goal"
                />
              </>
            )}
            <button
              className="btn btn-secondary rounded-5"
              type="submit"
              style={{
                padding: '20px 60px 20px 60px',
                backgroundColor: 'rgba(39, 43, 51, 0.5)',
                color: '#ededed',
                border: 'none',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                marginTop: '20px',
                marginBottom: '10px',
              }}
            >
              <strong>{isRegister ? 'Sign Up' : 'Login'}</strong>
            </button>
          </div>
          <p onClick={() => setIsRegister(!isRegister)}>
            {isRegister
              ? 'Already have an account? Login'
              : "Don't have an account? Sign up"}
          </p>
        </form>
      </MotionDivZOpacity>
    </div>
  );
};
export default AuthPage;
