import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a product title'],
    maxlength: [120, 'Product title cannot be more than 120 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    maxlength: [500, 'Product description cannot be more than 500 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    default: 0,
  },
  image: {
    type: String,
    required: [true, 'Please provide a product image URL'],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
