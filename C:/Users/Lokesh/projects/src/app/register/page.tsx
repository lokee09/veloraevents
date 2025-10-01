'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { registerTeam, getRegistrationStatus } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { ArrowLeft, Loader2, ShieldX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const initialState = {
  message: '',
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full font-bold" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Submit Registration
    </Button>
  );
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerTeam, initialState);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [registrationsOpen, setRegistrationsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkStatus() {
        const status = await getRegistrationStatus();
        setRegistrationsOpen(status);
    }
    checkStatus();
  }, []);

  useEffect(() => {
    if (state?.message && state.errors && Object.keys(state.errors).length > 0) {
      const errorMessages = Object.values(state.errors).flat().join('\n');
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: errorMessages || state.message,
      });
    } else if (state?.message === '' && Object.keys(state.errors).length === 0 ) {
      toast({
          title: 'Registration Successful!',
          description: 'You can check your status on the status page.',
      });
      if (fileInputRef.current) {
        fileInputRef.current.form?.reset();
      }
    }
  }, [state, toast, router]);

  if (registrationsOpen === null) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Home</Link>
      </Button>

      { !registrationsOpen ? (
        <Card className="text-center">
            <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                    <ShieldX className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle className="font-headline text-2xl mt-4">Registrations Are Currently Closed</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    We are not accepting new registrations at this time. Please check back later or follow our social media for updates.
                </CardDescription>
            </CardContent>
        </Card>
      ) : (
        <form action={formAction}>
            <div className="space-y-8">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline text-2xl">Player & Team Details</CardTitle>
                <CardDescription>Enter your personal and in-game information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="ign">In-Game Name (IGN)</Label>
                    <Input id="ign" name="ign" placeholder="Your_IGN" required />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bgmiUid">BGMI UID</Label>
                    <Input id="bgmiUid" name="bgmiUid" placeholder="5123456789" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input id="teamName" name="teamName" placeholder="Your Awesome Team" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="9876543210" required />
                    </div>
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle className="font-headline text-2xl">Payment</CardTitle>
                <CardDescription>Complete the payment and provide the transaction details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4 text-center">
                    <p>Send the payment to the UPI ID below using any UPI app.</p>
                    <div className="bg-muted p-3 rounded-lg border-2 border-dashed border-primary">
                        <p className="text-lg font-bold tracking-widest text-primary">9381633712@ybl</p>
                    </div>
                    <p className="font-bold text-lg">Entry Fee: ₹100 per team</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="transactionId">Transaction ID / UPI Reference ID</Label>
                    <Input id="transactionId" name="transactionId" placeholder="Enter the 12-digit reference ID" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="screenshot">Payment Screenshot</Label>
                    <Input id="screenshot" name="screenshot" type="file" accept="image/*" required ref={fileInputRef} />
                    <p className="text-sm text-muted-foreground">Upload a clear screenshot of the successful payment.</p>
                </div>
                </CardContent>
            </Card>

            <SubmitButton />
            </div>
        </form>
      )}
    </div>
  );
}
