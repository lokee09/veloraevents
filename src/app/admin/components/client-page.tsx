'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from './data-table';
import { FileDown, Loader2 } from 'lucide-react';
import { getRegistrationsAsCsv } from '@/lib/actions';
import type { ColumnDef } from '@tanstack/react-table';
import type { Registration } from '@/lib/types';

interface ClientPageProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ClientPage({ columns, data }: ClientPageProps<Registration, any>) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    const csvData = await getRegistrationsAsCsv();
    if (csvData !== null) {
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `registrations-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setIsExporting(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight font-headline">Registrations</h2>
          <p className="text-muted-foreground">
            A total of {data.length} teams have registered.
          </p>
        </div>
        <Button onClick={handleExport} disabled={isExporting}>
          {isExporting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FileDown className="mr-2 h-4 w-4" />
          )}
          Export CSV
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
