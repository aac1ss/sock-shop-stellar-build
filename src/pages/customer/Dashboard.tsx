import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart } from '@/components/ui/chart';
import OrderHistory from './OrderHistory';
import { useAuth } from '@/context/AuthContext';

const customerStats = [
  {
    title: 'Total Orders',
    value: '12',
    change: '+2 from last month',
    icon: '📦'
  },
  {
    title: 'Total Spent',
    value: '$357.50',
    change: '+$85.25 from last month',
    icon: '💰'
  },
  {
    title: 'Loyalty Points',
    value: '350',
    change: '+75 from last month',
    icon: '⭐'
  },
  {
    title: 'Active Coupons',
    value: '2',
    change: 'Expires in 15 days',
    icon: '🏷️'
  }
];

const activityData = [
  { name: 'Jan', value: 2 },
  { name: 'Feb', value: 3 },
  { name: 'Mar', value: 1 },
  { name: 'Apr', value: 4 },
  { name: 'May', value: 2 },
  { name: 'Jun', value: 5 }
];

const Dashboard = () => {
  const { user } = useAuth();
  const userName = user?.user_metadata?.name || user?.email || 'User';

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-2">Customer Dashboard</h1>
        <p className="text-muted-foreground mb-6">Welcome back, {userName}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {customerStats.map((stat, i) => (
            <Card key={i} className="card-hover">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">{stat.title}</CardTitle>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="animate-in">
            <OrderHistory />
          </TabsContent>
          
          <TabsContent value="activity" className="animate-in">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart data={activityData} height={300} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wishlist" className="animate-in">
            <Card>
              <CardHeader>
                <CardTitle>Your Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">You currently have no items in your wishlist.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
