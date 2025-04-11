import {INTERNAL_ENDPOINTS} from "@/lib/ApiUrl";
import {DataAtom, Department} from "@/lib/types";
import {atom} from "jotai";
import {fetchData} from "@/lib/fetch";

// Atom to hold the state for departments
const departmentsAtom = atom({
    data: undefined, // Holds the fetched departments data
    isLoading: false, // Indicates if data is still being fetched
    error: null, // Holds any error message encountered during the fetch
});
const selectedDepartmentAtom = atom<Department | null>(null)
// Atom to fetch data and update departmentsAtom
const refreshDepartmentsAtom = atom(
    null,
    async (_get, set) => {
        set(departmentsAtom, {data: [], isLoading: true, error: null} satisfies DataAtom<Department[]>); // Set loading state

        try {
            const data = await fetchData<Department[]>(`/api${INTERNAL_ENDPOINTS.DEPARTMENT}`); // Replace with actual API URL
            set(departmentsAtom, {data, isLoading: false, error: null}); // Update with data
        } catch (error: any) {
            set(departmentsAtom, {data: [], isLoading: false, error: error.message}); // Handle error
            console.error("Error fetching departments:", error);
        }
    }
);

export {departmentsAtom, refreshDepartmentsAtom, selectedDepartmentAtom};

