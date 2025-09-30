import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ClientPage } from './components/client-page';

export default function StatusPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>
      <ClientPage />
    </div>
  );
}
