import {INTERNAL_ENDPOINTS} from "@/lib/ApiUrl";
import {DataAtom,  Student} from "@/lib/types";
import {atom} from "jotai";
import {fetchData} from "@/lib/fetch";

// Atom to hold the state for Students
const StudentsAtom = atom({
  data:undefined, // Holds the fetched Students data
  isLoading: false, // Indicates if data is still being fetched
  error: null, // Holds any error message encountered during the fetch
});
const selectedStudentAtom= atom<Student|null>(null)
// Atom to fetch data and update StudentsAtom
const refreshStudentsAtom = atom(
  null,
  async (_get, set) => {
    set(StudentsAtom, { data: [], isLoading: true, error: null } satisfies DataAtom<Student[]>); // Set loading state

    try {
      const data = await fetchData<Student[]>(`/api${INTERNAL_ENDPOINTS.STUDENT}`); // Replace with actual API URL
     
      set(StudentsAtom, { data, isLoading: false, error: null }); // Update with data
    } catch (error:any) {
      set(StudentsAtom, { data: [], isLoading: false, error: error.message }); // Handle error
      console.error("Error fetching Students:", error);
    }
  }
);

export { StudentsAtom, refreshStudentsAtom, selectedStudentAtom };

