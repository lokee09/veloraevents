// This is a placeholder for the register page.
// You can build out the registration form here.
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Register Your Team</CardTitle>
          <CardDescription>Fill out the form below to enter the tournament.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input id="teamName" placeholder="e.g., The Champions" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="playerName">Your Name</Label>
              <Input id="playerName" placeholder="e.g., Alex Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <Button type="submit" className="w-full">Submit Registration</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
