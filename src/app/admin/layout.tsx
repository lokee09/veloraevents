import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/lib/firebase/server';
import { clearSession } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { LogOut, Shield } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const sessionCookie = cookies().get('session')?.value;

  if (!adminAuth) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle>Server Not Configured</AlertTitle>
          <AlertDescription>
            The Firebase Admin SDK is not configured correctly. Please check the
            server logs for more details. Admin features are disabled.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    await adminAuth.verifySessionCookie(sessionCookie, true);
  } catch (error) {
    console.error('Session cookie verification failed:', error);
    // Clear the invalid cookie and redirect
    cookies().delete('session');
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo />
            <h1 className="text-xl font-bold font-headline">Admin Dashboard</h1>
          </Link>
          <form action={clearSession}>
            <Button variant="outline" type="submit">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
