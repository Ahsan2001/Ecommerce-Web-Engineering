import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Edit, ShoppingCart, Trash2 } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import DeleteConfirmDialog from "@/components/dialogs/DeleteConfirmDialog";
import { Order } from "@/data/dummyData";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'success';
    case 'shipped': return 'warning';
    case 'processing': return 'secondary';
    case 'pending': return 'destructive';
    default: return 'secondary';
  }
};

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const { orders, updateOrderStatus, deleteOrder } = useData();
  
  // Dialog states
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    order?: Order;
  }>({ open: false });

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteOrder = (order: Order) => {
    setDeleteDialog({ open: true, order });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.order) {
      deleteOrder(deleteDialog.order.id);
      setDeleteDialog({ open: false });
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Orders</h1>
          <p className="text-white mt-1">Manage customer orders</p>
        </div>
      </div>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Orders List ({filteredOrders.length})
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50 transition-smooth">
                    <TableCell className="font-medium">
                      #{order.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {order.products.slice(0, 2).map((product, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{product.productName}</span>
                            <span className="text-muted-foreground"> x{product.quantity}</span>
                          </div>
                        ))}
                        {order.products.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{order.products.length - 2} more
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value: Order['status']) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="w-32 text-black">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black text-white">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteOrder(order)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        onConfirm={handleDeleteConfirm}
        title="Delete Order"
        description="Are you sure you want to delete order"
        itemName={deleteDialog.order ? `#${deleteDialog.order.id}` : undefined}
      />
    </div>
  );
}