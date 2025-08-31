import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Customer {
  id: string;
  email: string;
  name: string;
  password: string;
}

interface CustomerAuthContextType {
  customer: Customer | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (context === undefined) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
};

// Dummy customers data stored in localStorage
const getCustomers = (): Customer[] => {
  const saved = localStorage.getItem('customers');
  return saved ? JSON.parse(saved) : [
    { id: '1', email: 'customer@example.com', password: 'customer123', name: 'John Customer' }
  ];
};

const saveCustomers = (customers: Customer[]) => {
  localStorage.setItem('customers', JSON.stringify(customers));
};

export const CustomerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedCustomer = localStorage.getItem('current-customer');
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const customers = getCustomers();
    const foundCustomer = customers.find(c => c.email === email && c.password === password);
    
    if (foundCustomer) {
      setCustomer(foundCustomer);
      localStorage.setItem('current-customer', JSON.stringify(foundCustomer));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const customers = getCustomers();
    const existingCustomer = customers.find(c => c.email === email);
    
    if (existingCustomer) {
      setIsLoading(false);
      return false;
    }

    const newCustomer: Customer = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      name
    };

    customers.push(newCustomer);
    saveCustomers(customers);
    setCustomer(newCustomer);
    localStorage.setItem('current-customer', JSON.stringify(newCustomer));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setCustomer(null);
    localStorage.removeItem('current-customer');
  };

  return (
    <CustomerAuthContext.Provider value={{ customer, login, signup, logout, isLoading }}>
      {children}
    </CustomerAuthContext.Provider>
  );
};