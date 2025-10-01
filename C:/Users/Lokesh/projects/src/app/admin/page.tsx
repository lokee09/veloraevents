// This is a placeholder for the admin page.
// You can build out the admin functionality here.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome to the Admin Dashboard. Functionality to manage tournaments and leaderboards can be built here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
