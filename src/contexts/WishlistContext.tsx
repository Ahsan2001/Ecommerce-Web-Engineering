import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/dummyData';
import { toast } from '@/hooks/use-toast';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist-items');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist-items', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Product) => {
    setItems(prevItems => {
      if (prevItems.some(item => item.id === product.id)) {
        toast({
          title: "Already in wishlist",
          description: `${product.name} is already in your wishlist`,
          variant: "destructive"
        });
        return prevItems;
      }
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} added to wishlist`,
      });
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems(prevItems => {
      const product = prevItems.find(p => p.id === productId);
      toast({
        title: "Removed from wishlist",
        description: `${product?.name || 'Item'} removed from wishlist`,
        variant: "destructive"
      });
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items removed from wishlist",
    });
  };

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};