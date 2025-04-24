const axios = require('axios');

const clientId = 'YOUR_SANDBOX_CLIENT_ID';
const clientSecret = 'YOUR_SANDBOX_SECRET';
const base = 'https://api-m.sandbox.paypal.com'; // Live: https://api-m.paypal.com

// Get OAuth2 access token
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
async function createOrder() {
  const accessToken = await getAccessToken();

  const response = await axios.post(`${base}/v2/checkout/orders`, {
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '20.00'
      }
    }]
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data;
}

module.exports = { createOrder };
