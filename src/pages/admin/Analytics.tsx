
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart } from '@/components/ui/chart';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Sample data for charts
const salesData = [
  { name: 'Jan', total: 2400 },
  { name: 'Feb', total: 1398 },
  { name: 'Mar', total: 9800 },
  { name: 'Apr', total: 3908 },
  { name: 'May', total: 4800 },
  { name: 'Jun', total: 3800 },
  { name: 'Jul', total: 4300 },
];

const visitorData = [
  { name: 'Jan', visitors: 2400, conversion: 240 },
  { name: 'Feb', visitors: 1398, conversion: 210 },
  { name: 'Mar', visitors: 9800, conversion: 580 },
  { name: 'Apr', visitors: 3908, conversion: 390 },
  { name: 'May', visitors: 4800, conversion: 480 },
  { name: 'Jun', visitors: 3800, conversion: 380 },
  { name: 'Jul', visitors: 4300, conversion: 430 },
];

const productPerformance = [
  { name: 'Athletic Socks', sales: 342, revenue: 4104 },
  { name: 'Dress Socks', sales: 256, revenue: 3072 },
  { name: 'Casual Socks', sales: 189, revenue: 1890 },
  { name: 'Wool Socks', sales: 175, revenue: 2625 },
  { name: 'Ankle Socks', sales: 152, revenue: 1368 },
];

const Analytics = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-2">View detailed performance metrics.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button variant="outline">
            Last 7 Days
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="text-2xl font-bold">$28,456</div>
            <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="text-2xl font-bold">1,345</div>
            <p className="text-xs text-green-600 mt-1">+5.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-green-600 mt-1">+18.3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="text-2xl font-bold">12.8%</div>
            <p className="text-xs text-red-600 mt-1">-2.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Monthly sales performance over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={salesData}
            xAxisKey="name"
            height={350}
            showLegend={false}
            series={[
              {
                dataKey: "total",
                label: "Sales",
                color: "hsl(120, 40%, 30%)",
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* Visitors and conversion */}
      <Card>
        <CardHeader>
          <CardTitle>Website Traffic & Conversion</CardTitle>
          <CardDescription>Track visitor counts and conversion rates.</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            data={visitorData}
            xAxisKey="name"
            height={350}
            series={[
              {
                dataKey: "visitors",
                label: "Visitors",
                color: "hsl(240, 50%, 50%)",
              },
              {
                dataKey: "conversion",
                label: "Conversions",
                color: "hsl(120, 50%, 40%)",
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* Product Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
          <CardDescription>Top selling products by revenue and sales volume.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sales</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Revenue</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Avg. Price</th>
                </tr>
              </thead>
              <tbody>
                {productPerformance.map((product, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="text-right py-3 px-4">{product.sales} units</td>
                    <td className="text-right py-3 px-4 font-medium">${product.revenue.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">
                      ${(product.revenue / product.sales).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
