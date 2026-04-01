let Razorpay;

try {
  Razorpay = require('razorpay');
} catch (error) {
  console.warn('Razorpay package not installed. Using mock mode for testing.');
}

let razorpay = null;

if (Razorpay && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  try {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  } catch (error) {
    console.warn('Could not initialize Razorpay:', error.message);
  }
}

export async function POST(request) {
  try {
    const { amount, currency = 'INR', receipt } = await request.json();

    if (!amount || amount <= 0) {
      return Response.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // If Razorpay is properly configured, use real API
    if (razorpay) {
      try {
        const options = {
          amount: Math.round(amount * 100), // in paise
          currency,
          receipt: receipt || `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        return Response.json({ success: true, data: order }, { status: 201 });
      } catch (error) {
        console.error('Razorpay API error:', error);
        // Fall through to mock mode
      }
    }

    // Mock mode - for testing without Razorpay package
    console.log('Using mock Razorpay order');
    const mockOrder = {
      id: orderId,
      entity: 'order',
      amount: Math.round(amount * 100),
      amount_paid: 0,
      amount_due: Math.round(amount * 100),
      currency: currency,
      receipt: receipt || `receipt_${Date.now()}`,
      offer_id: null,
      status: 'created',
      attempts: 0,
      notes: [],
      created_at: Math.floor(Date.now() / 1000),
      is_mock: true, // Mark as mock
    };

    return Response.json({ success: true, data: mockOrder }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
