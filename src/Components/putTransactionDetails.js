import React, { useState } from 'react';
import axios from 'axios';

function PutTransactionDetails({ userName, propertyId, onUpdate }) {
  const [responseMessage, setResponseMessage] = useState('');

  const updateUserData = async () => {
    try {
      const data = {
        userName: userName, // Use the userName from props
        propertyId: propertyId, // Use the propertyId from props
      };

      // Send a single PUT request with both userId and propertyId in the request body
      const response = await axios.put(`http://localhost:8080/addTransaction/${userName}/${propertyId}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setResponseMessage(`Data Updated: ${JSON.stringify(response.data)}`);
      
      // Call the onUpdate callback to trigger an update in the parent component
      onUpdate();
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>User Profile Update</h1>
      <div>
        <label>User Name:</label>
        <span>{userName}</span> {/* Display the userName from props */}
      </div>
      <div>
        <label>Property ID:</label>
        <span>{propertyId}</span> {/* Display the propertyId from props */}
      </div>
      <button onClick={updateUserData}>Transaction</button>
      <div>
        <p>{responseMessage}</p>
      </div>
    </div>
  );
}

export default PutTransactionDetails;
