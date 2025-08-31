import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Heart, 
  User, 
  LogOut, 
  Search,
  Store
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useState } from "react";

export default function CustomerHeader() {
  const { customer, logout } = useCustomerAuth();
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/customer/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/shop" className="flex items-center gap-2 font-bold text-xl">
            <Store className="w-6 h-6 text-primary" />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4"
              />
            </form>
          </div>

          {/* Right side - Auth & Cart */}
          <div className="flex items-center gap-2">
            {customer ? (
              <>
                {/* Customer actions */}
                <Button variant="ghost" size="icon" asChild className="relative">
                  <Link to="/wishlist">
                    <Heart className="w-5 h-5" />
                    {wishlistItems.length > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute text-red-600 font-bold -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                      >
                        {wishlistItems.length}
                      </Badge>
                    )}
                  </Link>
                </Button>

                <Button variant="ghost" size="icon" asChild className="relative">
                  <Link to="/cart">
                    <ShoppingCart className="w-5 h-5" />
                    {getTotalItems() > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 font-bold  text-red-600 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                      >
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Link>
                </Button>

                {/* Customer name & logout */}
                <div className="hidden sm:flex items-center gap-2 ml-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{customer.name}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleLogout}
                    className="ml-2"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/customer/login">Login</Link>
                </Button>
                <Button asChild className="bg-gradient-primary hover:opacity-90">
                  <Link to="/customer/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4"
            />
          </form>
        </div>
      </div>
    </header>
  );
}