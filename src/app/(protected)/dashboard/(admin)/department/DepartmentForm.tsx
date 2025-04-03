'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { refreshDepartmentsAtom, selectedDepartmentAtom } from '@/jotai/atoms/departmentAtoms';
import { editUiAtom, modalAtom } from '@/jotai/atoms/uiAtom';
import { INTERNAL_ENDPOINTS } from '@/lib/ApiUrl';
import { fetchData } from '@/lib/fetch';
import { Department, ResponseDto } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { ClipLoader } from 'react-spinners'; // Import a spinner for the loading state
import Label from '@/components/form/Label';
import TextArea from '@/components/form/input/TextArea';
import Input from '@/components/form/input/InputField';

const schema = z.object({
    departmentName: z.string().min(3, 'Department name must be at least 3 characters'),
    description: z.string().min(5, 'Description must be at least 5 characters'),
});

type FormValues = z.infer<typeof schema>;

const DepartmentForm = () => {
    const [isOpen, setIsOpen] = useAtom(modalAtom);
    const edit = useAtomValue(editUiAtom);
    const selectedDepartment = useAtomValue(selectedDepartmentAtom);
    const [, refetchData] = useAtom(refreshDepartmentsAtom);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state for the buttons

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            departmentName: '',
            description: '',
        },
    });

    // Reset the form when `selectedDepartment` changes
    useEffect(() => {
        if (selectedDepartment) {
            setDisabled(false);
            reset(selectedDepartment); // Reset the form with the selected department's data
        } else {
            reset({ departmentName: '', description: '' }); // Reset to empty form if no department is selected
        }
    }, [selectedDepartment, reset]);

    const closeModal = () => {
        setIsOpen(false);
    };

    const onSubmit = async (data: Department) => {
        setLoading(true); // Start loading
        setDisabled(true); // Disable buttons

        try {
            const url = `/api${INTERNAL_ENDPOINTS.DEPARTMENT}/${edit ? selectedDepartment?.id : ''}`;
            const method = edit ? 'PUT' : 'POST';
            if (edit) {
                data.id = selectedDepartment?.id;
            }

            const res = await fetchData<ResponseDto>(url, {
                method,
                body: data,
            });
            console.log()
            if (res?.success) {
                refetchData();
                closeModal();
            }
        } catch (error: unknown) {
            console.log(error)
            toast.error("An error occurred while processing your request.");
        } finally {

            setLoading(false); // Stop loading
            setDisabled(false); // Re-enable buttons
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
            <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {edit ? "Edit" : "Add"} Department
                    </h4>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                        <div>
                            <Label>Department Name</Label>
                            <Input
                                {...register('departmentName')}
                                name="departmentName"
                                type="text"
                            />
                            {errors.departmentName && (
                                <p className="text-red-500 text-sm">{errors.departmentName.message}</p>
                            )}
                        </div>
                        <div>
                            <Label>Description</Label>
                            <TextArea
                                {...register('description')}
                                name="description"
                                placeholder="Description"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={closeModal}
                            type="button"
                            disabled={disabled || loading} // Disable button when loading
                        >
                            {loading ? <ClipLoader size={20} color="#3B82F6" /> : "Close"}
                        </Button>
                        <Button
                            size="sm"
                            type="submit"
                            disabled={disabled || loading} // Disable button when loading
                        >
                            {loading ? <ClipLoader size={20} color="#FFFFFF" /> : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default DepartmentForm;