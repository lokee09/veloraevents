'use client';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const { theme } = useTheme();

  const content = {
    esports: {
      headline: 'Dominate the Digital Arena',
      subtext: 'Join elite tournaments, prove your skill, and rise to become a legend in the world of esports.',
      button: 'Register Your Squad',
    },
    sports: {
      headline: 'Unleash Your Competitive Spirit',
      subtext: 'From the field to the court, compete in real-world sports tournaments and chase championship glory.',
      button: 'Join a Tournament',
    },
  };

  const currentContent = theme === 'esports' ? content.esports : content.sports;

  return (
    <section
      className={cn(
        'relative flex h-[80vh] w-full flex-col items-center justify-center text-center transition-all duration-500',
        theme === 'esports'
          ? 'bg-background text-foreground'
          : 'bg-gradient-to-b from-green-50 to-background'
      )}
    >
      {theme === 'esports' && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </>
      )}

      <div className="container relative z-10 px-4">
        <h1
          className={cn(
            'text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl',
            theme === 'esports' && 'text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400'
          )}
        >
          {currentContent.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
          {currentContent.subtext}
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className={cn(
            'font-semibold',
            theme === 'esports' && 'animate-glow shadow-primary/40'
          )}>
            <Link href="/register">
              {currentContent.button} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
