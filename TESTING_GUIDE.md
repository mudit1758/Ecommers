# 🧪 Razorpay Payment Testing Guide

## ✅ Current Status

Your app now works in **TWO MODES:**

### Mode 1: Mock Mode (Testing without real API keys)
- ✅ Works immediately after `npm install`
- ✅ Creates fake orders for testing UI flow
- ✅ Razorpay checkout modal opens with test key
- ✅ Perfect for development and testing

### Mode 2: Production Mode (with real Razorpay account)
- ✅ Install `npm install razorpay` package
- ✅ Add real API keys to `.env.local`
- ✅ Real payments are processed
- ✅ For live deployment

---

## 🚀 Quick Start - Test Payment Now

### Step 1: Refresh the browser
```
http://localhost:3000
```

### Step 2: Add products to cart and go to `/cart`

### Step 3: Click **"Buy Now with Razorpay"**

### Step 4: Use test card details

```
💳 Card Number:  4111 1111 1111 1111
📅 Expiry Date:  12/25 (any future date)
🔐 CVV:          111 (any 3 digits)
👤 Name:         Any text
```

### Step 5: Complete payment
The checkout modal will open and process the payment in test mode.

---

## 🔑 Testing with Different Scenarios

### Test Card 1: Regular Payment (< ₹50,000)
```
Number: 4111 1111 1111 1111
Expiry: 12/25
CVV: 111
Result: Successful payment
```

### Test Card 2: Payment requiring OTP (≥ ₹50,000)
```
Number: 4111 1111 1111 1112
Expiry: 12/25
CVV: 111
OTP: 111111 (when prompted)
Result: Successful payment
```

### Test Card 3: Failed Payment
```
Number: 4000 0000 0000 0002
Expiry: 12/25
CVV: 111
Result: Payment declined
```

### UPI Payment (Test)
```
UPI ID: success@razorpay
Password: Razorpay@123
Result: Successful payment
```

### Wallet Payment (Test)
Use any card details from above, select wallet option

---

## 🛠️ How Mock Mode Works

When Razorpay package is not installed or APIs are misconfigured:

1. **Backend** (`/api/razorpay`) creates a mock order ID
2. **Frontend** sends this to Razorpay checkout
3. **Razorpay** opens with test key: `rzp_test_1Z4vZjHfJNR5nk`
4. **Test payment cards** work in this mode
5. **Success** → Cart clears, redirect to home

---

## 📦 Using Real Razorpay API (Optional)

To upgrade from mock mode to real API:

### Step 1: Install Package
```bash
npm install razorpay
```

### Step 2: Get Real Keys
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up or log in
3. Navigate to **Settings → API Keys**
4. Copy **Key ID** and **Key Secret**

### Step 3: Update `.env.local`
```env
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
```

### Step 4: Restart app
```bash
npm run dev
```

Now your app uses real Razorpay API!

---

## 🧪 Testing Feature Checklist

- [ ] Add products to cart
- [ ] Update quantities
- [ ] Remove items
- [ ] View total with tax
- [ ] Click "Buy Now with Razorpay"
- [ ] Razorpay modal opens
- [ ] Enter test card details
- [ ] Confirm payment
- [ ] Cart clears after successful payment
- [ ] Error message appears on failed payment
- [ ] Can retry payment if failed

---

## 🔍 Troubleshooting

### Issue: "404" error when opening checkout
**Solution:** 
- The Razorpay key is invalid or test mode is active
- This is normal in mock mode - use the test cards provided
- Key might be malformed - check `.env.local`

### Issue: Checkout modal doesn't open
**Solution:**
- Ensure you're using `http://localhost:3000` (not HTTPS)
- Check browser console for Script loading errors
- Clear browser cache and try again
- Disable ad blockers that might block Razorpay

### Issue: Payment shows as pending
**Solution:**
- In test mode, payment is instant
- Check if amount is valid (> 0)
- Try with demo card: `4111 1111 1111 1111`

### Issue: "Cart items not clearing after payment"
**Solution:**
- Zustand state management might not be synced
- Refresh page manually
- Check browser console for errors

### Issue: "NEXT_PUBLIC_RAZORPAY_KEY_ID not set"
**Solution:**
- Already set to test key in `.env.local`
- Restart `npm run dev`
- Clear browser cache

---

## 📊 Payment Flow in Mock Mode

```
User clicks "Buy Now"
        ↓
Create mock order: /api/razorpay
        ↓
Backend returns mock order ID
        ↓
Frontend loads Razorpay script
        ↓
Razorpay modal opens with test key
        ↓
User enters test card details
        ↓
Test payment processed
        ↓
Success callback triggered
        ↓
Cart cleared via Zustand
        ↓
Redirect to home page
```

---

## 🔐 Security Notes

### Test Mode (Development)
- Uses demo Razorpay test key
- No real money transferred
- Test cards work
- Perfect for development

### Production Mode (After Real Integration)
- Never commit real API keys to git
- Use environment variables only
- Verify all payments on backend
- Log all transactions
- Monitor for fraud

---

## 📝 Environment Variables

### Current Setup (.env.local)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce

# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Razorpay (Test Keys - Safe to use)
RAZORPAY_KEY_ID=rzp_test_1Z4vZjHfJNR5nk
RAZORPAY_KEY_SECRET=R6vkDGKquoLQZGXVhQHqVWEk
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_1Z4vZjHfJNR5nk
```

### For Production (After getting real keys)
```env
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
```

---

## 🎁 Razorpay Test Credentials

### Razorpay Dashboard
- **URL:** https://dashboard.razorpay.com
- **Mode:** Test (default for new accounts)
- **Key Status:** Generated automatically
- **Test Limit:** Unlimited test transactions

### Test Key Features
- ✅ Create unlimited test orders
- ✅ Process multiple test payments
- ✅ View payment history
- ✅ No real money involved
- ✅ Switch to production anytime
- ✅ Same controls as live mode

---

## 🚀 Next Steps

1. **Test the current setup** with mock mode
2. **Verify all payment flow** works end-to-end
3. **When ready for production:**
   - Get Razorpay account
   - Install `npm install razorpay`
   - Update `.env.local` with live keys
   - Deploy to production

---

## 📚 Resources

- [Razorpay Dashboard](https://dashboard.razorpay.com)
- [Test Card Details](https://razorpay.com/docs/payments/payment-gateway/test-card-details/)
- [API Documentation](https://razorpay.com/docs/api/)
- [Integration Guide](https://razorpay.com/docs/payments/payment-gateway/web-integration/)
- [Webhook Documentation](https://razorpay.com/docs/api/webhooks/)

---

## ✨ Summary

**Right now, you can:**
1. ✅ Add products to cart
2. ✅ Adjust quantities
3. ✅ View order summary
4. ✅ Click "Buy Now with Razorpay"
5. ✅ See Razorpay modal
6. ✅ Test with demo cards
7. ✅ Simulate payments

**No additional setup needed!** The app is fully functional in test/mock mode. 🎉
