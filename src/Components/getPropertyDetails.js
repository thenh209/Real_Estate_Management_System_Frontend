import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
import Dialog from '@mui/material/Dialog'; // Import the Dialog component
import DialogContent from '@mui/material/DialogContent'; // Import the DialogContent component
import Button from '@mui/material/Button'; // Import the Button component
import PutPropertyDetails from './putPropertyDetails'; // Import the PutPropertyDetails component


function GetPropertyDetails() {
  const { username } = useParams();
  const [properties, setProperties] = useState([]);
  const [showPutPropertyDialog, setShowPutPropertyDialog] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, [username]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/queryForProperty/${username}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      // Send a DELETE request to your API to delete the property by propertyId
      const response = await axios.delete(`http://localhost:8080/deleteProperty/${propertyId}`);

      if (response.status === 200) {
        // Property deleted successfully, refresh the property list
        fetchProperties();
        console.log('Property deleted successfully.');
      } else {
        console.error('Error deleting property:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleShowPutPropertyDialog = () => {
    setShowPutPropertyDialog(true);
  };

  const handleClosePutPropertyDialog = () => {
    setShowPutPropertyDialog(false);
  };

  return (
    <div id="property-details-container" className="background2">
      <h1 className="head">Property List</h1>
      {properties.length === 0 ? (
        <div>
          <p className="fontcon">You have no properties</p>
          <Button onClick={handleShowPutPropertyDialog} style={{fontSize:"1em",backgroundColor:"ActiveCaption",color:"white",fontFamily:"cursive"}}>Add Property</Button>
        </div>
      ) : (
        <ul className="property-list">
          {properties.map((property) => (
            <li key={property.propertyId} className="property-item">
              <div>
                <strong>Property ID:</strong> {property.propertyId}<br />
                <strong>Property Name:</strong> {property.propertyName}<br />
                <strong>Location:</strong> {property.location}<br />
                <strong>Price: $</strong> {property.price}<br />
              </div>
              <button onClick={() => handleDeleteProperty(property.propertyId)}>
                <DeleteIcon style={{ color: "red" }} /> {/* Delete icon/button */}
              </button>
              <hr className="property-divider" />
            </li>
          ))}
        </ul>
      )}

      {/* Dialog for Add Property */}
      <Dialog open={showPutPropertyDialog} onClose={handleClosePutPropertyDialog}>
        <DialogContent>
          <PutPropertyDetails onClose={handleClosePutPropertyDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GetPropertyDetails;
