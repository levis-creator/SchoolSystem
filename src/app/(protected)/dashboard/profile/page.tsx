"use client"
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { ClipLoader } from 'react-spinners';
import { userAtom } from "@/jotai/atoms/userAtom";
import { UserInfo } from "@/lib/types";
import UserProfile from "@/components/user-profile/UserProfile";

export default function Profile() {
  const userInfo = useAtomValue(userAtom);
  const [user, setUser] = useState<null | UserInfo>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    setLoading(true);
    fetch(`/api/auth/user?id=${userInfo?.id}`)
      .then(async (res) => {
        const result = await res.json();
        console.log(result)
        setUser(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userInfo]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Profile
      </h3>
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center">
            <ClipLoader size={30} color="#4A90E2" />
          </div>
        ) : (
          <UserProfile user={user} />
        )}
      </div>
    </div>
  );
}
