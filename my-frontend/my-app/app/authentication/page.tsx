"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const AuthenticationPage: React.FC = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleTabChange = () => {
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, 100); // A short delay for smooth transition
  };

  useEffect(() => {
    setIsLoaded(true); // Initially load after a short delay
  }, []);

  return (
    <div className="relative flex justify-center items-center h-screen bg-yellow-400 overflow-hidden">
      {/* Floating bubbles */}
      {[...Array(7)].map((_, index) => (
        <div
          key={index}
          className="absolute w-32 h-32 bg-black rounded-full animate-bubble"
          style={{
            left: `${Math.random() * 100-10}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random()}s`,
          }}
        />
      ))}

      <div className="w-full max-w-[400px] bg-white rounded-xl shadow-lg p-4 z-10">
        <Tabs defaultValue="register" className="">
          <TabsList className="grid w-full grid-cols-2 bg-black h-[fit-content]">
            <TabsTrigger value="register" className="text-white text-1xl">
              Register
            </TabsTrigger>
            <TabsTrigger value="login" className="text-white text-1xl">
              Login
            </TabsTrigger>
          </TabsList>

          {/* Register Tab */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-4xl">Register</CardTitle>
                <CardDescription>
                  Make your account and start your journey !!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Username" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Email" />
                </div>
                <div className="space-y-1 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-8 right-2 text-gray-500 focus:outline-none"
                  >
                    {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="space-y-1 relative">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input
                    id="confirm_password"
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-2 top-8 text-gray-500 focus:outline-none"
                  >
                    {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Register</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-4xl">Login</CardTitle>
                <CardDescription>
                  Welcome back !! Login to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Email" />
                </div>
                <div className="space-y-1 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-9 text-gray-500 focus:outline-none"
                  >
                    {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthenticationPage;
