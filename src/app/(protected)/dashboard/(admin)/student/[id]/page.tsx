import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import React from 'react'
import StudentProfile from './StudentProfile'

const StudentDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  return (
    <>
      <PageBreadcrumb pageTitle='Student' />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <StudentProfile id={id} />
      </div>
    </>
  )
}

export default StudentDetail