import { Department } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import DepartmentActions from "./DepartmentActions";

export const useDepartmentColumns = (): ColumnDef<Department>[] => {
    return useMemo(() => [
        {
            accessorKey: "departmentName",
            header: "Name",
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => <DepartmentActions department={row.original} />,
        },
    ], []);
};


export default useDepartmentColumns;