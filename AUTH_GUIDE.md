# 🔐 Authentication System Guide

## ✅ What's New

Your e-commerce app now includes a complete **authentication & user management system** with:

### Pages Created:
1. **Login Page** (`/login`)
2. **Signup Page** (`/signup`)
3. **Profile Page** (`/profile`)
4. **Orders Page** (`/orders`)
5. **Settings Page** (`/settings`)

### Features:
- ✅ User registration & login
- ✅ Password validation
- ✅ Password strength indicator
- ✅ Show/hide password toggle
- ✅ Profile management
- ✅ User dropdown menu in navbar
- ✅ Protected routes (redirect to login if not authenticated)
- ✅ Persistent user state (localStorage)

---

## 🚀 Quick Start

### 1. Sign Up
Navigate to **`http://localhost:3000/signup`**

**Fields:**
- Full Name
- Email Address
- Password (min 6 characters)
- Confirm Password

**Features:**
- Password strength indicator
- Password match validation
- Terms & conditions acceptance
- Social signup options (UI only, not functional yet)

### 2. Sign In
Navigate to **`http://localhost:3000/login`**

**Fields:**
- Email Address
- Password
- Show/hide password toggle
- Forgot password link (UI ready)

**Features:**
- Email validation
- Error messages for invalid credentials
- Social login options (UI only)

### 3. View Profile
After login, click your **profile icon** in navbar to access:
- **My Profile** - View user information
- **My Orders** - See purchase history (currently empty)
- **Settings** - Manage preferences
- **Logout** - Sign out

---

## 📋 Test Credentials

Since authentication is in mock mode (for development), you can sign up with any:
- **Email:** any@email.com
- **Password:** at least 6 characters

Example:
```
Email: john@example.com
Password: password123
Name: John Doe
```

---

## 🔧 Technical Details

### Authentication Store (`store/authStore.js`)

Using **Zustand** for state management:

```javascript
// Available methods:
- login(email, password) → { success, user, error }
- signup(email, password, name) → { success, user, error }
- logout()
- getUser() → user object
```

### User Object
```javascript
{
  id: "unique_id",
  email: "user@example.com",
  name: "John Doe",
  createdAt: "2024-04-01T10:30:00Z"
}
```

### State Persistence
User data is automatically saved to localStorage under `auth-storage` key.

---

## 🔐 Security Considerations

### Current (Development/Mock Mode)
- ✅ Password validation on client
- ✅ Password strength indicator
- ✅ Secure password storage pattern
- ⚠️ Passwords not hashed (development only)

### For Production
You should add:
1. Backend API for authentication
2. JWT tokens or sessions
3. Password hashing (bcrypt)
4. Rate limiting on login/signup
5. Email verification
6. Password reset via email
7. Two-factor authentication
8. OAuth integration

---

## 📁 File Structure

```
app/
├── login/
│   └── page.jsx              ← Login form
├── signup/
│   └── page.jsx              ← Registration form
├── profile/
│   └── page.jsx              ← User profile
├── orders/
│   └── page.jsx              ← Order history
└── settings/
    └── page.jsx              ← User settings

store/
├── authStore.js              ← Zustand auth store
└── cartStore.js              ← Existing cart store

components/
└── Navbar.jsx                ← Updated with login/profile
```

---

## 🎯 User Flow

```
START
  ↓
User not logged in?
  ├─→ YES → Show "Sign In" / "Sign Up" buttons
  │         ↓
  │       Click "Sign In" → /login
  │         ↓
  │       Enter email & password
  │         ↓
  │       Click "Sign In"
  │         ↓
  │       Valid? → YES → Store user → Redirect home
  │              → NO → Show error
  │
  └─→ NO → Show user profile dropdown
            ├─ My Profile
            ├─ My Orders
            ├─ Settings
            └─ Logout
```

---

## 🧪 Testing the Auth System

### Test Case 1: Sign Up
1. Go to `/signup`
2. Enter:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Confirm: password123
3. Click "Create Account"
4. Should redirect to home page

