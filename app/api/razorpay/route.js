let Razorpay;

try {
  Razorpay = require('razorpay');
} catch (error) {
  console.warn('Razorpay module not installed. Install with: npm install razorpay');
}

let razorpay = null;

if (Razorpay && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export async function POST(request) {
  try {
    if (!razorpay) {
      return Response.json(
        { success: false, error: 'Razorpay not configured. Please install razorpay package and set environment variables.' },
        { status: 500 }
      );
    }

    const { amount, currency = 'INR', receipt } = await request.json();

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return Response.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
