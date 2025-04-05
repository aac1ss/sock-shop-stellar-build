
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { BarChart } from '@/components/ui/chart';

const Dashboard = () => {
  // Revenue chart data
  const revenueChartData = [
    {
      name: 'Jan',
      total: 1200,
    },
    {
      name: 'Feb',
      total: 1900,
    },
    {
      name: 'Mar',
      total: 2400,
    },
    {
      name: 'Apr',
      total: 1800,
    },
    {
      name: 'May',
      total: 2800,
    },
    {
      name: 'Jun',
      total: 3200,
    },
    {
      name: 'Jul',
      total: 2500,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to your admin dashboard.</p>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              +12.2% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">243</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2 added today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              +8.4% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <BarChart
            data={revenueChartData}
            xAxisKey="name"
            showLegend={false}
            series={[
              {
                dataKey: "total",
                label: "Revenue",
                color: "hsl(142.1, 76.2%, 36.3%)",
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="py-3 px-4">#ORD-001</td>
                  <td className="py-3 px-4">John Doe</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Completed
                    </span>
                  </td>
                  <td className="py-3 px-4">2025-04-05</td>
                  <td className="text-right py-3 px-4">$125.00</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-3 px-4">#ORD-002</td>
                  <td className="py-3 px-4">Jane Smith</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      Processing
                    </span>
                  </td>
                  <td className="py-3 px-4">2025-04-05</td>
                  <td className="text-right py-3 px-4">$75.50</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-3 px-4">#ORD-003</td>
                  <td className="py-3 px-4">Michael Johnson</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Shipped
                    </span>
                  </td>
                  <td className="py-3 px-4">2025-04-04</td>
                  <td className="text-right py-3 px-4">$249.99</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-3 px-4">#ORD-004</td>
                  <td className="py-3 px-4">Sarah Williams</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                      Canceled
                    </span>
                  </td>
                  <td className="py-3 px-4">2025-04-03</td>
                  <td className="text-right py-3 px-4">$58.25</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-3 px-4">#ORD-005</td>
                  <td className="py-3 px-4">Robert Brown</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Completed
                    </span>
                  </td>
                  <td className="py-3 px-4">2025-04-02</td>
                  <td className="text-right py-3 px-4">$312.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
