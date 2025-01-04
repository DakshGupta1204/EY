"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loginUserThunk, registerUserThunk } from "@/store/thunks/authThunks";


const AuthenticationPage: React.FC = () => {
  const dispatch:AppDispatch = useDispatch();
  const router = useRouter();
  const { isLoading:loading, error,verified } = useSelector((state: RootState) => state.auth);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formType: "register" | "login"
  ) => {
    const { id, value } = e.target;
    if (formType === "register") {
      setRegisterForm((prev) => ({ ...prev, [id]: value }));
    } else {
      setLoginForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleRegister = async () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    await dispatch(
      registerUserThunk({
        name: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
        confirmPassword: registerForm.confirmPassword,
      })
    );
    if(verified)router.push("/dashboard"); // Redirect after successful registration
    else alert("Registration failed");
  };

  const handleLogin = async () => {
    await dispatch(
      loginUserThunk({
        email: loginForm.email,
        password: loginForm.password,
      })
    );
    if(verified)router.push("/dashboard"); // Redirect after successful login
    else alert(error);
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-yellow-400 overflow-hidden">
      {/* Floating bubbles */}
      {[...Array(7)].map((_, index) => (
        <div
          key={index}
          className="absolute w-32 h-32 bg-black rounded-full animate-bubble"
          style={{
            left: `${Math.random() * 100 - 10}%`,
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
                  <Input
                    id="username"
                    placeholder="Username"
                    value={registerForm.username}
                    onChange={(e) => handleInputChange(e, "register")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    value={registerForm.email}
                    onChange={(e) => handleInputChange(e, "register")}
                  />
                </div>
                <div className="space-y-1 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    value={registerForm.password}
                    onChange={(e) => handleInputChange(e, "register")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute top-8 right-2 text-gray-500 focus:outline-none"
                  >
                    {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="space-y-1 relative">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => handleInputChange(e, "register")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    className="absolute right-2 top-8 text-gray-500 focus:outline-none"
                  >
                    {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleRegister} disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
                {error && <p className="text-red-500">{error}</p>}
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
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={(e) => handleInputChange(e, "login")}
                  />
                </div>
                <div className="space-y-1 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => handleInputChange(e, "login")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-2 top-9 text-gray-500 focus:outline-none"
                  >
                    {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleLogin} disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
                {error && <p className="text-red-500">{error}</p>}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthenticationPage;
