"use client"
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import useSWR from "swr";
import { fetchData } from "@/lib/fetch";
import { UserInfo } from "@/lib/types";
import { ClipLoader } from 'react-spinners'
const fetcher = (url: string) => fetchData<UserInfo>(url).then((data) => data ?? Promise.reject("No data"));

export default function Profile() {
  const { data: user, error } = useSWR<UserInfo>("/api/auth/user", fetcher);

  return (

    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Profile
      </h3>
      <div className="space-y-6">
        {
          error && (
            <div>Error loading profile.</div>
          )
        }
        {
          !user ? <ClipLoader /> : (
            <>

              <UserMetaCard data={user} />
              <UserInfoCard data={user} />
            </>
          )
        }
      </div>
    </div>


  );
}
