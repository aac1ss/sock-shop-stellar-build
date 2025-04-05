
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MoreVertical, Download } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Sample order data
const orders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    email: 'john.doe@example.com',
    date: '2025-04-05',
    status: 'completed',
    items: 3,
    total: 125.00,
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane.smith@example.com',
    date: '2025-04-04',
    status: 'processing',
    items: 2,
    total: 75.50,
  },
  {
    id: 'ORD-003',
    customer: 'Michael Johnson',
    email: 'michael.j@example.com',
    date: '2025-04-03',
    status: 'shipped',
    items: 1,
    total: 249.99,
  },
  {
    id: 'ORD-004',
    customer: 'Sarah Williams',
    email: 'sarah.w@example.com',
    date: '2025-04-02',
    status: 'canceled',
    items: 4,
    total: 58.25,
  },
  {
    id: 'ORD-005',
    customer: 'Robert Brown',
    email: 'robert.b@example.com',
    date: '2025-04-01',
    status: 'completed',
    items: 2,
    total: 312.00,
  },
  {
    id: 'ORD-006',
    customer: 'Emily Davis',
    email: 'emily.d@example.com',
    date: '2025-03-31',
    status: 'processing',
    items: 1,
    total: 42.99,
  },
  {
    id: 'ORD-007',
    customer: 'Daniel Wilson',
    email: 'daniel.w@example.com',
    date: '2025-03-30',
    status: 'shipped',
    items: 3,
    total: 187.50,
  }
];

const statusClasses = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  processing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  shipped: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

const Orders = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground mt-2">Manage and track customer orders.</p>
        </div>
        
        <Button variant="outline" className="sm:self-end">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <p className="text-2xl font-bold">{orders.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <p className="text-2xl font-bold">
              {orders.filter(order => order.status === 'completed').length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <p className="text-2xl font-bold">
              {orders.filter(order => order.status === 'processing').length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Canceled</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <p className="text-2xl font-bold">
              {orders.filter(order => order.status === 'canceled').length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>View and manage all customer orders.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and search */}
          <div className="flex flex-col sm:flex-row gap-4 pb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID or customer..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Orders table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Items</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-border">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-xs text-muted-foreground">{order.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${statusClasses[order.status as keyof typeof statusClasses]}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="text-right py-3 px-4">{order.items}</td>
                    <td className="text-right py-3 px-4 font-medium">${order.total.toFixed(2)}</td>
                    <td className="text-right py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing <strong>1</strong> to <strong>{orders.length}</strong> of{' '}
              <strong>{orders.length}</strong> orders
            </p>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
