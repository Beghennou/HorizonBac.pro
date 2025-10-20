import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LoginForm } from './login-form';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TeacherLoginPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'f1-hero');

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <div className="absolute inset-0">
        <Image
          src={heroImage?.imageUrl || "https://picsum.photos/seed/f1hero/1920/1080"}
          alt={heroImage?.description || "Racing car on a track"}
          fill
          className="object-cover"
          data-ai-hint={heroImage?.imageHint}
          priority
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      
      <Button asChild variant="ghost" className="absolute top-4 left-4 z-10 text-white hover:text-primary hover:bg-white/10">
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
