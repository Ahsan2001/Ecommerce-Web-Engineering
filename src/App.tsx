import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CustomerAuthProvider } from "@/contexts/CustomerAuthContext";
import { DataProvider } from "@/contexts/DataContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Admin components
import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/dashboard/Products";
import ProductDetail from "./pages/dashboard/ProductDetail";
import Categories from "./pages/dashboard/Categories";
import Orders from "./pages/dashboard/Orders";

// Customer components
import CustomerLayout from "./components/layout/CustomerLayout";
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerSignup from "./pages/customer/CustomerSignup";
import Shop from "./pages/customer/Shop";
import CustomerProductDetail from "./pages/customer/CustomerProductDetail";
import Cart from "./pages/customer/Cart";
import Wishlist from "./pages/customer/Wishlist";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSuccess";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CustomerAuthProvider>
        <DataProvider>
          <CartProvider>
            <WishlistProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    {/* Admin Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }>
                      <Route index element={<Dashboard />} />
                      <Route path="products" element={<Products />} />
                      <Route path="products/:id" element={<ProductDetail />} />
                      <Route path="categories" element={<Categories />} />
                      <Route path="orders" element={<Orders />} />
                    </Route>
                    
                    {/* Customer Routes */}
                    <Route path="/customer/login" element={<CustomerLogin />} />
                    <Route path="/customer/signup" element={<CustomerSignup />} />
                    <Route path="/" element={<CustomerLayout />}>
                      <Route index element={<Shop />} />
                      <Route path="shop" element={<Shop />} />
                      <Route path="product/:id" element={<CustomerProductDetail />} />
                      <Route path="cart" element={<Cart />} />
                      <Route path="wishlist" element={<Wishlist />} />
                      <Route path="checkout" element={<Checkout />} />
                      <Route path="order-success" element={<OrderSuccess />} />
                    </Route>
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </WishlistProvider>
          </CartProvider>
        </DataProvider>
      </CustomerAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
