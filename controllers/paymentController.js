const Payment = require('../models/Payment');
const BusPass = require('../models/BusPass');
const sendMail = require('../utils/sendMail'); // optional: only if you're sending mail

// Create new payment
/*const createPayment = async (req, res) => {
  try {
    const { passId, amount, paymentMethod } = req.body;

    // 1. Find the associated bus pass
    const busPass = await BusPass.findById(passId);
    if (!busPass) return res.status(404).json({ message: 'Bus pass not found' });

    // 2. Update the bus pass payment status
    busPass.paymentStatus = 'paid';
    await busPass.save();

    // 3. Store payment record in Payment collection
    const payment = new Payment({
      passId,
      amount,
      method: paymentMethod,
      status: 'paid',
    });

    await payment.save();

    // 4. Respond with success
    res.status(200).json({ message: 'Payment successful', payment });

  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ message: 'Payment failed' });
  }
};*/
const createPayment = async (req, res) => {
  const { passId } = req.body;
  const userId = req.user._id;

  const pass = await BusPass.findById(passId);
  if (!pass || String(pass.user) !== String(userId)) {
    return res.status(403).json({ message: "Access denied" });
  }

  if (pass.status !== "approved") {
    return res.status(400).json({ message: "Pass is not approved yet" });
  }

  // Proceed to mock/real payment
  pass.paymentStatus = "paid";
  await pass.save();

  res.status(200).json({ message: "Payment successful" });
};



module.exports = {
  createPayment,
};
