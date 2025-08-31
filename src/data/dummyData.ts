export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  rating: number;
  reviews: Review[];
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  products: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  orderDate: string;
}

export interface SalesData {
  month: string;
  sales: number;
  products: number;
}

// Dummy authentication data
export const dummyUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  }
];

// Dummy categories
export const dummyCategories: Category[] = [
  { id: '1', name: 'Electronics', description: 'Electronic devices and gadgets', productCount: 15 },
  { id: '2', name: 'Clothing', description: 'Fashion and apparel', productCount: 25 },
  { id: '3', name: 'Home & Garden', description: 'Home and garden supplies', productCount: 12 },
  { id: '4', name: 'Sports', description: 'Sports and outdoor equipment', productCount: 8 }
];

// Dummy reviews
export const dummyReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Excellent product! Very satisfied with the quality.',
    date: '2024-01-15'
  },
  {
    id: '2',
    productId: '1',
    userName: 'Jane Smith',
    rating: 4,
    comment: 'Good value for money, would recommend.',
    date: '2024-01-20'
  },
  {
    id: '3',
    productId: '2',
    userName: 'Mike Johnson',
    rating: 5,
    comment: 'Amazing quality and fast delivery!',
    date: '2024-02-01'
  }
];

// Dummy products
export const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    category: 'Electronics',
    stock: 50,
    image: '/placeholder.svg',
    rating: 4.5,
    reviews: dummyReviews.filter(r => r.productId === '1'),
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Advanced smartwatch with health monitoring features',
    price: 199.99,
    category: 'Electronics',
    stock: 30,
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: dummyReviews.filter(r => r.productId === '2'),
    createdAt: '2024-01-05'
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for all terrains',
    price: 129.99,
    category: 'Sports',
    stock: 75,
    image: '/placeholder.svg',
    rating: 4.3,
    reviews: [],
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'Coffee Maker',
    description: 'Automatic drip coffee maker with programmable timer',
    price: 89.99,
    category: 'Home & Garden',
    stock: 25,
    image: '/placeholder.svg',
    rating: 4.1,
    reviews: [],
    createdAt: '2024-01-15'
  },
  {
    id: '5',
    name: 'Winter Jacket',
    description: 'Warm winter jacket with waterproof material',
    price: 159.99,
    category: 'Clothing',
    stock: 40,
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: [],
    createdAt: '2024-01-20'
  }
];

// Dummy orders
export const dummyOrders: Order[] = [
  {
    id: '1',
    customerName: 'Alice Johnson',
    customerEmail: 'alice@example.com',
    products: [
      { productId: '1', productName: 'Wireless Headphones', quantity: 1, price: 299.99 }
    ],
    total: 299.99,
    status: 'delivered',
    orderDate: '2024-01-10'
  },
  {
    id: '2',
    customerName: 'Bob Smith',
    customerEmail: 'bob@example.com',
    products: [
      { productId: '2', productName: 'Smart Watch', quantity: 1, price: 199.99 },
      { productId: '3', productName: 'Running Shoes', quantity: 1, price: 129.99 }
    ],
    total: 329.98,
    status: 'shipped',
    orderDate: '2024-01-15'
  },
  {
    id: '3',
    customerName: 'Carol Davis',
    customerEmail: 'carol@example.com',
    products: [
      { productId: '4', productName: 'Coffee Maker', quantity: 2, price: 89.99 }
    ],
    total: 179.98,
    status: 'processing',
    orderDate: '2024-01-20'
  }
];

// Dummy sales data for charts
export const dummySalesData: SalesData[] = [
  { month: 'Jan', sales: 4000, products: 120 },
  { month: 'Feb', sales: 3000, products: 98 },
  { month: 'Mar', sales: 5000, products: 150 },
  { month: 'Apr', sales: 4500, products: 134 },
  { month: 'May', sales: 6000, products: 180 },
  { month: 'Jun', sales: 5500, products: 165 },
  { month: 'Jul', sales: 7000, products: 210 },
  { month: 'Aug', sales: 6500, products: 195 }
];