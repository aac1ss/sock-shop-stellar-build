
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronRight, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for order history
const mockOrders = [
  {
    id: 'ORD-123456',
    date: '2023-05-15',
    status: 'delivered',
    items: 3,
    total: 89.97
  },
  {
    id: 'ORD-123455',
    date: '2023-04-22',
    status: 'delivered',
    items: 2,
    total: 45.98
  },
  {
    id: 'ORD-123454',
    date: '2023-03-10',
    status: 'delivered',
    items: 1,
    total: 29.99
  },
  {
    id: 'ORD-123453',
    date: '2023-02-28',
    status: 'delivered',
    items: 4,
    total: 112.96
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'processing':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'shipped':
      return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    case 'delivered':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'canceled':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

const OrderHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" /> 
          Order History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mockOrders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id} className="group hover:bg-muted/50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
