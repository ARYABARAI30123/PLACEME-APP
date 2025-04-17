
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/utils/auth';
import { useAuth } from '@/components/AuthProvider';
import { Mail, Lock, ArrowRight, User2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, role);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Placement Portal</h1>
          <p className="text-text-subtle mt-2">Connect with opportunities</p>
        </div>

        <Card className="glassmorphism border-none">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-text">Login</CardTitle>
            <CardDescription className="text-center">
              Choose your role and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full" onValueChange={(value) => setRole(value as UserRole)}>
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-xl">
                <TabsTrigger value="student" className="rounded-xl micro-interaction">Student</TabsTrigger>
                <TabsTrigger value="admin" className="rounded-xl micro-interaction">Admin</TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10 rounded-xl border-muted"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 rounded-xl border-muted"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-6 bg-primary hover:bg-primary/90 rounded-xl micro-interaction"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                
                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background/30 backdrop-blur-sm px-2 text-text-subtle">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="w-full rounded-xl micro-interaction" type="button">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full rounded-xl micro-interaction" type="button">
                      <svg className="h-4 w-4 mr-2" fill="#0078d4" viewBox="0 0 23 23">
                        <path d="M21.1789 12.7888C21.1789 9.1622 19.5402 6.3123 16.9962 4.7323C16.9962 8.77 14.6255 12.055 11.4225 13.2533V2H9.87694V21.6667L11.1921 22.0001C15.2141 21.6334 21.1789 17.8387 21.1789 12.7888Z" />
                        <path d="M1 12.7888C1 17.655 5.56061 21.6334 9.87694 22.0001V3.53342C5.23887 3.90009 1 7.92334 1 12.7888Z" />
                      </svg>
                      Microsoft
                    </Button>
                  </div>
                </div>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <div className="text-sm text-text-subtle">
              First time? 
              <Button variant="link" className="pl-1 text-primary micro-interaction">
                <span>Get started</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
