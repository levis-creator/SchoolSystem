import {INTERNAL_ENDPOINTS} from "@/lib/ApiUrl";
import {DataAtom,  Course} from "@/lib/types";
import {atom} from "jotai";
import {fetchData} from "@/lib/fetch";

// Atom to hold the state for Courses
const CoursesAtom = atom({
  data:undefined, // Holds the fetched Courses data
  isLoading: false, // Indicates if data is still being fetched
  error: null, // Holds any error message encountered during the fetch
});
const selectedCourseAtom= atom<Course|null>(null)
// Atom to fetch data and update CoursesAtom
const refreshCoursesAtom = atom(
  null,
  async (_get, set) => {
    set(CoursesAtom, { data: [], isLoading: true, error: null } satisfies DataAtom<Course[]>); // Set loading state

    try {
      const data = await fetchData<Course[]>(`/api${INTERNAL_ENDPOINTS.COURSE}`); // Replace with actual API URL
     
      set(CoursesAtom, { data, isLoading: false, error: null }); // Update with data
    } catch (error:any) {
      set(CoursesAtom, { data: [], isLoading: false, error: error.message }); // Handle error
      console.error("Error fetching Courses:", error);
    }
  }
);

export { CoursesAtom, refreshCoursesAtom, selectedCourseAtom };

