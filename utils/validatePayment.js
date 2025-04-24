function validatePaymentInput(body) {
    const { name, cardNumber, amount } = body;
  
    if (!name || !cardNumber || !amount) {
      return 'Missing required fields: name, cardNumber, or amount';
    }
  
    if (typeof name !== 'string' || name.trim().length < 2) {
      return 'Invalid name';
    }
  
    if (!/^\d{8,16}$/.test(cardNumber)) {
      return 'Invalid card number: must be 8–16 digits';
    }
  
    if (isNaN(amount) || Number(amount) <= 0) {
      return 'Invalid amount';
    }
  
    return null; // Valid input
  }
  
  module.exports = validatePaymentInput;
  