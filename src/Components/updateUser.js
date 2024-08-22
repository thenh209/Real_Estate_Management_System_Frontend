import React, { useState } from 'react';
import axios from 'axios';

function UpdateUser({ showSignUp, toggleSignUp, username }) {
  const [userData, setUserData] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    age: '',
    mobileNumber: '',
    email: ''
  });
  userData.userName=username;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    // Check if the password meets the minimum length requirement (6 characters)
    if (userData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Check if age is greater than 18
    if (parseInt(userData.age, 10) <= 18) {
      alert("Age must be greater than 18.");
      return;
    }

    // Check if mobile number has 10 digits
    if (userData.mobileNumber.length !== 10) {
      alert("Mobile number must have 10 digits.");
      return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userData.email)) {
      alert("Invalid email address.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/updateUser`, userData);
      console.log('Data sent successfully:', response.data);

      // Show success message using alert
      alert("User data updated successfully.");

      // Redirect to prehome page
      window.location.href = '/prehome'; // Replace '/prehome' with the actual URL of the prehome page.

      // Optionally, you can reset the form or perform other actions here.
    } catch (error) {
      console.error('Error sending data:', error);
      alert("Failed to update user data.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  return (
    <div className={showSignUp ? 'popup' : 'hidden-popup'}>
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
          <label class="signtext">
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

          <label class="signtext">
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

          <label class="signtext">
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

          <label class="signtext">
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

          <label class="signtext">
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
                fontFamily:'monospace'
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
              Update User Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
