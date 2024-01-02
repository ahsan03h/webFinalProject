// confirmationModel.js

const mongoose = require('mongoose');

const confirmationSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  numberOfGuests: Number,
  date: String,
  timeOfDay: String,
  selectedDishes: [String],
  totalCost: Number,
  hotelName: String,
});

const ConfirmationModel = mongoose.model('Confirmation', confirmationSchema);

module.exports = ConfirmationModel;
