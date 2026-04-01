# Razorpay Integration - Complete Implementation Guide

## 🎯 Features Added

### 1. **Shopping Cart Page** (`app/cart/page.jsx`)
- ✅ View all items in cart
- ✅ Adjust quantities (add/remove)
- ✅ Remove individual items
- ✅ Clear entire cart
- ✅ Order summary with calculations
- ✅ Tax calculation (18%)
- ✅ Shipping cost (FREE)
- ✅ **Buy Now with Razorpay** button

### 2. **Razorpay Payment Integration**
- ✅ Create orders via API (`app/api/razorpay/route.js`)
- ✅ Handle payment processing
- ✅ Payment verification (`app/api/verify-payment/route.js`)
- ✅ Order history tracking (`models/Order.js`)

### 3. **Product Card Enhancements**
- ✅ "Add to Cart" button (blue)
- ✅ "Buy Now" button (orange) - Direct checkout
- ✅ Quick purchase option

### 4. **Success/Payment Pages**
- ✅ Payment success confirmation page
- ✅ Order number generation
- ✅ Next steps information

---

## 🔧 Installation & Setup

### Step 1: Install Razorpay Package
```bash
npm install razorpay
```

### Step 2: Get Razorpay Credentials
1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up / Log in
3. Go to **Settings → API Keys**
4. Copy your **Key ID** and **Key Secret**

### Step 3: Update Environment Variables
Edit `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
NEXT_PUBLIC_API_URL=http://localhost:3000
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

### Step 4: Start the Application
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📁 Files Structure

```
NEW FILES CREATED:
├── app/
│   ├── api/
│   │   ├── razorpay/
│   │   │   └── route.js              ← Create Razorpay orders
│   │   └── verify-payment/
│   │       └── route.js              ← Verify payments
│   ├── cart/
│   │   └── page.jsx                  ← Shopping cart UI
│   └── payment-success/
│       └── page.jsx                  ← Success page
│
├── models/
│   └── Order.js                      ← Order schema
│
└── RAZORPAY_SETUP.md                ← Setup guide

MODIFIED FILES:
├── components/ProductCard.jsx        ← Added "Buy Now" button
├── package.json                      ← Added razorpay dependency
├── .env.local                        ← Added API keys
└── app/layout.jsx                    ← Added Razorpay script
```

---

## 🛒 Payment Flow

```
1. User browses products on homepage
           ↓
2. User adds items to cart 
           ↓
3. Navigates to /cart
           ↓
4. Reviews order summary
   - Subtotal
   - Shipping (FREE)
   - Tax (18%)
   - Final Total
           ↓
5. Clicks "Buy Now with Razorpay"
           ↓
6. /api/razorpay endpoint creates order
           ↓
7. Razorpay checkout modal opens
           ↓
8. User selects payment method:
   - Credit/Debit Card
   - UPI
   - Wallet
   - Bank Transfer
           ↓
9. Payment processed
           ↓
   ✅ SUCCESS                    ❌ FAILED
   - Order created              - Error shown
   - Cart cleared               - Items remain
   - Redirect home              - Retry allowed
```

---

## 💳 Test Payment Cards

### For orders < ₹50,000
```
Card Number: 4111 1111 1111 1111
Expiry: Any future date (e.g., 12/25)
CVV: Any 3 digits (e.g., 111)
Name: Any text
```

### For orders ≥ ₹50,000 (requires OTP)
```
Card Number: 4111 1111 1111 1112
Expiry: Any future date
CVV: Any 3 digits
OTP: 111111 (when prompted)
```

### UPI
```
UPI ID: success@razorpay
Password: Razorpay@123
```

### Wallet
```
Any test card details above
```

---

## 🔐 Security Implementation

### Environment Variables
```env
# Public (safe to expose)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxx

# Secret (NEVER expose)
RAZORPAY_KEY_SECRET=xxxx (only in backend)
```

### Payment Verification
The `/api/verify-payment` endpoint verifies signatures to ensure payments are legitimate:

```javascript
// Verify integrity
const signature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
  .update(razorpay_order_id + '|' + razorpay_payment_id)
  .digest('hex');

