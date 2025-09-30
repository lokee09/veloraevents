import { adminDb } from '@/lib/firebase/server';
import type { Registration } from '@/lib/types';
import { columns } from './components/columns';
import { ClientPage } from './components/client-page';

async function getRegistrations(): Promise<Registration[]> {
  try {
    const snapshot = await adminDb.collection('registrations').orderBy('createdAt', 'desc').get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Registration));
  } catch (error) {
    console.error("Error fetching registrations: ", error);
    return [];
  }
}

export default async function AdminPage() {
  const registrations = await getRegistrations();

  return (
    <div className="container mx-auto">
      <ClientPage data={registrations} columns={columns} />
    </div>
  );
}
