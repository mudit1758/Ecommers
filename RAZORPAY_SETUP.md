# Razorpay Payment Integration Guide

## Setup Instructions

### 1. Get Razorpay API Keys

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Go to Settings → API Keys
3. Copy your:
   - **Key ID** (public key)
   - **Key Secret** (private key)

### 2. Update Environment Variables

Update `.env.local` with your Razorpay credentials:

```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
```

### 3. Install Dependencies

```bash
npm install razorpay
```

### 4. Features Added

#### Cart Page (`app/cart/page.jsx`)
- View all cart items with product images
- Adjust quantities (increase/decrease)
- Remove items from cart
- View order summary with subtotal, shipping, and tax
- **Buy Now with Razorpay** button

#### Payment API (`app/api/razorpay/route.js`)
- Creates Razorpay orders
- Handles amount calculation
- Returns order details for frontend

#### Payment Success Page (`app/payment-success/page.jsx`)
- Confirms successful payment
- Shows order number
- Provides next steps

## How It Works

1. User adds products to cart
2. Clicks "Buy Now with Razorpay" on cart page
3. Backend creates a Razorpay order
4. Razorpay checkout modal opens
5. User enters payment details and completes payment
6. On success:
   - Cart is cleared
   - User redirected to home page
   - (Optional) Show payment success page
7. On cancel:
   - Error message displayed
   - Cart items remain

## Testing

### Test Cards (Razorpay Test Mode)

For amount < 50000:
- Card: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits

For amount ≥ 50000 (requires OTP):
- Card: 4111 1111 1111 1112
- Expiry: Any future date
- CVV: Any 3 digits

### Test UPI
Account: success@razorpay
Password: Razorpay@123

## Files Added/Modified

```
app/
  ├── api/
  │   └── razorpay/
  │       └── route.js           (NEW - Razorpay API endpoint)
  ├── cart/
  │   └── page.jsx               (NEW - Shopping cart page)
  ├── payment-success/
  │   └── page.jsx               (NEW - Success page)
  └── layout.jsx                 (MODIFIED - Added Razorpay script)

.env.local                        (MODIFIED - Added Razorpay keys)
package.json                      (MODIFIED - Added razorpay dependency)
```

## Payment Flow Diagram

```
User adds products to cart
            ↓
Navigates to /cart
            ↓
Reviews cart items and total
            ↓
Clicks "Buy Now with Razorpay"
            ↓
Backend creates order via /api/razorpay
            ↓
Razorpay checkout modal opens
            ↓
User enters payment details
            ↓
Payment processed
            ↓
Success → Cart cleared → Redirect to home
Failure → Show error → Keep cart items
```

## Customization

### Change Button Text
Edit `app/cart/page.jsx` line around 220

### Modify Tax Calculation
Edit `app/cart/page.jsx` line around 130 (default is 18%)

### Theme Color
Edit `app/cart/page.jsx` line around 94 (Razorpay theme)

### Order Receipt Prefix
Edit `app/api/razorpay/route.js` line around 16

## Security Notes

⚠️ **Important:**
- Never expose `RAZORPAY_KEY_SECRET` in frontend code
- Keep it only in `.env.local` and server-side code
- Use `NEXT_PUBLIC_RAZORPAY_KEY_ID` only for public key
- Always validate payments on the backend in production

## Troubleshooting

### "Razorpay is not defined"
- Ensure Razorpay script is loaded in layout
- Check browser console for script loading errors

### Payment modal not opening
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set correctly
- Check browser console for errors

### "Order creation failed"
- Verify environment variables are set
- Check backend logs for errors
- Ensure MongoDB connection is active

### Amount mismatch
- Verify amount calculation: total * 1.18 (includes tax)
- Razorpay expects amount in paise (₹ × 100)
