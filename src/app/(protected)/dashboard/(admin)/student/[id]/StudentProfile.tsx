"use client"
import UserProfile from '@/components/user-profile/UserProfile';
import { INTERNAL_ENDPOINTS } from '@/lib/ApiUrl';
import { fetchData } from '@/lib/fetch';
import { Student } from '@/lib/types';
import { MoreHorizontal } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import useSWR from 'swr';
import StudentDownloadAction from './StudentDownloadAction';

const fetcher = (url: string) => fetchData<Student>(url).then((data) => data ?? Promise.reject("No data"));
const StudentProfile = ({ id }: { id: string | number }) => {
    const { data, isLoading } = useSWR<Student>(`/api${INTERNAL_ENDPOINTS.STUDENT}/${id}`, fetcher);
    return (
        <>
        {
            isLoading?
            <ClipLoader/>:
            <UserProfile user={data as Student} actions={<StudentDownloadAction/>} />
        }
        </>
    )
}

export default StudentProfile