import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Order, dummyProducts, dummyCategories, dummyOrders } from '@/data/dummyData';
import { toast } from '@/hooks/use-toast';

interface DataContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'reviews'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'productCount'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  getCategory: (id: string) => Category | undefined;

  // Orders
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  getOrder: (id: string) => Order | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
  const [orders, setOrders] = useState<Order[]>(dummyOrders);

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Update category product counts
  const updateCategoryProductCounts = (updatedProducts: Product[]) => {
    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        productCount: updatedProducts.filter(p => p.category === category.name).length
      }))
    );
  };

  // Product CRUD operations
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'reviews'>) => {
    const newProduct: Product = {
      ...productData,
      id: generateId(),
      createdAt: new Date().toISOString().split('T')[0],
      reviews: []
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    updateCategoryProductCounts(updatedProducts);
    
    toast({
      title: "Product added",
      description: `${newProduct.name} has been added successfully.`,
    });
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...productData } : product
    );
    setProducts(updatedProducts);
    updateCategoryProductCounts(updatedProducts);
    
    toast({
      title: "Product updated",
      description: "Product has been updated successfully.",
    });
  };

  const deleteProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    updateCategoryProductCounts(updatedProducts);
    
    toast({
      title: "Product deleted",
      description: `${product?.name || 'Product'} has been removed.`,
      variant: "destructive",
    });
  };

  const getProduct = (id: string) => products.find(p => p.id === id);

  // Category CRUD operations
  const addCategory = (categoryData: Omit<Category, 'id' | 'productCount'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: generateId(),
      productCount: 0
    };
    
    setCategories(prev => [...prev, newCategory]);
    
    toast({
      title: "Category added",
      description: `${newCategory.name} category has been created.`,
    });
  };

  const updateCategory = (id: string, categoryData: Partial<Category>) => {
    const oldCategory = categories.find(c => c.id === id);
    const updatedCategories = categories.map(category =>
      category.id === id ? { ...category, ...categoryData } : category
    );
    setCategories(updatedCategories);

    // Update products that use this category if name changed
    if (categoryData.name && oldCategory && categoryData.name !== oldCategory.name) {
      const updatedProducts = products.map(product =>
        product.category === oldCategory.name 
          ? { ...product, category: categoryData.name! }
          : product
      );
      setProducts(updatedProducts);
    }
    
    toast({
      title: "Category updated",
      description: "Category has been updated successfully.",
    });
  };

  const deleteCategory = (id: string) => {
    const category = categories.find(c => c.id === id);
    const hasProducts = products.some(p => p.category === category?.name);
    
    if (hasProducts) {
      toast({
        title: "Cannot delete category",
        description: "This category contains products. Please remove all products first.",
        variant: "destructive",
      });
      return;
    }

    setCategories(prev => prev.filter(category => category.id !== id));
    
    toast({
      title: "Category deleted",
      description: `${category?.name || 'Category'} has been removed.`,
      variant: "destructive",
    });
  };

  const getCategory = (id: string) => categories.find(c => c.id === id);

  // Order operations
  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(order =>
      order.id === id ? { ...order, status } : order
    ));
    
    toast({
      title: "Order updated",
      description: `Order status changed to ${status}.`,
    });
  };

  const deleteOrder = (id: string) => {
    const order = orders.find(o => o.id === id);
    setOrders(prev => prev.filter(order => order.id !== id));
    
    toast({
      title: "Order deleted",
      description: `Order #${order?.id || 'Order'} has been removed.`,
      variant: "destructive",
    });
  };

  const getOrder = (id: string) => orders.find(o => o.id === id);

  // Update category counts when products change
  useEffect(() => {
    updateCategoryProductCounts(products);
  }, [products]);

  return (
    <DataContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      getCategory,
      orders,
      updateOrderStatus,
      deleteOrder,
      getOrder,
    }}>
      {children}
    </DataContext.Provider>
  );
};