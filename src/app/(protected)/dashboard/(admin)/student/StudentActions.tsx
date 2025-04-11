"use cli"
import DeleteModal from "@/components/modals/DeleteModal";
import { Button } from "@/components/ui/button";
import { deleteUiAtom, editUiAtom, modalAtom } from "@/jotai/atoms/uiAtom";
import { INTERNAL_ENDPOINTS } from "@/lib/ApiUrl";
import { fetchData } from "@/lib/fetch";
import { ResponseDto, Student } from "@/lib/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { MoreHorizontal } from "lucide-react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { refreshStudentsAtom, selectedStudentAtom } from "./studentAtoms";
import { useRouter } from "next/navigation";

const StudentActions = ({ student }: { student: Student }) => {
    const setSelectedStudent = useSetAtom(selectedStudentAtom);
    const selectedStudent = useAtomValue(selectedStudentAtom);
    const setEditData = useSetAtom(editUiAtom);
    const setModal = useSetAtom(modalAtom);
    const setDelete = useSetAtom(deleteUiAtom);
    const [, refreshData] = useAtom(refreshStudentsAtom);
    const router = useRouter();

    const handleEdit = useCallback(() => {
        setSelectedStudent(student);
        setEditData(true);
        setModal(true);
    }, [student, setSelectedStudent, setEditData, setModal]);

    const handleDelete = useCallback(() => {
        setSelectedStudent(student);
        setDelete(true);
    }, [student, setSelectedStudent, setDelete]);
    const handleDetail = useCallback(() => {
        router.push(`/dashboard/student/${student?.id}`)
    }, [router, student])
    const deleteItem = useCallback(async () => {
        if (!selectedStudent?.id) return;

        const url = `/api/${INTERNAL_ENDPOINTS.STUDENT}/${selectedStudent.id}`;
        try {
            const results = await fetchData<ResponseDto>(url, { method: 'DELETE' });
            if (results?.success) {
                toast.success("Deleted Successfully");
                refreshData();
                setDelete(false);
            } else {
                toast.error(results?.message || "Failed to delete Student");
            }
        } catch (error: unknown) {
            console.error(error)
            toast.error("An error occurred while deleting the Student");
        }
    }, [selectedStudent, refreshData, setDelete]);

    return (
        <>
            <DeleteModal
                title="Delete Student"
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
                        onClick={handleDetail}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                    >
                        View
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

export default StudentActions;