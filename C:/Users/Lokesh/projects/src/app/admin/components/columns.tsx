'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { Registration } from '@/lib/types';
import { ArrowUpDown, Image as ImageIcon, MoreHorizontal, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState, useTransition } from 'react';
import { deleteRegistration } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

function DeleteAction({ registrationId, teamName }: { registrationId: string, teamName: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteRegistration(registrationId);
                toast({
                    title: "Registration Deleted",
                    description: `The registration for team "${teamName}" has been removed.`,
                });
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to delete the registration.",
                });
            } finally {
                setIsOpen(false);
            }
        });
    };

    return (
        <>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete the registration for team <span className="font-bold">"{teamName}"</span>. This action cannot be undone.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isPending} className="bg-destructive hover:bg-destructive/90">
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <DropdownMenuItem onClick={() => setIsOpen(true)} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
            </DropdownMenuItem>
        </>
    );
}

export const columns: ColumnDef<Registration>[] = [
  {
    accessorKey: 'teamName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Team Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'ign',
    header: 'In-Game Name (IGN)',
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'bgmiUid',
    header: 'BGMI UID',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
  },
  {
    accessorKey: 'screenshotUrl',
    header: 'Screenshot',
    cell: ({ row }) => {
      const url = row.getValue('screenshotUrl') as string;
      return (
        <Button variant="ghost" size="icon" asChild>
          <Link href={url} target="_blank" rel="noopener noreferrer">
            <ImageIcon className="h-4 w-4" />
          </Link>
        </Button>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Registered At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    cell: ({ row }) => {
      const timestamp = row.getValue('createdAt');
      if (typeof timestamp === 'number') {
        return <div>{new Date(timestamp).toLocaleString()}</div>;
      }
      return <div>Invalid Date</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const registration = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DeleteAction registrationId={registration.id} teamName={registration.teamName} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
