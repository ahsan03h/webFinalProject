// PaymentPage.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js'
import { useHistory } from 'react-router-dom';

const stripePromise = loadStripe("pk_test_51ORYRtBVjrVa3wcOtsHdAOi9Nu63fGm0PbjfZypGMRiNZRFF6GX46jIz8OASPqFaIgEPBN5CqBYmKA1ri73ZPqjS00sM4xuZOx");

const CheckoutForm = ({ onSuccess, onError }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const stripe = await stripePromise;

    if (!stripe) {
      return;
    }

    try {
      // Use the Stripe Test Card details for a successful payment
      // Use test card details directly
  const result = {
    paymentIntent: {
      id: 'pi_1', 
      status: 'succeeded'
    }
  };

      if (result.error) {
        console.error(result.error.message);
        onError();
      } else {
        // Payment succeeded
        console.log('Payment succeeded!', result.paymentIntent);
        onSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      onError();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
};

const PaymentPage = () => {

  const history = useHistory();

  const handlePaymentSuccess = () => {
    // Handle the payment success logic
    console.log('Payment successful!');
    const isConfirmed = window.confirm('Booking is confirmed. Click OK to go to the homepage.');
    // Redirect to the homepage with a confirmation message
    history.push('/', { message: 'Booking is confirmed' });
  };

  const handlePaymentError = () => {
    // Handle the payment error logic
    console.error('Payment unsuccessful. Please try again.');
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
