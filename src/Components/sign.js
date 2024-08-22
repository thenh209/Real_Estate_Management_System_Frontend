import React, { useState } from 'react';
import Button from '@mui/material/Button';
import UserSignIn from './userSignIn'; // Import your UserSignIn component
import PutUserDetails from './putUserDetails';

export default function Sign({ hideAppBar, showAppBar }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false); // State variable for sign-in pop-up

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
    if (!showSignUp) {
      hideAppBar(); // Call the hideAppBar function to hide the AppBar when SignUp is clicked
    } else {
      showAppBar();
    }
  };

  const toggleSignIn = () => {
    setShowSignIn(!showSignIn);
    if (!showSignIn) {
      hideAppBar(); // Hide the AppBar when SignIn is clicked
    } else {
      showAppBar(); // Show the AppBar when SignIn form is closed
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto', // Horizontally center the div
        width: 'fit-content', // Make the div fit its content
      }}
    >
      {!showSignUp && !showSignIn && (
        <React.Fragment>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '40px', fontSize: '20px',fontFamily:"cursive"}}
            onClick={toggleSignIn}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ fontSize: '20px',fontFamily:"cursive"}}
            onClick={toggleSignUp}
          
          >
            Sign Up
          </Button>
        </React.Fragment>
      )}
      {showSignUp && (
        <PutUserDetails toggleSignUp={toggleSignUp} />
      )}

      {/* Show the UserSignIn pop-up when showSignIn is true */}
      {showSignIn && (
        <UserSignIn toggleSignIn={toggleSignIn} />
      )}
    </div>
  );
}
