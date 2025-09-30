'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { Registration } from '@/lib/types';
import { ArrowUpDown, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
      const timestamp = row.getValue('createdAt') as number;
      return <div>{new Date(timestamp).toLocaleDateString()}</div>;
    },
  },
];
