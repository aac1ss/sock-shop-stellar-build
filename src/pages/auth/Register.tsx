
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
import { Eye, EyeOff, Loader2, User, Mail, LockKeyhole, ArrowLeft, ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type FormValues = z.infer<typeof formSchema>;

const Register = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme } = useTheme();
  const [step, setStep] = useState(0);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    mode: "onChange"
  });
  
  const onSubmit = async (data: FormValues) => {
    await register(data.name, data.email, data.password);
    navigate("/");
  };
  
  const handleNext = async () => {
    let canProceed = false;
    
    if (step === 0) {
      const nameValid = await form.trigger("name");
      canProceed = nameValid;
    } else if (step === 1) {
      const emailValid = await form.trigger("email");
      canProceed = emailValid;
    } else if (step === 2) {
      const passwordValid = await form.trigger("password");
      canProceed = passwordValid;
    }
    
    if (canProceed) {
      setStep(prev => prev + 1);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
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
          <h1 className="text-2xl font-semibold mb-1">Create an account</h1>
          <p className="text-muted-foreground">Join us and start shopping today</p>
        </div>
        
        <Card className="border-2 shadow-lg overflow-hidden">
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">
                {step === 0 && "Personal Information"}
                {step === 1 && "Email Address"}
                {step === 2 && "Create Password"}
                {step === 3 && "Confirm Password"}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Step {step + 1} of 4
              </div>
            </div>
            <Progress value={(step + 1) * 25} className="h-1" />
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {step === 0 && (
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <CardDescription className="mb-3">
                              Please enter your full name
                            </CardDescription>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <FormControl>
                                <Input 
                                  placeholder="John Doe" 
                                  {...field}
                                  autoComplete="name"
                                  className="pl-10"
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {step === 1 && (
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <CardDescription className="mb-3">
                              Enter an email address you'd like to use
                            </CardDescription>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <FormControl>
                                <Input 
                                  placeholder="email@example.com" 
                                  type="email"
                                  {...field}
                                  autoComplete="email"
                                  className="pl-10"
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {step === 2 && (
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <CardDescription className="mb-3">
                              Create a strong password for your account
                            </CardDescription>
                            <div className="relative">
                              <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <FormControl>
                                <Input 
                                  type={showPassword ? "text" : "password"}
                                  placeholder="••••••••" 
                                  {...field}
                                  autoComplete="new-password"
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
                    
                    {step === 3 && (
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <CardDescription className="mb-3">
                              Confirm your password to continue
                            </CardDescription>
                            <div className="relative">
                              <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <FormControl>
                                <Input 
                                  type={showConfirmPassword ? "text" : "password"}
                                  placeholder="••••••••" 
                                  {...field}
                                  autoComplete="new-password"
                                  className="pl-10 pr-10"
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-0 top-0 h-full"
                              >
                                {showConfirmPassword ? (
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
                    
                    <div className="flex justify-between mt-6">
                      <Button 
                        type="button" 
                        variant="ghost"
                        onClick={() => setStep(prev => prev - 1)}
                        disabled={step === 0}
                        className={step === 0 ? 'opacity-0 cursor-default' : ''}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      
                      {step < 3 ? (
                        <Button 
                          type="button" 
                          onClick={handleNext}
                        >
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating account
                            </>
                          ) : "Create Account"}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <div className="text-sm text-center text-muted-foreground">
              <span>Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
