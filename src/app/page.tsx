import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'f1-hero');

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage?.imageUrl || "https://picsum.photos/seed/f1hero/1920/1080"}
          alt={heroImage?.description || "Racing car on a track"}
          fill
          className="object-cover"
          data-ai-hint={heroImage?.imageHint}
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>
      
      <main className="relative z-10 flex flex-col items-center justify-center space-y-8 p-4 text-center text-white">
        <h1 className="font-headline text-6xl font-bold tracking-widest text-primary drop-shadow-lg md:text-8xl lg:text-9xl">
          Formula Skills Garage
        </h1>
        <p className="max-w-2xl font-body text-lg text-neutral-200 md:text-xl">
          Accelerate your engineering skills. From the classroom to the racetrack.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="font-bold text-lg px-8 py-6 uppercase tracking-wider">
            <Link href="/student">Student Access</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="font-bold text-lg px-8 py-6 uppercase tracking-wider border-2 border-accent text-accent hover:bg-accent hover:text-black">
            <Link href="/teacher">Teacher Portal</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
