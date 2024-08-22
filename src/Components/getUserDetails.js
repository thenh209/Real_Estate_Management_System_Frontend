import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUser from './updateUser';

export default function GetUserDetails({ username, onClose }) {
  const [userData, setUserData] = useState(null);
  const [showUpdateUser, setShowUpdateUser] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [username]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getUser/${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEditClick = () => {
    setShowUpdateUser(true);
  };

  return (
    <div className="user-details-container">
      {!showUpdateUser && (
        <div className="user-details-dialog">
          <h1 style={{fontFamily:"cursive",fontSize:"2em"}}>User Details</h1>
          {userData ? (
           <table>
           <tbody>
             <tr>
               <td class="signtext" style={{ textAlign: 'left',fontWeight:"bolder"}}>User Name:</td>
               <td class="signtext" style={{ textAlign: 'left' }}>{userData.userName}</td>
             </tr>
             <tr>
               <td class="signtext" style={{ textAlign: 'left',fontWeight:"bolder"}}>Email:</td>
               <td class="signtext" style={{ textAlign: 'left' }}>{userData.email}</td>
             </tr>
             <tr>
               <td class="signtext" style={{ textAlign: 'left',fontWeight:"bolder"}}>Age:</td>
               <td class="signtext" style={{ textAlign: 'left' }}>{userData.age}</td>
             </tr>
             <tr>
               <td class="signtext" style={{ textAlign: 'left',fontWeight:"bolder"}}>Mobile Number:</td>
               <td class="signtext" style={{ textAlign: 'left' }}>{userData.mobileNumber}</td>
             </tr>
           </tbody>
           <br></br>
         </table>                
          ) : (
            <p>No user details available</p>
          )}
          <button style={{fontFamily:'monospace'}}className="edit-button" onClick={handleEditClick}>Edit</button>
          <button style={{fontFamily:'monospace'}}className="close-button" onClick={onClose}>Close</button>
        </div>
      )}

      {showUpdateUser && (
        <UpdateUser
          username={username}
          onClose={() => {
            setShowUpdateUser(false);
            fetchUserData();
          }}
        />
      )}
    </div>
  );
}
