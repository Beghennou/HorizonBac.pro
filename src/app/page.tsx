import { LoginForm } from '@/app/teacher/login-form';
import { Logo } from '@/components/logo';

export default function Home() {

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-racing-orange border-2 border-accent shadow-lg">
             <Logo className="w-12 h-12 text-white" />
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
