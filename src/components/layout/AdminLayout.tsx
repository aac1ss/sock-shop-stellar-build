
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const mainNavigationItems = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Products',
    path: '/admin/products',
    icon: Package
  },
  {
    name: 'Orders',
    path: '/admin/orders',
    icon: ShoppingCart
  },
  {
    name: 'Customers',
    path: '/admin/customers',
    icon: Users
  },
  {
    name: 'Analytics',
    path: '/admin/analytics',
    icon: BarChart3
  }
];

const secondaryNavigationItems = [
  {
    name: 'Settings',
    path: '/admin/settings',
    icon: Settings
  }
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : 'A';

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-[#1C2B1C] text-white transition-transform duration-200 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center px-4 border-b border-white/10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">The Socks Box</span>
          </Link>
        </div>

        <div className="flex flex-col justify-between h-[calc(100%-4rem)] p-4">
          <nav className="space-y-6">
            <ul className="space-y-1">
              {mainNavigationItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === item.path 
                        ? "bg-white/10 text-white" 
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-white/10">
              <ul className="space-y-1">
                {secondaryNavigationItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        location.pathname === item.path 
                          ? "bg-white/10 text-white" 
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="mt-auto space-y-4">
            <Link 
              to="/" 
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <span>View Store</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Top navbar */}
        <header className="sticky top-0 z-10 bg-background border-b">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
              
              <div className="md:hidden font-semibold">Admin Dashboard</div>
              
              <div className="hidden md:flex md:w-72">
                <Input
                  placeholder="Search..."
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar>
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
