import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import UserTable from './UserTable'

const UsersPage =  () => {
    return (
        <div>
            <PageBreadcrumb pageTitle="App Users" />
            <div className=" rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
               <UserTable/>
            </div>
        </div>
    )
}

export default UsersPage