import { INTERNAL_ENDPOINTS } from "@/lib/ApiUrl";
import { Department } from "@/lib/types";
import { atom } from "jotai";

// Atom to hold the state for departments
const departmentsAtom = atom({
  data:undefined, // Holds the fetched departments data
  isLoading: false, // Indicates if data is still being fetched
  error: null, // Holds any error message encountered during the fetch
});
const selectedDepartmentAtom= atom<Department|null>(null)
// Atom to fetch data and update departmentsAtom
const refreshDepartmentsAtom = atom(
  null,
  async (_get, set) => {
    set(departmentsAtom, { data: undefined, isLoading: true, error: null }); // Set loading state

    try {
      const response = await fetch(`/api${INTERNAL_ENDPOINTS.DEPARTMENT}`); // Replace with actual API URL
      if (!response.ok) throw new Error("Failed to fetch departments");
      
      const data = await response.json();
      set(departmentsAtom, { data, isLoading: false, error: null }); // Update with data
    } catch (error:any) {
      set(departmentsAtom, { data: [], isLoading: false, error: error.message }); // Handle error
      console.error("Error fetching departments:", error);
    }
  }
);

export { departmentsAtom, refreshDepartmentsAtom, selectedDepartmentAtom };