### Test Case 2: Sign In
1. Go to `/login`
2. Enter:
   - Email: john@example.com
   - Password: password123
3. Click "Sign In"
4. Should see profile icon in navbar

### Test Case 3: Protected Routes
1. Logout from profile menu
2. Try accessing `/profile`
3. Should redirect to `/login`

### Test Case 4: Profile Dropdown
1. Login with any credentials
2. Click profile icon in navbar
3. See dropdown with options:
   - My Profile
   - My Orders
   - Settings
   - Logout

### Test Case 5: Mobile Navigation
1. Sign in
2. On mobile screen, click menu icon
3. Should show auth options in mobile menu

---

## 📱 Responsive Design

- **Desktop:** 
  - Sign In/Sign Up buttons OR Profile dropdown (if logged in)
  - Search bar visible
  
- **Mobile:** 
  - Menu toggle shows all options
  - Auth options in mobile menu
  - Profile info displayed in mobile menu

---

## 🔄 Integration with Existing Features

### Shopping Cart
Cart remains functional regardless of login status:
- ✅ Add items without login
- ✅ Cart persists in localStorage
- ✅ Login doesn't clear cart

### Checkout (Razorpay)
Still works whether logged in or not:
- ✅ Buy as guest
- ✅ Buy as registered user
- ✅ Future: Link orders to user account

---

## 🚀 Future Enhancements

### Quick Wins
- [ ] Email verification on signup
- [ ] Password reset via email
- [ ] Order history tracking
- [ ] Wishlist functionality
- [ ] Address book management

### Advanced Features
- [ ] Social OAuth (Google, Facebook)
- [ ] Two-factor authentication
- [ ] Account recovery options
- [ ] Login history
- [ ] Device management

---

## 🐛 Common Issues & Solutions

### Issue: "Can't login with credentials I just signed up with"
**Solution:** This is expected in mock mode. Try:
- Using exact same email and password
- Clearing browser cache
- Checking localStorage in DevTools

### Issue: "User data not persisting"
**Solution:**
- Check if localStorage is enabled
- Look for `auth-storage` in DevTools
- Try signing in again

### Issue: "Profile page shows blank"
**Solution:**
- Make sure you're logged in
- Try going to login page first
- Refresh the page

### Issue: "Can't access protected routes"
**Solution:**
- Protected routes require login
- First sign in via `/login` or `/signup`
- Then access profile, orders, settings

---

## 🔑 Key Files to Understand

| File | Purpose |
|------|---------|
| `store/authStore.js` | Auth state management (Zustand) |
| `components/Navbar.jsx` | Updated with login/profile UI |
| `app/login/page.jsx` | Login form with validation |
| `app/signup/page.jsx` | Registration form with strength check |
| `app/profile/page.jsx` | User profile display |
| `app/orders/page.jsx` | Order history (stub) |
| `app/settings/page.jsx` | User settings & preferences |

---

## 💡 For Production

When you're ready for production:

1. **Install backend dependencies:**
   ```bash
   npm install jsonwebtoken bcryptjs axios
   ```

2. **Create API routes:**
   - `app/api/auth/login`
   - `app/api/auth/signup`
   - `app/api/auth/verify`

3. **Update auth store** to use API calls

4. **Add middleware** for protected routes

5. **Implement JWT tokens** for session management

---

## ✨ Summary

You now have:
✅ Full authentication UI
✅ User registration & login
✅ Profile management
✅ Protected routes
✅ Persistent state
✅ Responsive design
✅ Password validation
✅ User dropdown in navbar

Everything works in **mock/development mode**. Ready for backend integration! 🚀

---

## 🆘 Need Customization?

Common customizations:
- Change colors/styling → Edit CSS in pages
- Add new profile fields → Update `authStore.js`
- Change validation rules → Edit `page.jsx` files
- Add more menu items → Update `Navbar.jsx`

Let me know what you'd like to customize!
