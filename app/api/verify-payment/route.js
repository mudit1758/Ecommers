import crypto from 'crypto';

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    // Generate signature to verify payment
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      return Response.json(
        { success: true, message: 'Payment verified successfully' },
        { status: 200 }
      );
    } else {
      return Response.json(
        { success: false, message: 'Invalid signature' },
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
