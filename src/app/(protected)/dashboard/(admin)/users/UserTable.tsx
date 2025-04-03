"use client"
import DataTable from '@/components/tables/DataTable';
import { fetchData } from '@/lib/fetch';
import { AppUsers } from '@/lib/types';
import { ClipLoader } from 'react-spinners';
import useSWR from 'swr';
import { getColumns } from './userColum';
import {ENDPOINT} from "@/lib/ApiUrl";
const fetcher = (url: string) => fetchData<AppUsers[]>(url).then((data) => data ?? Promise.reject("No data"));

const UserTable = () => {
    const { data,isLoading, error } = useSWR<AppUsers[]>("/api/users", fetcher);
    
   
    if(isLoading)
        return <ClipLoader/>;
    if(error) {
        console.log(data)
        return <div>Error Fetching Data</div>
    }
  return (
    <> <DataTable columns={getColumns()} data={data as AppUsers[]}/></>
  )
}

export default UserTable