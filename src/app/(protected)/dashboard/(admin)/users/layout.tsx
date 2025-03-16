"use client"
import { userUiAtom } from '@/jotai/atoms/uiAtom';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

const UserLayout = ({ children, details }: {
  children: React.ReactNode;
  details: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useAtom(userUiAtom)
  const searchParam = useSearchParams()

  useEffect(() => {
    async function fetchParam() {

      const id = await searchParam.get("id")
      if (id) {
        setIsOpen(true);
      } else {
        setIsOpen(false)
      }
    }
    fetchParam()
  }, [searchParam, setIsOpen])

  return (
    <div className="flex h-screen">
      {/* Left Side: Table */}
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>
      {/* Right Side: Details */}
      {
        isOpen && (

          <div className="flex-1 overflow-y-auto p-4 border-l border-gray-200 ">
            {details}
          </div>
        )
      }
    </div>
  )
}

export default UserLayout