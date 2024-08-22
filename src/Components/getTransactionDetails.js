import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function GetTransactionDetails() {
  const { username } = useParams();
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactionDetails();
  }, [username]);

  const fetchTransactionDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/queryForHistory/${username}`);
      setTransactionDetails(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTransactionDetails([]);
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div id="transaction-details-container" className="background2">
      <h1 className="head">Transaction Details</h1>
      {transactionDetails.length === 0 ? (
        <p  className="fontcon">No transactions found</p>
      ) : (
        <ul className="transaction-list">
          {transactionDetails.map((transaction) => (
            <li key={transaction.paymentId} className="transaction-item">
              <div>
                <strong>Payment ID:</strong> {transaction.paymentId}<br />
                <strong>Property ID:</strong> {transaction.propertyId}<br />
                <strong>Property Name:</strong> {transaction.propertyName}<br />
                <strong>Price: $ </strong> {transaction.price}<br />
              </div>
              <hr className="transaction-divider" />
            </li>
          ))}
        </ul>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default GetTransactionDetails;
