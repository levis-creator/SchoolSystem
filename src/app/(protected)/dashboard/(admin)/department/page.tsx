import BlankDataPage from '@/components/tables/BlankDataPage'
import { API_URL, INTERNAL_ENDPOINTS } from '@/lib/ApiUrl'
import { fetchData } from '@/lib/fetch'
import { Department } from '@/lib/types'

const DepartmentPage = async () => {
    const departments = await fetchData<Department[]>(`${API_URL.INTERNAL}/api${INTERNAL_ENDPOINTS.DEPARTMENT}`);
    return (
        <>
            <BlankDataPage pageTitle='Department' data={departments!} />
        </>
    )
}

export default DepartmentPage