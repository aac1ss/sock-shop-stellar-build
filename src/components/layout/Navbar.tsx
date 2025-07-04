
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Heart, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { useTheme } from '@/context/ThemeContext';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { getCartItemCount } = useCart();
  const { user, profile, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDashboardNavigation = () => {
    if (profile?.role === 'admin') {
      navigate('/admin');
    } else if (profile?.role === 'seller') {
      navigate('/seller/dashboard');
    } else {
      navigate('/customer/dashboard');
    }
  };

  const userInitials = user?.user_metadata?.name || user?.email
    ? (user?.user_metadata?.name || user?.email)
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : 'U';

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const userName = user?.user_metadata?.name || user?.email || 'User';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="h-10 w-auto overflow-hidden">
              <img 
                src={theme === 'light' ? "/images/logo/black.png" : "/images/logo/white.png"}
                alt="The Socks Box" 
                className="h-full w-auto object-contain" 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavigationMenu className="mx-auto">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="text-foreground px-4 py-2 hover:text-primary transition-colors">
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-primary">Shop</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/products"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Products
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Browse our full collection of premium socks
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/categories"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Categories</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Shop by collection or style
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/products?featured=true"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Featured</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Our best selling and trending items
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/products?new=true"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">New Arrivals</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Just landed in our store
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about" className="text-foreground px-4 py-2 hover:text-primary transition-colors">
                    About
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact" className="text-foreground px-4 py-2 hover:text-primary transition-colors">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2" onClick={handleDashboardNavigation}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  {profile?.role === 'admin' && (
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate('/admin')}>
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Admin Panel</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="hidden md:block text-foreground hover:text-primary transition-colors">
                Login / Sign Up
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            {isMobile ? (
              <Drawer>
                <DrawerTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-[100dvh] w-full max-w-full">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 border-b">
                      <div className="h-10 w-auto">
                        <img 
                          src={theme === 'light' ? "/images/logo/black.png" : "/images/logo/white.png"}
                          alt="The Socks Box" 
                          className="h-full w-auto object-contain" 
                        />
                      </div>
                      <DrawerClose asChild>
                        <Button variant="ghost" size="icon">
                          <X className="h-5 w-5" />
                        </Button>
                      </DrawerClose>
                    </div>
                    
                    <div className="flex flex-col p-6 space-y-6 overflow-y-auto flex-1">
                      <Link
                        to="/"
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        Home
                      </Link>
                      <Link
                        to="/products"
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        Products
                      </Link>
                      <Link
                        to="/categories"
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        Categories
                      </Link>
                      <Link
                        to="/about"
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        About
                      </Link>
                      <Link
                        to="/contact"
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        Contact
                      </Link>
                    </div>
                    
                    <div className="mt-auto p-4 border-t">
                      {isAuthenticated ? (
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{userName}</p>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                          </div>
                          <Button onClick={handleLogout}>
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <Link to="/login" className="font-medium">
                            Sign In
                          </Link>
                          <Link to="/user-type-selection">
                            <Button>
                              Sign Up
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="md:hidden"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
