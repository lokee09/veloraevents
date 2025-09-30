import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Award, ShieldCheck, Swords, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover object-top"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 p-4 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tighter mb-4 text-shadow-lg animate-fade-in-down">
              Battlegrounds Tournament Hub
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              The ultimate destination for competitive BGMI tournaments. Assemble your squad, prove your skills, and claim victory.
            </p>
            <Button asChild size="lg" className="font-bold text-lg animate-bounce">
              <Link href="/register">Register Now</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-12 md:py-20 bg-background">
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

      </main>
      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-card/50 border-border/50 text-center hover:scale-105 transition-transform duration-300">
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
