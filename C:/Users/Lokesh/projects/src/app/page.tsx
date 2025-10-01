import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, ShieldCheck, Swords, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Leaderboard } from '@/components/home/Leaderboard';
import { Tournaments } from '@/components/home/Tournaments';

const heroImage = "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full h-[80vh] md:h-screen flex items-center justify-center text-center text-white overflow-hidden">
          <Image
              src={heroImage}
              alt="Esports tournament arena"
              fill
              className="object-cover object-center scale-105"
              priority
              data-ai-hint="esports tournament"
            />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 p-4 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tighter mb-4 text-shadow-lg bg-gradient-to-br from-primary via-fuchsia-400 to-white bg-clip-text text-transparent">
              DOMINATE THE ARENA
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-8 text-shadow-lg">
              The ultimate destination for competitive BGMI tournaments. Assemble your squad, prove your skills, and claim victory.
            </p>
            <Button asChild size="lg" className="font-bold text-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 rounded-full text-white transition-all duration-300 transform hover:scale-105">
              <Link href="/register">Register Now</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Compete With Us?</h2>
              <p className="text-muted-foreground mt-2">Experience the peak of mobile esports competition.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Swords className="h-10 w-10 text-primary" />}
                title="Intense Competition"
                description="Face off against the best teams and players in the community."
              />
              <FeatureCard
                icon={<Award className="h-10 w-10 text-primary" />}
                title="Massive Prize Pools"
                description="Compete for a chance to win exciting prizes and cash rewards."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Growing Community"
                description="Join a vibrant community of passionate BGMI players and fans."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                title="Fair & Secure"
                description="Our tournaments are managed professionally to ensure fair play for all."
              />
            </div>
          </div>
        </section>

        <Tournaments />
        <Leaderboard />

        <section id="coming-soon" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Something Big is Coming</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              We're constantly working on new features and bigger tournaments. Stay tuned for major announcements that will take your competitive experience to the next level.
            </p>
            <div className="mt-8">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">Follow Our Socials</Button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-card text-center border-border/50 hover:border-primary/80 transition-all duration-300 transform hover:-translate-y-2">
      <CardHeader className="flex items-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          {icon}
        </div>
        <CardTitle className="font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
