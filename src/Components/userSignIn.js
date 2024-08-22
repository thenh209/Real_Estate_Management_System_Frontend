import React, { useState } from 'react';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom

function UserSignIn({ toggleSignIn }) {
  const navigate = useNavigate(); // Initialize useHistory

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Make a GET request to retrieve the password associated with the username
      const response = await axios.get(
        `http://localhost:8080/getUser/${formData.userName}`
      );

      const databasePassword = response.data.password;

      // Compare the retrieved password with the user-entered password
      if (formData.password === databasePassword) {
        console.log("Success");

        // Redirect to the Welcome page if both username and password are correct
        navigate(`/home/${formData.userName}`);
      } else {
        setError('Invalid password.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Invalid username');
    }
  };

  return (
    <div className='popup-content'>
      <h2 style={{ fontWeight: 'bold',fontFamily:'cursive',fontSize:'1.5em'}}>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <label class="signtext">
          Username:&nbsp;&nbsp;
          <input
            class="inputfield"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            required
          />
        </label><br></br><br></br>
        <br />
        <label class="signtext">
          Password:&nbsp;&nbsp;&nbsp;
          <input
            class="inputfield"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label><br></br><br></br>
        <br />
        <div className='popup-buttons'>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(to right, #ff7f00, #ff007f)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              fontFamily:'monospace',
              fontSize:'1.2em',
              fontWeight:'bold'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(to right, #ff007f, #ff7f00)';
              e.target.style.transform = 'scale(1.05) rotate(10deg)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(to right, #ff7f00, #ff007f)';
              e.target.style.transform = 'scale(1) rotate(0deg)';
            }}
            onClick={(e) => {
              e.target.style.transform = 'scale(0.95) rotate(-10deg)';
            }}
            onAnimationEnd={(e) => {
              e.target.style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            Sign In
          </button>

          <button
            onClick={toggleSignIn}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            <CancelIcon />
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default UserSignIn;
