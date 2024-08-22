import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Transition } from 'react-transition-group';
import Grid from '@mui/material/Grid';
import GetUserDetails from './getUserDetails'; // Import your GetUserDetails component
import PutPropertyDetails from './putPropertyDetails'; // Import your PutPropertyDetails component
import { FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
const TransitionComponent = (props) => {
  return <Slide {...props} direction="up" />;
};

export default function Home() {
  const navigate = useNavigate(); // Initialize useHistory
  const { username } = useParams();
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  const toggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };

  const toggleAddProperty = () => {
    setShowAddProperty(!showAddProperty);
  };

  const hasCustomAvatar = true;

  const handleLogout = () => {
    // Implement your logout logic here
    // Redirect to the prehome page
    navigate('/prehome');
  };

  useEffect(() => {
    typeWelcomeMessage();
  }, []);

  const typeWelcomeMessage = () => {
    const message = 'Welcome, ' + username + '!'; // Customize your welcome message here
    let i = 0;

    const interval = setInterval(() => {
      if (i <= message.length) {
        setWelcomeMessage(message.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setShowWelcomeMessage(true);
      }
    }, 5); // Adjust typing speed (milliseconds per character)
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: 'black' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            {showWelcomeMessage && (
              <Typography variant="h6" style={{ marginRight: '16px', fontFamily: 'monospace', fontSize: '2em' }}>
                {welcomeMessage}
              </Typography>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {hasCustomAvatar && (
              <Avatar onClick={toggleUserDetails} style={{ cursor: '-moz-grab', marginRight: '8px' }} />
            )}
            <IconButton onClick={handleLogout} style={{ color: 'white' }}>
              <FaSignOutAlt /> {/* Logout icon */}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Grid container spacing={0.01}>
        <Grid item xs={12} md={6}>
          <div className="box">
            <Link to={`/getPropertyDetails/${username}`} style={{ textDecoration: 'none' }}>
              <button id="btn1" className="button">
                My Properties
              </button>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="box">
            <Link to={`/getTransactionDetails/${username}`} style={{ textDecoration: 'none' }}>
              <button id="btn2" className="button">
                View Transaction Details
              </button>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="box">
            <button id="btn3" className="button" onClick={toggleAddProperty}>
              Add Property
            </button>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="box">
            <Link to={`/properties/${username}`} style={{ textDecoration: 'none' }}>
              <button id="btn4" className="button">
                Available Properties
              </button>
            </Link>
          </div>
        </Grid>
      </Grid>

      {/* User Details Dialog */}
      <Transition in={showUserDetails} timeout={800} unmountOnExit mountOnEnter>
        {(state) => (
          <Dialog
            open={showUserDetails}
            onClose={toggleUserDetails}
            maxWidth="sm"
            fullWidth
            TransitionComponent={TransitionComponent}
            keepMounted
            PaperProps={{
              style: {
                backgroundColor: '#CEEBE3'
              },
            }}
          >
            <DialogContent>
              <IconButton
                edge="end"
                color="inherit"
                onClick={toggleUserDetails}
                aria-label="close"
                sx={{
                  position: 'absolute',
                  top: '8px',
                  right: '20px',
                  opacity: state === 'entered' ? 1 : 0,
                  transition: 'opacity 300ms',
                }}
              >
              </IconButton>
              <GetUserDetails username={username} onClose={toggleUserDetails} />
            </DialogContent>
          </Dialog>
        )}
      </Transition>

      {/* Add Property Dialog */}
      <Dialog open={showAddProperty} onClose={toggleAddProperty} maxWidth="sm" fullWidth>
        <DialogContent>
          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleAddProperty}
            aria-label="close"
            sx={{ position: 'absolute', top: '8px', right: '20px' }}
          >
            <CloseIcon />
          </IconButton>
          <PutPropertyDetails username={username} onClose={toggleAddProperty} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
