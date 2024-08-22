import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../background2.css';

function PropertiesPage() {
  const { username } = useParams();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchPropertyData();
  }, []);

  const fetchPropertyData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/queryForProperties/${username}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching property data:', error);
    }
  };

  const putTransactionDetails = async (property) => {
    try {
      const data = {
        userName: username,
        propertyId: property.propertyId,
      };

      // Send a single PUT request with both userId and propertyId in the request body
      const response = await axios.put(`http://localhost:8080/addTransaction/${username}/${property.propertyId}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Assuming the transaction was successful, you can update the UI or take further actions
      console.log('Transaction successful');

      // After the transaction, you may want to refresh the property data
      fetchPropertyData();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const buyProperty = async (propertyId) => {
    try {
      const params = {
        propertyId: propertyId, // Pass the propertyId as a query parameter
      };
  
      // Send a PUT request to buyProperty with propertyId as a query parameter
      const response = await axios.put(`http://localhost:8080/buyProperty/${username}`, null, {
        params: params, // Include the query parameters here
      });
  
      // After the transaction, you may want to refresh the property data
      fetchPropertyData();
    } catch (error) {
      console.error('Error buying property:', error);
    }
  };

  return (
    <div id="properties-container" className="background2">
      <h1 className="head">Properties</h1>
      {properties.length === 0 ? (
        <p className="fontcon">No properties to buy</p>
      ) : (
        properties.map((property) => (
          <div key={property.propertyId} className="property">
            <div className="property-details">
              <p>
                <span className="field-name">Property ID:</span> {property.propertyId}
              </p>
              <p>
                <span className="field-name">Property Name:</span> {property.propertyName}
              </p>
              <p>
                <span className="field-name">Location:</span> {property.location}
              </p>
              <p>
                <span className="field-name">Price:</span> ${property.price}
              </p>
            </div>
            <button onClick={() => {putTransactionDetails(property); buyProperty(property.propertyId);}}>Buy</button>
          </div>
        ))
      )}
    </div>
  );
}

export default PropertiesPage;
