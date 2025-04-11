'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { ClipLoader } from 'react-spinners';

// Components
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import SelectInput from '@/components/form/Select';

// Atoms
import { editUiAtom, modalAtom } from '@/jotai/atoms/uiAtom';
import { refreshStudentsAtom, selectedStudentAtom } from './studentAtoms';
import { departmentsAtom, refreshDepartmentsAtom } from '../department/departmentAtoms';

// Types and constants
import { ResponseDto, Department } from '@/lib/types';
import { INTERNAL_ENDPOINTS } from '@/lib/ApiUrl';
import { fetchData } from '@/lib/fetch';

const formSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    nationalId: z.string().min(6, 'National ID must be at least 6 characters'),
    admNo: z.string().min(3, 'Admission number must be at least 3 characters'),
    departmentId: z.string().min(1, 'Department is required'),
    isActive: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    nationalId: '',
    admNo: '',
    departmentId: '',
    isActive: true,
};

const StudentForm = () => {
    // State management
    const [isOpen, setIsOpen] = useAtom(modalAtom);
    const [isEditMode,setEditMode] = useAtom(editUiAtom);
    const selectedStudent = useAtomValue(selectedStudentAtom);
    const [, refetchStudents] = useAtom(refreshStudentsAtom);
    const departments = useAtomValue(departmentsAtom);
    const fetchDepartments = useSetAtom(refreshDepartmentsAtom);

    // Local state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form handling
    const {
        register,
        handleSubmit,
        reset,
        control, // <-- Add this
        formState: { errors, isDirty },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: 'onChange',
    });

    // Effects
    useEffect(() => {
        if (isOpen) {
            fetchDepartments();
            reset(isEditMode && selectedStudent ? selectedStudent : defaultValues);
        }
    }, [isOpen, isEditMode, selectedStudent, reset, fetchDepartments]);

    // Handlers
    const closeModal = () => {
        setIsOpen(false);
    };

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        console.log(data)
        try {
            const endpoint = isEditMode && selectedStudent
                ? `${INTERNAL_ENDPOINTS.STUDENT}/${selectedStudent.id}`
                : INTERNAL_ENDPOINTS.STUDENT;

            const method = isEditMode ? 'PUT' : 'POST';
            const payload = isEditMode ? { ...data, id: selectedStudent?.id } : data;
            const res = await fetchData<ResponseDto>(`/api${endpoint}`, {
                method,
                body: payload,
            });

            if (res?.success) {
                toast.success(`Student ${isEditMode ? 'updated' : 'created'} successfully`);
                await refetchStudents();
                reset();
                setEditMode(false)
                closeModal();
                
            } else {
                toast.error(res?.message || 'An error occurred');
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('An error occurred while processing your request.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Derived values
    const isLoading = isSubmitting || departments.isLoading;
    const submitButtonText = isEditMode ? 'Update Student' : 'Add Student';
    const modalTitle = `${isEditMode ? 'Edit' : 'Add'} Student`;

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[500px] m-4"
            aria-labelledby="student-form-title"
        >
            <div
                className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4
                        id="student-form-title"
                        className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90"
                    >
                        {modalTitle}
                    </h4>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                        {/* First Name */}
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                {...register('firstName')}
                                type="text"
                                disabled={isLoading}
                                aria-invalid={!!errors.firstName}
                                aria-describedby="firstName-error"
                            />
                            {errors.firstName && (
                                <p id="firstName-error" className="text-red-500 text-sm">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                {...register('lastName')}
                                type="text"
                                disabled={isLoading}
                                aria-invalid={!!errors.lastName}
                                aria-describedby="lastName-error"
                            />
                            {errors.lastName && (
                                <p id="lastName-error" className="text-red-500 text-sm">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                {...register('email')}
                                type="email"
                                disabled={isLoading}
                                aria-invalid={!!errors.email}
                                aria-describedby="email-error"
                            />
                            {errors.email && (
                                <p id="email-error" className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* National ID */}
                        <div>
                            <Label htmlFor="nationalId">National ID</Label>
                            <Input
                                id="nationalId"
                                {...register('nationalId')}
                                type="text"
                                disabled={isLoading}
                                aria-invalid={!!errors.nationalId}
                                aria-describedby="nationalId-error"
                            />
                            {errors.nationalId && (
                                <p id="nationalId-error" className="text-red-500 text-sm">
                                    {errors.nationalId.message}
                                </p>
                            )}
                        </div>

                        {/* Admission Number */}
                        <div>
                            <Label htmlFor="admNo">Admission Number</Label>
                            <Input
                                id="admNo"
                                {...register('admNo')}
                                type="text"
                                disabled={isLoading}
                                aria-invalid={!!errors.admNo}
                                aria-describedby="admNo-error"
                            />
                            {errors.admNo && (
                                <p id="admNo-error" className="text-red-500 text-sm">
                                    {errors.admNo.message}
                                </p>
                            )}
                        </div>

                        {/* Department */}
                        <div>
                            <Controller
                                name="departmentId"
                                control={control}
                                render={({ field }) => (
                                    <SelectInput<Department>
                                        label="Department"
                                        name={field.name}
                                        display="departmentName"
                                        valueKey="id"
                                        options={departments.data || []}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={isLoading}
                                    />
                                )}
                            />
                            {errors.departmentId && (
                                <p id="departmentId-error" className="text-red-500 text-sm">
                                    {errors.departmentId.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={closeModal}
                            type="button"
                            disabled={isLoading}
                            aria-label="Close form"
                        >
                            {isLoading ? <ClipLoader size={20} color="#3B82F6" /> : 'Close'}
                        </Button>
                        <Button
                            size="sm"
                            type="submit"
                            disabled={isLoading || !isDirty}
                            aria-label={submitButtonText}
                        >
                            {isLoading ? (
                                <ClipLoader size={20} color="#FFFFFF" />
                            ) : (
                                submitButtonText
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default StudentForm;