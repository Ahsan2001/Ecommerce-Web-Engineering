import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { dummySalesData } from "@/data/dummyData";
import { useData } from "@/contexts/DataContext";

const StatCard = ({ title, value, change, icon: Icon, trend }: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: 'up' | 'down';
}) => (
  <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-smooth">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <div className="flex items-center gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white">{value}</h3>
            <div className={`flex items-center text-sm ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {change}
            </div>
          </div>
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const categoryData = [
  { name: 'Electronics', value: 40, color: 'hsl(var(--primary))' },
  { name: 'Clothing', value: 30, color: 'hsl(var(--accent))' },
  { name: 'Home & Garden', value: 20, color: 'hsl(var(--success))' },
  { name: 'Sports', value: 10, color: 'hsl(var(--warning))' }
];

export default function Dashboard() {
  const { products, orders } = useData();
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalCustomers = new Set(orders.map(order => order.customerEmail)).size;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-white mt-1">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          change="+12.5%"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Total Products"
          value={totalProducts.toString()}
          change="+2.1%"
          icon={Package}
          trend="up"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders.toString()}
          change="+8.3%"
          icon={ShoppingCart}
          trend="up"
        />
        <StatCard
          title="Customers"
          value={totalCustomers.toString()}
          change="-0.5%"
          icon={Users}
          trend="down"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="bg-gradient-card shadow-md">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales and product performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dummySalesData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="text-white" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Categories */}
        <Card className="bg-gradient-card shadow-md">
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Distribution of products by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

     
    </div>
  );
}