const isValid = signature === razorpay_signature;
```

---

## 📊 API Endpoints

### 1. Create Order
**POST** `/api/razorpay`

Request:
```json
{
  "amount": 5999,
  "currency": "INR",
  "receipt": "order_12345"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "order_1234567890",
    "entity": "order",
    "amount": 599900,
    "amount_paid": 0,
    "amount_due": 599900,
    "currency": "INR",
    "receipt": "order_12345",
    "status": "created",
    "attempts": 0,
    "notes": [],
    "created_at": 1234567890
  }
}
```

### 2. Verify Payment
**POST** `/api/verify-payment`

Request:
```json
{
  "razorpay_order_id": "order_1234567890",
  "razorpay_payment_id": "pay_1234567890",
  "razorpay_signature": "signature_hash"
}
```

Response:
```json
{
  "success": true,
  "message": "Payment verified successfully"
}
```

### 3. Fetch Products
**GET** `/api/products`

Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Product Name",
      "price": 4999,
      "rating": 4.5,
      ...
    }
  ]
}
```

---

## 🎨 UI Components

### Cart Page Features
```
┌─────────────────────────────────────┐
│  ShopHub      [Search]      [Cart]  │  ← Navbar
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  Shopping Cart                      │
├─────────────────────────────────────┤
│  [Product 1]  Qty: [- 1 +]  Price   │
│  [Product 2]  Qty: [- 2 +]  Price   │
│  [Product 3]  Qty: [- 1 +]  Price   │
└─────────────────────────────────────┘
        ┌──────────────────┐
        │ Order Summary    │
        ├──────────────────┤
        │ Subtotal: ₹5999  │
        │ Shipping: FREE   │
        │ Tax (18%): ₹1080 │
        ├──────────────────┤
        │ Total: ₹7079    │
        │ [Buy Now Razorpay] │
        └──────────────────┘
```

---

## 🐛 Troubleshooting

### Issue: "Razorpay is not defined"
**Solution:**
- Check that Razorpay script is loaded in `app/layout.jsx`
- Clear browser cache
- Check browser console for script errors

### Issue: "Order creation failed"
**Solution:**
- Verify API keys in `.env.local`
- Ensure MongoDB is running
- Check backend logs

### Issue: Payment modal doesn't open
**Solution:**
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
- Check that amount is valid (> 0)
- Ensure script tag is in document head

### Issue: "Invalid amount"
**Solution:**
- Amount should be in INR (₹)
- Minimum amount is ₹1
- Razorpay converts to paise automatically (₹1 = 100 paise)

### Issue: "Cart not clearing after payment"
**Solution:**
- Check that payment success callback runs
- Verify `clearCart()` is called
- Check browser console for errors

---

## 📈 Database Schema

### Order Model
```javascript
{
  razorpayOrderId: "order_xxx",
  razorpayPaymentId: "pay_xxx",
  razorpaySignature: "sig_xxx",
  items: [
    {
      productId: "...",
      title: "...",
      price: 4999,
      quantity: 1,
      image: "..."
    }
  ],
  totalAmount: 5999,
  status: "completed",           // pending | completed | failed | cancelled
  customerEmail: "user@email.com",
  customerPhone: "+91999999999",
  shippingAddress: "...",
  createdAt: "2024-04-01T10:30:00Z",
  completedAt: "2024-04-01T10:35:00Z"
}
```

---

## 🚀 Production Checklist

- [ ] Update API keys to production keys
- [ ] Test with real payment methods
- [ ] Implement order confirmation emails
- [ ] Set up order tracking system
- [ ] Add refund handling
- [ ] Implement webhook for async payment updates
- [ ] Add CORS security
- [ ] Enable HTTPS
- [ ] Set up error logging
- [ ] Test with various payment methods
- [ ] Add payment receipt generation
- [ ] Implement order history for users

---

## 📚 Useful Links

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Test Cards](https://razorpay.com/docs/payments/payment-gateway/test-card-details/)
- [API Reference](https://razorpay.com/docs/api/)
- [Dashboard](https://dashboard.razorpay.com)

---

## 💬 Support

For issues or questions:
1. Check browser console for errors
2. Check backend logs
3. Visit [Razorpay Support](https://support.razorpay.com)
4. Check API status at https://status.razorpay.com
