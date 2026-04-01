# ShopHub - E-Commerce Application

A modern, full-stack e-commerce application built with Next.js 14, MongoDB, Mongoose, Zustand, and Tailwind CSS.

## Features

- Product catalog with filtering and search
- Shopping cart with persistent storage
- Responsive design for all devices
- Modern UI with Tailwind CSS
- MongoDB integration for data persistence
- Real-time cart updates
- Product ratings and descriptions

## Project Structure

```
ecommerce/
├── app/
│   ├── api/
│   │   └── products/
│   │       └── route.js         # API endpoint for products
│   ├── page.jsx                 # Homepage
│   ├── layout.jsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── Navbar.jsx               # Navigation component
│   └── ProductCard.jsx          # Product card component
├── models/
│   └── Product.js               # Mongoose product schema
├── store/
│   └── cartStore.js             # Zustand cart state management
├── lib/
│   └── mongodb.js               # MongoDB connection
├── scripts/
│   └── seed.js                  # Database seed script
├── public/                       # Static assets
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── next.config.js               # Next.js configuration
├── .env.local                   # Environment variables
└── .gitignore                   # Git ignore rules
```

## Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- MongoDB running locally or MongoDB Atlas connection string

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create `.env.local` file with:
   ```
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Start MongoDB:**
   ```bash
   mongod
   ```

4. **Seed the database (optional):**
   ```bash
   node scripts/seed.js
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open in browser:**
   Navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### GET /api/products
Fetch all products from the database.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Product Name",
      "description": "Product Description",
      "price": 9999,
      "image": "https://...",
      "rating": 4.5,
      "stock": 50
    }
  ]
}
```

### POST /api/products
Create a new product.

**Request Body:**
```json
{
  "title": "Product Name",
  "description": "Product Description",
  "price": 9999,
  "image": "https://...",
  "rating": 4.5,
  "stock": 50
}
```

## Technology Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **State Management:** Zustand
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Mongoose ODM
- **Icons:** Lucide React
- **Image Optimization:** Next.js Image component

## Cart Features

- Add/remove items from cart
- Update quantities
- Calculate total price
- Persistent storage using localStorage
- Real-time cart count display

## Customization

### Colors
Modify `tailwind.config.js` and `globals.css` for custom styling.

### Products
Edit `scripts/seed.js` to add custom products.

### Navbar
Customize `components/Navbar.jsx` for branding and navigation.

## Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- MongoDB lean queries for faster responses
- Persistent state with Zustand middleware

## License

MIT License - Feel free to use this project for personal or commercial use.

## Support

For issues or questions, please create an issue in the repository.
