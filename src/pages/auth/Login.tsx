
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Loader2, Mail, LockKeyhole } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    await login(data.email, data.password);
    navigate("/");
  };
  
  // Handle next step
  const handleNextStep = async () => {
    const emailField = form.getValues("email");
    const emailValid = await form.trigger("email");
    
    if (emailValid && emailField) {
      setCurrentStep(1);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };
  
  useEffect(() => {
    // Add a class to the body for background effect
    document.body.classList.add("auth-page");
    return () => {
      document.body.classList.remove("auth-page");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <Link to="/" className="inline-block mb-6">
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">The Socks Box</span>
          </Link>
          <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="border-2 shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">
                  {currentStep === 0 ? "Enter your email" : "Enter your password"}
                </CardTitle>
                <CardDescription>
                  {currentStep === 0 ? "We'll check if you have an account" : "Please enter your password to continue"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {currentStep === 0 ? (
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="email@example.com" 
                                  {...field}
                                  autoComplete="email"
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative">
                              <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <FormControl>
                                <Input 
                                  type={showPassword ? "text" : "password"}
                                  placeholder="••••••••" 
                                  {...field}
                                  autoComplete="current-password"
                                  className="pl-10 pr-10"
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={togglePasswordVisibility}
                                className="absolute right-0 top-0 h-full"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {currentStep === 0 ? (
                      <Button 
                        type="button" 
                        className="w-full"
                        onClick={handleNextStep}
                      >
                        Continue
                      </Button>
                    ) : (
                      <>
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Please wait
                            </>
                          ) : "Sign In"}
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          className="w-full mt-2"
                          onClick={() => setCurrentStep(0)}
                        >
                          Back
                        </Button>
                      </>
                    )}
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t pt-4">
                <div className="text-sm text-center text-muted-foreground">
                  <span>Don't have an account? </span>
                  <Link to="/register" className="text-primary hover:underline font-medium">
                    Sign Up
                  </Link>
                </div>
                <div className="text-xs text-center text-muted-foreground mt-4">
                  Hint: Use admin@example.com / password for admin access
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
