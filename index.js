const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const fakePayments = [];

// POST /pay - simulate a payment
app.post('/pay', (req, res) => {
  const { name, cardNumber, amount } = req.body;

  if (!name || !cardNumber || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const payment = {
    id: fakePayments.length + 1,
    name,
    cardNumber: '**** **** **** ' + cardNumber.slice(-4),
    amount,
    timestamp: new Date(),
  };

  fakePayments.push(payment);
  res.status(201).json({ message: 'Payment processed (fake)', payment });
});

// GET /payments - list all fake payments
app.get('/payments', (req, res) => {
  res.json(fakePayments);
});

app.listen(PORT, () => {
  console.log(`Fake Payments API running at http://localhost:${PORT}`);
});
