
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
import { Search, Filter, MoreVertical, UserPlus } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Sample customer data
const customers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    orders: 5,
    totalSpent: 425.75,
    lastOrder: '2025-04-02',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    orders: 3,
    totalSpent: 189.50,
    lastOrder: '2025-03-28',
    status: 'active'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    orders: 1,
    totalSpent: 49.99,
    lastOrder: '2025-04-01',
    status: 'active'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    orders: 8,
    totalSpent: 752.25,
    lastOrder: '2025-04-03',
    status: 'active'
  },
  {
    id: '5',
    name: 'Robert Brown',
    email: 'robert.b@example.com',
    orders: 2,
    totalSpent: 138.50,
    lastOrder: '2025-03-15',
    status: 'inactive'
  },
  {
    id: '6',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    orders: 4,
    totalSpent: 287.45,
    lastOrder: '2025-03-29',
    status: 'active'
  },
  {
    id: '7',
    name: 'Daniel Wilson',
    email: 'daniel.w@example.com',
    orders: 0,
    totalSpent: 0,
    lastOrder: '-',
    status: 'inactive'
  }
];

const statusClasses = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
};

const Customers = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground mt-2">Manage your customer accounts.</p>
        </div>
        
        <Button className="sm:self-end">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <p className="text-2xl font-bold">{customers.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <p className="text-2xl font-bold">
              {customers.filter(customer => customer.status === 'active').length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Inactive Customers</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <p className="text-2xl font-bold">
              {customers.filter(customer => customer.status === 'inactive').length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>View and manage all customer accounts.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and search */}
          <div className="flex flex-col sm:flex-row gap-4 pb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Customer table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Orders</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total Spent</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Order</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-t border-border">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {customer.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-xs text-muted-foreground">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${statusClasses[customer.status as keyof typeof statusClasses]}`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">{customer.orders}</td>
                    <td className="text-right py-3 px-4 font-medium">
                      ${customer.totalSpent.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">{customer.lastOrder}</td>
                    <td className="text-right py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>View Orders</DropdownMenuItem>
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
              Showing <strong>1</strong> to <strong>{customers.length}</strong> of{' '}
              <strong>{customers.length}</strong> customers
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

export default Customers;
