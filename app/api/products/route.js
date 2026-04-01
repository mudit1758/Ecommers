import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request) {
  await connectDB();

  try {
    const products = await Product.find({}).lean();
    return Response.json({ success: true, data: products });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();

  try {
    const body = await request.json();
    const product = new Product(body);
    await product.save();
    return Response.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
}
