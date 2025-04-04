import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth.context.tsx';
import { User } from '../user.type.ts';

const SettingsButton = ({ fetch }: { fetch: () => unknown }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dailyReadingGoal, setDailyReadingGoal] = useState('');
  const [yearlyReadingGoal, setYearlyReadingGoal] = useState('');
  const { logout } = useAuth();

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = () => setDropdownOpen(!isDropdownOpen);

  const handleSave = async () => {
    const data = {
      dailyReadingGoal: Number(dailyReadingGoal),
      yearlyReadingGoal: Number(yearlyReadingGoal),
    } as User;
    console.log({ data });
    await axios
      .patch(`${import.meta.env.VITE_SERVER_BASE_URL}/user/me`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
      .catch((e) => console.log(e));
    setDropdownOpen(false);
    await fetch();
  };

  return (
    <div className={'position-relative'}>
      <button
        className="btn btn-secondary rounded-circle"
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: isHovered ? 'rgb(62, 65, 72)' : 'rgb(38, 43, 52)',
          border: 'none',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
          transform: isPressed ? 'scale(0.95)' : 'scale(1)',
          marginRight: '10px',
        }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      >
        <img
          src="settings.svg"
          alt="Settings"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </button>
      {isDropdownOpen && (
        <div
          className={'d-flex flex-column'}
          style={{
            position: 'absolute',
            top: '60px',
            right: '0',
            color: 'white',
            backgroundColor: 'rgb(38, 43, 52)',
            padding: '15px',
            borderRadius: '20px',
            zIndex: 1000,
            width: '200px',
          }}
        >
          <input
            type="text"
            placeholder="Daily reading goal"
            value={dailyReadingGoal}
            onChange={(e) =>
              setDailyReadingGoal(
                isNaN(Number(e.target.value)) ? '' : e.target.value
              )
            }
            style={{
              width: '100%',
              marginBottom: '10px',
              padding: '5px',
              borderRadius: '10px',
              backgroundColor: 'rgba(39, 43, 51, 0.2)',
              color: 'white',
              borderColor: 'transparent',
            }}
          />
          <input
            type="text"
            placeholder="Yearly reading goal"
            value={yearlyReadingGoal}
            onChange={(e) =>
              setYearlyReadingGoal(
                isNaN(Number(e.target.value)) ? '' : e.target.value
              )
            }
            style={{
              width: '100%',
              marginBottom: '10px',
              padding: '5px',
              borderRadius: '10px',
              backgroundColor: 'rgba(39, 43, 51, 0.2)',
              color: 'white',
              borderColor: 'transparent',
            }}
          />
          <button
            onClick={handleSave}
            style={{
              padding: '15px',
              marginBottom: '10px',
              width: '100%',
              backgroundColor: 'rgba(62, 65, 72, 0.2)',
              color: 'white',
              border: 'none',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              transform: isPressed ? 'scale(0.95)' : 'scale(1)',
              borderRadius: '20px',
            }}
          >
            Update
          </button>
          <button
            onClick={logout}
            style={{
              padding: '15px',
              marginBottom: '10px',
              width: '100%',
              backgroundColor: 'rgba(62, 65, 72, 0.2)',
              color: 'white',
              border: 'none',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              transform: isPressed ? 'scale(0.95)' : 'scale(1)',
              borderRadius: '20px',
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
export default SettingsButton;
