import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PutPropertyDetails() {
  const { username } = useParams();

  const [user, setUser] = useState({
    username: username,
    pm: [],
  });

  const [property, setProperty] = useState({
    propertyName: '',
    location: '',
    price: '',
  });

  const handleSubmit = async (e) => {
    // e.preventDefault();
  
    if (!property.propertyName) {
      alert('Property Name is required');
      return; // Prevent form submission
    }
  
    if (!property.location) {
      alert('Location is required');
      return; // Prevent form submission
    }
  
    if (!property.price) {
      alert('Price is required');
      return; // Prevent form submission
    }
  
    // Create a new property object
    const newProperty = {
      propertyName: property.propertyName,
      location: property.location,
      price: property.price,
    };
  
    // Add the new property to the user's pm array
    const updatedUser = {
      ...user,
      pm: [...user.pm, newProperty],
    };
  
    try {
      const response = await axios.put(
        `http://localhost:8080/addProperty/${username}`,
        updatedUser, // Send the updated user object with the new property
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Property added successfully');
        // You can also redirect the user or perform any other action here.
      } else {
        console.error('Failed to add property');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (

    <div style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <h2 className="head">Add Your Property</h2>
        <input
          class="inputfield"
          type="text"
          placeholder="Property Name"
          value={property.propertyName}
          onChange={(e) =>
            setProperty({ ...property, propertyName: e.target.value })
          }
          style={{fontSize:"0.9em"}}
        />
        &nbsp;&nbsp;
        <input
          class="inputfield"
          type="text"
          placeholder="Location"
          value={property.location}
          onChange={(e) =>
            setProperty({ ...property, location: e.target.value })
          }
          style={{fontSize:"0.9em"}}
        />
        &nbsp;&nbsp;
        <input
          class="inputfield"
          type="number"
          placeholder="Price"
          value={property.price}
          onChange={(e) =>
            setProperty({ ...property, price: parseFloat(e.target.value) })
          }
          style={{fontSize:"0.9em"}}
        />
        <br></br>
        <br></br>
        <button className="inbtn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default PutPropertyDetails;
