import { AppUsers } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link"; // Import Link from Next.js

export const getColumns = (): ColumnDef<AppUsers>[] => [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            // Get the ID of the current row
            const id = row.original.id;
            // Render the name as a link
            return (
                <Link href={`users?id=${id}`} className="text-blue-600 hover:text-blue-800">
                    {row.getValue("name")}
                </Link>
            );
        },
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
    },
];