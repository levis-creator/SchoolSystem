import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import StudentActions from "./StudentActions";
import { Student } from "@/lib/types";

export const useStudentColumns = (): ColumnDef<Student>[] => {
    return useMemo(() => [
        {
            accessorKey: "firstName",
            header: "First Name",
        },
        {
            accessorKey: "lastName",
            header: "Last Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "nationalId",
            header: "National ID",
        },
        {
            accessorKey: "admNo",
            header: "Admission No",
        },
        {
            accessorKey: "departmentName",
            header: "Department",
        },
        {
            accessorKey: "departmentCode",
            header: "Department Code",
        },
        {
            accessorKey: "isActive",
            header: "Active",
            cell: ({ row }) => (row.original.isActive ? "Yes" : "No"),
           
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => <StudentActions student={row.original} />, 
            meta: {
                sticky: true, 
            },

        },
    ], []);
};

export default useStudentColumns;
