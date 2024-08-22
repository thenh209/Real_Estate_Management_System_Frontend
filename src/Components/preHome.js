import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import background from '../assets/background.jpg';
import Sign from './sign';
import companyLogo from '../assets/logo.png';

export default function PreHome() {
  const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [showAppBar, setShowAppBar] = useState(true);

  const handleAboutMouseEnter = () => {
    setIsAboutHovered(true);
  };

  const handleAboutMouseLeave = () => {
    setIsAboutHovered(false);
  };

  const handleHideAppBar = () => {
    setShowAppBar(false); // Hide the AppBar
  };

  const handleShowAppBar = () => {
    setShowAppBar(true); // Show the AppBar
  };

  return (
    <div style={backgroundImageStyle} className="prehome-container">
    <a href="#" onClick={() => window.location.reload()} style={{ textDecoration: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ width: '80px', height: '80px', overflow: 'hidden', borderRadius: '50%', marginRight: '10px'}}>
          <img id="logo"src={companyLogo} alt="Company Logo" style={{ width: '100%', height: 'auto' }} />
        </div>
        <h1 id="name"style={{ color:'whitesmoke', fontSize: '6em'}}>YES state</h1>
      </div>
    </a>

      {showAppBar && (
        <AppBar style={{ backgroundColor: 'black', color: 'white', zIndex: 1000 }}>
          <Toolbar>
            <div style={{ flexGrow: 0.98 }}></div>
            <Button
              color="inherit"
              className="about-button"
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
              style={{ fontFamily: 'cursive', fontSize: '1.5em' }}
            >
              ABOUT
            </Button>
          </Toolbar>
        </AppBar>
      )}
      <Sign hideAppBar={handleHideAppBar} showAppBar={handleShowAppBar} />
      {isAboutHovered && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <h2 id="about">About Us</h2>
              <div id="about_content">
              <p>
            Welcome to our Real Estate Management platform, where we strive to simplify and enhance your real estate experience. Our mission is to provide a comprehensive solution for property owners, buyers, and renters alike, offering a seamless and efficient way to navigate the world of real estate.
          </p>

          <p>
            <strong>Our Vision</strong>
            <br />
            We envision a future where real estate transactions are effortless, transparent, and accessible to everyone. Through innovation and technology, we aim to revolutionize the way properties are managed, bought, and sold.
          </p>

          <p>
            <strong>Who We Are</strong>
            <br />
            At Real Estate Management, we are a dedicated team of professionals passionate about real estate. Our experts have years of experience in the industry and are committed to delivering exceptional services and solutions to our clients.
          </p>

          <p>
            <strong>What We Offer</strong>
            <br />
            <strong>Property Management:</strong> Our platform simplifies property management, making it easy for property owners to oversee their assets, track financials, and connect with tenants.
            <br />
            <strong>Property Listings:</strong> Find your dream home or investment property with ease through our extensive listings. We provide detailed information and images to help you make informed decisions.
            <br />
            <strong>Tenant Services:</strong> Renters can explore available properties, submit applications, and communicate with property managers, streamlining the rental process.
            <br />
            <strong>Real Estate Insights:</strong> Stay informed with the latest trends, market updates, and expert advice on real estate investments and management.
          </p>

          <p>
            Thank you for choosing Real Estate Management, where your real estate goals become a reality!
          </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
