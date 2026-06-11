import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';

const passwordHash = bcrypt.hashSync('Password123', 10);

export const seedData = async () => {
  await User.deleteMany();
  await Product.deleteMany();
  await Order.deleteMany();
  await Review.deleteMany();

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@ekart.com',
    password: passwordHash,
    isAdmin: true,
    wishlist: [],
    cart: []
  });

  const user = await User.create({
    name: 'Customer',
    email: 'customer@ekart.com',
    password: passwordHash,
    isAdmin: false,
    wishlist: [],
    cart: []
  });

  const products = await Product.insertMany([
    {
      name: 'Organic Apples',
      category: 'Fruits',
      price: 199,
      rating: 4.8,
      stock: 40,
      image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80',
      description: 'Fresh local apples handpicked from nearby farms.'
    },
    {
      name: 'Fresh Spinach',
      category: 'Vegetables',
      price: 89,
      rating: 4.6,
      stock: 50,
      image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=80',
      description: 'Leafy greens full of iron and vitamins for healthy meals.'
    },
    {
      name: 'Whole Milk',
      category: 'Dairy',
      price: 129,
      rating: 4.7,
      stock: 60,
      image: 'https://images.unsplash.com/photo-1556400056-8207f3f40455?auto=format&fit=crop&w=800&q=80',
      description: 'Creamy whole milk sourced from local dairy farms.'
    },
    {
      name: 'Brown Rice',
      category: 'Groceries',
      price: 240,
      rating: 4.9,
      stock: 80,
      image: 'https://images.unsplash.com/photo-1585238342028-3baa490bf6c8?auto=format&fit=crop&w=800&q=80',
      description: 'Healthy brown rice for wholesome meals and energy.'
    },
    {
      name: 'Avocado Pack',
      category: 'Fruits',
      price: 260,
      rating: 4.5,
      stock: 35,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      description: 'Creamy ripe avocados ready for toast, salads, and smoothies.'
    },
    {
      name: 'Baby Carrots',
      category: 'Vegetables',
      price: 119,
      rating: 4.4,
      stock: 45,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      description: 'Crunchy baby carrots perfect for snacking and cooking.'
    },
    {
      name: 'Yogurt Pack',
      category: 'Dairy',
      price: 149,
      rating: 4.6,
      stock: 55,
      image: 'https://images.unsplash.com/photo-1582738416050-05b37425b3f5?auto=format&fit=crop&w=800&q=80',
      description: 'Fresh yogurt from local dairy farms in a convenient pack.'
    },
    {
      name: 'Olive Oil',
      category: 'Groceries',
      price: 420,
      rating: 4.7,
      stock: 30,
      image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80',
      description: 'Premium cold-pressed olive oil for your kitchen pantry.'
    },
    {
      name: 'Banana Bunch',
      category: 'Fruits',
      price: 79,
      rating: 4.6,
      stock: 70,
      image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e43e?auto=format&fit=crop&w=800&q=80',
      description: 'Sweet bananas rich in potassium and perfect for snacks.'
    },
    {
      name: 'Tomato Basket',
      category: 'Vegetables',
      price: 99,
      rating: 4.5,
      stock: 40,
      image: 'https://images.unsplash.com/photo-1506807803488-8eafc153f5a1?auto=format&fit=crop&w=800&q=80',
      description: 'Juicy tomatoes ideal for curries, salads, and sauces.'
    },
    {
      name: 'Paneer Block',
      category: 'Dairy',
      price: 210,
      rating: 4.8,
      stock: 35,
      image: 'https://images.unsplash.com/photo-1604908177522-cf096b3c9a5a?auto=format&fit=crop&w=800&q=80',
      description: 'Soft, fresh paneer ready for classic Indian dishes.'
    },
    {
      name: 'Whole Wheat Flour',
      category: 'Groceries',
      price: 179,
      rating: 4.6,
      stock: 65,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      description: 'Premium whole wheat flour for rotis, breads, and baking.'
    }
  ]);

  const reviews = await Review.insertMany([
    {
      product: products[0]._id,
      user: user._id,
      rating: 5,
      comment: 'Absolutely fresh apples, great for smoothies and snacks.'
    },
    {
      product: products[2]._id,
      user: user._id,
      rating: 4,
      comment: 'Creamy milk with great texture and taste.'
    }
  ]);

  console.log('Sample data seeded:', { admin, user, products: products.length, reviews: reviews.length });
};
