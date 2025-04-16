import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import CourseActions from "./CourseActions";
import { Course } from "@/lib/types";

export const useCourseColumns = (): ColumnDef<Course>[] => {
    return useMemo(() => [
        {
            accessorKey: "courseName",
            header: "Course Name",
        },
        {
            accessorKey: "courseCode",
            header: "Course Code",
        },
        {
            accessorKey: "credits",
            header: "Credits",
        },
        {
            accessorKey: "departmentName",
            header: "Department",
        },
        
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => <CourseActions Course={row.original} />, 
            meta: {
                sticky: true, 
            },

        },
    ], []);
};

export default useCourseColumns;
