import UserDetails from '@/components/user-profile/UserDetails';
import React from 'react'

export default async function UserDetailsPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const {id}=await searchParams
  return (
    <>
    <UserDetails id={id}/>
    </>
  )
}

