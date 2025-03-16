'use server';

import { cookies } from 'next/headers';

// Set both accessToken and refreshToken
export const setTokens = async (accessToken: string, id?:string) => {
  const cookiesStore = await cookies();

  // Store Access Token
  cookiesStore.set('token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 3600, // 1 hour
  });

  // Store Refresh Token (Longer expiry)
  cookiesStore.set('id', id as string, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 3600, // 7 Days
  });
};

export const getToken = async () => {
  const cookiesStore = await cookies();
  return cookiesStore.get('token')?.value;
};
export const getCookieId = async () => {
  const cookiesStore = await cookies();
  return cookiesStore.get('id')?.value;
};

export const getRefreshToken = async () => {
  const cookiesStore = await cookies();
  return cookiesStore.get('refreshToken')?.value;
};

export const removeTokens = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete('token');
  cookiesStore.delete('id');
  cookiesStore.delete('refreshToken');
};