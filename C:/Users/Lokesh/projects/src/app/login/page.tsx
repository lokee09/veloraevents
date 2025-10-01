'use client';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/shared/Logo';
import { Loader2 } from 'lucide-react';

const LoginForm = dynamic(() => import('./components/login-form'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-56">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ),
});

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-2">
            <Logo />
            <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
          </div>
          <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
