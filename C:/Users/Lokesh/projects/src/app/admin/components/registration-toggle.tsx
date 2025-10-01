'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { toggleRegistrationStatus } from '@/lib/actions';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RegistrationToggleProps {
  initialStatus: boolean;
}

export function RegistrationToggle({ initialStatus }: RegistrationToggleProps) {
  const [isOpen, setIsOpen] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleClick = () => {
    startTransition(async () => {
      const newStatus = await toggleRegistrationStatus();
      setIsOpen(newStatus);
      toast({
        title: 'Registration Status Updated',
        description: `Registrations are now ${newStatus ? 'OPEN' : 'CLOSED'}.`,
      });
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending} variant={isOpen ? 'destructive' : 'default'}>
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : isOpen ? (
        'Close Registrations'
      ) : (
        'Open Registrations'
      )}
    </Button>
  );
}
