const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/ecommerce';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  rating: Number,
  stock: Number,
});

const Product = mongoose.model('Product', productSchema);

const seedProducts = [
  {
    title: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    rating: 4.5,
    stock: 50,
  },
  {
    title: 'Smart Watch',
    description: 'Advanced fitness tracking with heart rate monitor',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    rating: 4,
    stock: 30,
  },
  {
    title: 'Camera Pro',
    description: 'Professional-grade digital camera for photography',
    price: 34999,
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&h=500&fit=crop',
    rating: 4.8,
    stock: 15,
  },
  {
    title: 'Laptop Stand',
    description: 'Ergonomic laptop stand for better posture',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    rating: 4.3,
    stock: 60,
  },
  {
    title: 'USB-C Cable',
    description: 'Fast charging USB-C cable with durability',
    price: 499,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    rating: 4.2,
    stock: 100,
  },
  {
    title: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with cherry switches',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1587829191301-b5044e2b04d7?w=500&h=500&fit=crop',
    rating: 4.6,
    stock: 40,
  },
  {
    title: 'Mouse Pad XL',
    description: 'Large gaming mouse pad with non-slip base',
    price: 799,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    rating: 4.1,
    stock: 80,
  },
  {
    title: 'Portable Charger',
    description: '20000mAh power bank with fast charging',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    rating: 4.4,
    stock: 70,
  },
];

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const result = await Product.insertMany(seedProducts);
    console.log(`Inserted ${result.length} products`);

    await mongoose.connection.close();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDB();
