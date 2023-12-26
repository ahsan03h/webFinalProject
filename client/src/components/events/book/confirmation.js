import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 

const ConfirmationPage = ({ bookingDetails, hotelName, dishes }) => {
  const [confirmationData, setConfirmationData] = useState([]);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setConfirmationData([
      {
        key: 'Name',
        value: bookingDetails.name,
      },
      {
        key: 'Phone Number',
        value: bookingDetails.phoneNumber,
      },
      {
        key: 'Number of Guests',
        value: bookingDetails.numberOfGuests,
      },
      {
        key: 'Date',
        value: bookingDetails.date,
      },
      {
        key: 'Time of Event',
        value: bookingDetails.timeOfDay,
      },
      {
        key: 'Selected Dishes',
        value: bookingDetails.selectedDishes.join(", "),
      },
      {
        key: 'Total Cost',
        value: calculateTotalCost(),
      },
      {
        key: 'Hotel Name',
        value: hotelName,
      },
    ]);

    // Log confirmationData to the console
    console.log('Confirmation Data:', confirmationData);
  }, [bookingDetails, hotelName, dishes, confirmationData]);

  const calculateTotalCost = () => {
    return bookingDetails.selectedDishes.reduce((total, dish) => {
      const selectedDish = dishes.find((item) => item.name === dish);
      return total + selectedDish.costPerHead * bookingDetails.numberOfGuests;
    }, 0);
  };

  const handleConfirmBooking = () => {
    history.push('/payment');
  };

  return (
    <div>
      <h2>Confirmation Page</h2>
      <div>
        <h3>Booking Details:</h3>
        {confirmationData.map((item) => (
          <p key={item.key}>{item.key}: {item.value}</p>
        ))}
      </div>
      <button onClick={handleConfirmBooking}>Confirm Booking</button>
    </div>
  );
};

export default ConfirmationPage;
