'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const TEACHER_PASSWORD = 'Mongy';
const AUTH_COOKIE_NAME = 'teacher-auth';

export async function login(prevState: { error: string | undefined }, formData: FormData) {
  const password = formData.get('password');
  if (password === TEACHER_PASSWORD) {
    cookies().set(AUTH_COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    return { success: true, error: undefined };
  } else {
    return { success: false, error: 'Mot de passe incorrect.' };
  }
}

export async function logout() {
  cookies().set(AUTH_COOKIE_NAME, '', { expires: new Date(0), path: '/' });
  redirect('/');
}
