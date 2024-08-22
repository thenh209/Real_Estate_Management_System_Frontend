import React, { useState } from 'react';
import axios from 'axios';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CancelIcon from '@mui/icons-material/Cancel';

function PutUserDetails({ showSignUp, toggleSignUp }) {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    age: '',
    mobileNumber: '',
    email: ''
  });

  const checkUsernameAvailability = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getUser/${userData.userName}`);
      console.log('Username availability response:', response.data);
      return response.data.available; // Assume the backend returns a JSON object with an "available" property.
    } catch (error) {
      console.error('Error checking username availability:', error);
      
      // Check if the error status is 404 (Not Found)
      if (error.response && error.response.status === 404) {
        console.log('Username not found. Assuming it is available.');
        return true; // Assuming the username is available.
      }
      
      // If it's not a 404 error, return false (indicating an error).
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if step is 1 and passwords match
    if (step === 1 && userData.password !== userData.confirmPassword) {
      alert("Passwords doesn't match.");
      return;
    }

    // Check if the password meets the minimum length requirement (6 characters)
    if (userData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Check if age is greater than 18
    if (step === 2 && parseInt(userData.age, 10) <= 18) {
      alert("Age must be greater than 18.");
      return;
    }

    // Check if mobile number has 10 digits
    if (step === 2 && userData.mobileNumber.length !== 10) {
      alert("Mobile number must have 10 digits.");
      return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (step === 2 && !emailPattern.test(userData.email)) {
      alert("Invalid email address.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/addUser', userData);
      console.log('Data sent successfully:', response.data);
      
      // Show success message
      alert("User created successfully.");
      
      // Redirect to prehome page
      window.location.href = '/prehome'; // Replace '/prehome' with the actual URL of the prehome page.
      
      // Optionally, you can reset the form or perform other actions here.
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNextStep = async () => {
    if (step === 1) {
      // Check if passwords match before advancing
      if (userData.password !== userData.confirmPassword) {
        alert("Passwords don't match.");
        return;
      }

      // Check if the username is available
      const isUsernameAvailable = await checkUsernameAvailability();
      if (!isUsernameAvailable) {
        alert("Username is already taken. Please choose another.");
        return;
      }

      // Check if all fields are filled in step 1
      if (
        userData.userName &&
        userData.password &&
        userData.confirmPassword
      ) {
        setStep(2);
      } else {
        alert("Please fill in all fields.");
      }
    } else if (step === 2) {
      // Check if all fields are filled in step 2
      if (
        userData.age &&
        userData.mobileNumber &&
        userData.email
      ) {
        setStep(3);
      } else {
        alert("Please fill in all fields.");
      }
    }
  };

  const handleCancel = () => {
    toggleSignUp();
  };

  return (
    <div className={showSignUp ? 'popup' : 'hidden-popup'}>
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <label  class="signtext">
                User Name<span style={{ color: 'red' }}>*</span>:&nbsp;&nbsp;
                <input
                  class="inputfield"
                  type="text"
                  name="userName"
                  value={userData.userName}
                  onChange={handleInputChange}
                  required // Mark as required
                />
              </label><br></br><br></br>
              <label  class="signtext">
                Password<span style={{ color: 'red' }}>*</span> (Minimum 6 characters):&nbsp;&nbsp;
                <input
                  class="inputfield"
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  required // Mark as required
                />
              </label><br></br><br></br>
              <label  class="signtext">
                Confirm Password<span style={{ color: 'red' }}>*</span>:&nbsp;&nbsp;
                <input
                  class="inputfield"
                  type="password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleInputChange}
                  required // Mark as required
                />
              </label><br></br><br></br>
              <div className="popup-buttons">
                <button
                  type="button"
                  onClick={handleNextStep}
                  style={{ backgroundColor: 'green', color: 'white' }}
                >
                  <ArrowForwardIcon />
                </button>
                <button
                  onClick={handleCancel}
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  <CancelIcon />
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <label  class="signtext">
                Age<span style={{ color: 'red' }}>*</span> (Must be greater than 18):&nbsp;&nbsp;
                <input
                  class="inputfield"
                  type="number"
                  name="age"
                  value={userData.age}
                  onChange={handleInputChange}
                  required // Mark as required
                />
              </label><br></br><br></br>
              <label  class="signtext">
                Mobile Number<span style={{ color: 'red' }}>*</span> (10 digits):&nbsp;&nbsp;
                <input
                  class="inputfield"
                  type="number"
                  name="mobileNumber"
                  value={userData.mobileNumber}
                  onChange={handleInputChange}
                  required // Mark as required
                />
              </label><br></br><br></br>
              <label  class="signtext">
                Email<span style={{ color: 'red' }}>*</span> (Valid email address):&nbsp;&nbsp;
                <input
                  class="inputfield"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  required // Mark as required
                />
              </label>
              <div className="popup-buttons">
              <button
  type="submit"
  style={{
    background: 'linear-gradient(to right, #00b4db, #0083b0, #00b4db)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background-color 0.3s ease',
    fontFamily:'monospace',
    fontSize:'1.2em',
    fontWeight:'bold'
  }}
  onMouseEnter={(e) => {
    e.target.style.background = 'linear-gradient(to right, #0083b0, #00b4db, #0083b0)';
    e.target.style.transform = 'translateY(-5px)';
  }}
  onMouseLeave={(e) => {
    e.target.style.background = 'linear-gradient(to right, #00b4db, #0083b0, #00b4db)';
    e.target.style.transform = 'translateY(0)';
  }}
  onClick={(e) => {
    e.target.style.transform = 'translateY(2px)';
  }}
  onAnimationEnd={(e) => {
    e.target.style.transform = 'translateY(0)';
  }}
>
  Create User
</button>

                <button
                  onClick={handleCancel}
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  <CancelIcon />
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default PutUserDetails;
