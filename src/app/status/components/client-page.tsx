'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { getRegistrationByEmail } from '@/lib/actions';
import type { Registration } from '@/lib/types';
import Image from 'next/image';

export function ClientPage() {
  const [email, setEmail] = useState('');
  const [registration, setRegistration] = useState<Registration | null | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistration(undefined);
    startTransition(async () => {
      const result = await getRegistrationByEmail(email);
      setRegistration(result);
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Check Registration Status</CardTitle>
          <CardDescription>Enter your email address used during registration to find your details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <div className="flex-grow space-y-2">
              <Label htmlFor="email" className="sr-only">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-lg"
              />
            </div>
            <Button type="submit" className="h-12" disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isPending && (
        <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {registration === null && !isPending && (
        <Card>
          <CardHeader>
            <CardTitle>No Registration Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We couldn't find a registration with the email address <span className='font-bold'>{email}</span>. Please make sure you entered it correctly or try another email.</p>
          </CardContent>
        </Card>
      )}

      {registration && !isPending && (
        <Card>
          <CardHeader>
            <CardTitle>Registration Found!</CardTitle>
            <CardDescription>Here are the details for your team registration.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <InfoItem label="Team Name" value={registration.teamName} />
                <InfoItem label="Full Name" value={registration.fullName} />
                <InfoItem label="In-Game Name (IGN)" value={registration.ign} />
                <InfoItem label="BGMI UID" value={registration.bgmiUid} />
                <InfoItem label="Email" value={registration.email} />
                <InfoItem label="Phone" value={registration.phone} />
                <InfoItem label="Transaction ID" value={registration.transactionId} />
                <InfoItem label="Registered At" value={new Date(registration.createdAt).toLocaleString()} />
            </div>
            <div className="space-y-2 pt-4">
                <Label>Payment Screenshot</Label>
                 <a href={registration.screenshotUrl} target="_blank" rel="noopener noreferrer">
                    <Image
                        src={registration.screenshotUrl}
                        alt="Payment Screenshot"
                        width={300}
                        height={400}
                        className="rounded-md border-2 border-primary hover:opacity-80 transition-opacity"
                    />
                 </a>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
        </div>
    )
}
