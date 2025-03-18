import DeleteModal from "@/components/modals/DeleteModal";
import { Button } from "@/components/ui/button";
import { selectedDepartmentAtom, refreshDepartmentsAtom } from "@/jotai/atoms/departmentAtoms";
import { editUiAtom, modalAtom, deleteUiAtom } from "@/jotai/atoms/uiAtom";
import { ENDPOINT } from "@/lib/ApiUrl";
import { fetchData } from "@/lib/fetch";
import { Department, ResponseDto } from "@/lib/types";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import { MoreHorizontal } from "lucide-react";
import { useCallback } from "react";
import toast from "react-hot-toast";

const DepartmentActions = ({ department }: { department: Department }) => {
    const setSelectedDepartment = useSetAtom(selectedDepartmentAtom);
    const selectedDepartment = useAtomValue(selectedDepartmentAtom);
    const setEditData = useSetAtom(editUiAtom);
    const setModal = useSetAtom(modalAtom);
    const setDelete = useSetAtom(deleteUiAtom);
    const [, refreshData] = useAtom(refreshDepartmentsAtom);

    const handleEdit = useCallback(() => {
        setSelectedDepartment(department);
        setEditData(true);
        setModal(true);
    }, [department, setSelectedDepartment, setEditData, setModal]);

    const handleDelete = useCallback(() => {
        setSelectedDepartment(department);
        setDelete(true);
    }, [department, setSelectedDepartment, setDelete]);

    const deleteItem = useCallback(async () => {
        if (!selectedDepartment?.id) return;

        const url = `${ENDPOINT.DEPARTMENT}/${selectedDepartment.id}`;
        try {
            const results = await fetchData<ResponseDto>(url, { method: 'DELETE' });
            if (results?.success) {
                toast.success("Deleted Successfully");
                refreshData();
                setDelete(false);
            } else {
                toast.error(results?.message || "Failed to delete department");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the department");
        }
    }, [selectedDepartment, refreshData, setDelete]);

    return (
        <>
            <DeleteModal
                title="Delete Department"
                description="You are about to permanently delete this data. Are you sure you want to delete?"
                handleDelete={deleteItem}
                confirmText="Delete"
                cancelText="Cancel"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="min-w-[150px] bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
                >
                    <DropdownMenuItem
                        onClick={handleEdit}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleDelete}
                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900 cursor-pointer"
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default DepartmentActions;