"use client"
import { fetchData } from '@/lib/fetch';
import { AppUsers, UserInfo } from '@/lib/types';
import React from 'react'
import { ClipLoader } from 'react-spinners';
import useSWR from 'swr';
import UserInfoCard from './UserInfoCard';
import UserMetaCard from './UserMetaCard';
import { INTERNAL_ENDPOINTS } from '@/lib/ApiUrl';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { userUiAtom } from '@/jotai/atoms/uiAtom';
const fetcher = (url: string) => fetchData<AppUsers>(url).then((data) => data ?? Promise.reject("No data"));

const UserDetails = ({ id }: { id: string }) => {
    const { data: user, error } = useSWR<AppUsers>(`/api${INTERNAL_ENDPOINTS.USER}?id=${id}`, fetcher);
    const setUserUi=useSetAtom(userUiAtom)
    const router= useRouter()
    function handleClose(){
        setUserUi(false)
        router.push('users')
    }
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className='flex justify-between'>
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                App User
            </h3>
            <Button onClick={handleClose} variant={'outline'} className='rounded-full h-10 w-10'>
                <X/>
            </Button>
            </div>
            <div className="space-y-6">
                {
                    error && (
                        <div>Error loading profile.</div>
                    )
                }
                {
                    !user ? <ClipLoader /> : (
                        <>

                            <UserMetaCard data={user as UserInfo} />
                            <UserInfoCard data={user as UserInfo} />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default UserDetails