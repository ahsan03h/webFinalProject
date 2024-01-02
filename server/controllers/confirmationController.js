// confirmationController.js

const ConfirmationModel = require('./confirmationModel');

const saveConfirmation = async (req, res) => {
  try {
    const confirmation = new ConfirmationModel({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      numberOfGuests: req.body.numberOfGuests,
      date: req.body.date,
      timeOfDay: req.body.timeOfDay,
      selectedDishes: req.body.selectedDishes,
      totalCost: req.body.totalCost,
      hotelName: req.body.hotelName,
    });

    const savedConfirmation = await confirmation.save();
    res.json(savedConfirmation);
  } catch (error) {
    res.status(500).json({ error: 'Error saving confirmation data' });
  }
};

module.exports = { saveConfirmation };
