const axios = require('axios');

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const base = 'https://api-m.sandbox.paypal.com'; // Sandbox base URL

// Get OAuth access token
async function getAccessToken() {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await axios.post(`${base}/v1/oauth2/token`, 'grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return response.data.access_token;
}

// Create a PayPal order
async function createOrder(amount) {
  const token = await getAccessToken();

  const response = await axios.post(`${base}/v2/checkout/orders`, {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: amount
        }
      }
    ]
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data;
}

module.exports = { createOrder };
