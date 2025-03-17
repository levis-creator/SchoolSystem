import React, { FC } from 'react'
import PageBreadcrumb from '../common/PageBreadCrumb';
import Button from '../ui/button/Button';
import { Plus } from 'lucide-react';
interface BlankDataPageProps{
    pageTitle:string;
    data?:object;
}
const BlankDataPage:FC<BlankDataPageProps> = ({pageTitle, data=[]}) => {
  return (
    <div>
    <PageBreadcrumb pageTitle={pageTitle} />
    <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
     <div className="flex">
        <Button>Add {pageTitle} <Plus/></Button>
     </div>
    </div>
  </div>
  )
}

export default BlankDataPage