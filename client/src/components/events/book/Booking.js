// BookingPage.js
import React, { useState, useEffect } from "react";
import ConfirmationPage from "./confirmation";
import eventServices from "../../../services/event-services";
import "./Booking.css";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    numberOfGuests: 0,
    selectedDishes: [],
    date: "", // Add date field
    timeOfDay: "day"
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [event, setEvent] = useState({});

  useEffect(() => {
    // Fetch event details when the component mounts
    const eventId = "your_event_id"; // Replace with the actual event ID
    eventServices.details(eventId)
      .then((fetchedEvent) => setEvent(fetchedEvent))
      .catch((error) => console.error("Error fetching event details:", error));
  }, []);

  const dishes = [
    { name: "Chicken Karahi", costPerHead: 400 },
    { name: "Barbeque", costPerHead: 500 },
    { name: "Mutton Karahi", costPerHead: 700 },
    { name: "Biryani", costPerHead: 150 },
    { name: "Swedish", costPerHead: 180 },
    { name: "Tea", costPerHead: 50 },
    { name: "Soup", costPerHead: 100 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (dishName) => {
    const isSelected = formData.selectedDishes.includes(dishName);

    if (isSelected) {
      setFormData({
        ...formData,
        selectedDishes: formData.selectedDishes.filter((dish) => dish !== dishName),
      });
    } else {
      setFormData({
        ...formData,
        selectedDishes: [...formData.selectedDishes, dishName],
      });
    }
  };

  const calculateTotalCost = () => {
    const totalCost = formData.selectedDishes.reduce((total, dish) => {
      const selectedDish = dishes.find((item) => item.name === dish);
      return total + selectedDish.costPerHead * formData.numberOfGuests;
    }, 0);

    return totalCost;
  };

  const handleConfirmBooking = () => {
    // Set showConfirmation to true to render the ConfirmationPage
    setShowConfirmation(true);
  };

 

  // Render ConfirmationPage if showConfirmation is true
  if (showConfirmation) {
    return (
      <ConfirmationPage
        bookingDetails={formData}
        hotelName={window.hotel} 
        dishes={dishes}
      />
    );
  }

  return (
    <div className="BookingPage">
      <h2>Booking Details</h2>
  
      <form>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
  
        <div className="form-group">
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </label>
        </div>
  
        <div className="form-group">
          <label>
            Number of Guests:
            <input
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleInputChange}
            />
          </label>
        </div>
  
        <div className="form-group">
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </label>
        </div>
  
        <div className="form-group">
          <label>
            Time of Event:
            <select
              name="timeOfDay"
              value={formData.timeOfDay}
              onChange={handleInputChange}
            >
              <option value="day">Day</option>
              <option value="night">Night</option>
            </select>
          </label>
        </div>
  
        <h3>Select Dishes:</h3>
        {dishes.map((dish) => (
          <div key={dish.name}>
            <label>
              <input
                type="checkbox"
                name={dish.name}
                checked={formData.selectedDishes.includes(dish.name)}
                onChange={() => handleCheckboxChange(dish.name)}
              />
              {dish.name} - RS{dish.costPerHead} per head
            </label>
          </div>
        ))}
      </form>
      <div>
        <h3>Total Cost: RS{calculateTotalCost()}</h3>
      </div>
      <button className="confirm-button" onClick={handleConfirmBooking}>Book Hotel</button>
    </div>
  );
};

export default Booking;
