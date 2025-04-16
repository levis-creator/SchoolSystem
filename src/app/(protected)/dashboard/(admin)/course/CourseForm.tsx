'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import * as z from 'zod';

// Components
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import SelectInput from '@/components/form/Select';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

// Atoms
import { editUiAtom, modalAtom } from '@/jotai/atoms/uiAtom';
import { departmentsAtom, refreshDepartmentsAtom } from '../department/departmentAtoms';
import { refreshCoursesAtom, selectedCourseAtom } from './courseAtoms';

// Types and constants
import { INTERNAL_ENDPOINTS } from '@/lib/ApiUrl';
import { fetchData } from '@/lib/fetch';
import { Department, ResponseDto } from '@/lib/types';

const formSchema = z.object({
    courseName: z.string().min(3, 'Course name must be at least 3 characters'),
    courseCode: z.string().min(2, 'Course code must be at least 2 characters'),
    credits: z
        .number({ invalid_type_error: 'Credits must be a number' })
        .min(1, 'Credits must be at least 1'),
    departmentId: z.string().min(1, 'Department is required'),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
    courseName: '',
    courseCode: '',
    credits: 3,
    departmentId: '',
};

const CourseForm = () => {
    const [isOpen, setIsOpen] = useAtom(modalAtom);
    const [isEditMode, setEditMode] = useAtom(editUiAtom);
    const selectedCourse = useAtomValue(selectedCourseAtom);
    const [, refetchCourses] = useAtom(refreshCoursesAtom);
    const departments = useAtomValue(departmentsAtom);
    const fetchDepartments = useSetAtom(refreshDepartmentsAtom);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isDirty },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: 'onChange',
    });

    useEffect(() => {
        if (isOpen) {
            fetchDepartments();
            if (isEditMode && selectedCourse) {
                reset({
                    courseName: selectedCourse.courseName,
                    courseCode: selectedCourse.courseCode,
                    credits: selectedCourse.credits,
                    departmentId: selectedCourse.departmentId?.toString() || '',
                });
            } else {
                reset(defaultValues);
            }
        }
    }, [isOpen, isEditMode, selectedCourse, reset, fetchDepartments]);

    const closeModal = () => {
        setIsOpen(false);
    };

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);

        try {
            const endpoint = isEditMode && selectedCourse
                ? `${INTERNAL_ENDPOINTS.COURSE}/${selectedCourse.id}`
                : INTERNAL_ENDPOINTS.COURSE;

            const method = isEditMode ? 'PUT' : 'POST';

            const payload = {
                ...data,
                credits: Number(data.credits),
                departmentId: Number(data.departmentId),
                ...(isEditMode ? { id: selectedCourse?.id } : {}),
            };

            const res = await fetchData<ResponseDto>(`/api${endpoint}`, {
                method,
                body: payload,
            });

            if (res?.success) {
                toast.success(`Course ${isEditMode ? 'updated' : 'created'} successfully`);
                await refetchCourses();
                reset();
                setEditMode(false);
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

    const isLoading = isSubmitting || departments.isLoading;
    const submitButtonText = isEditMode ? 'Update Course' : 'Add Course';
    const modalTitle = `${isEditMode ? 'Edit' : 'Add'} Course`;

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[500px] m-4"
            aria-labelledby="Course-form-title"
        >
            <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4
                        id="Course-form-title"
                        className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90"
                    >
                        {modalTitle}
                    </h4>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                        {/* Course Name */}
                        <div>
                            <Label htmlFor="courseName">Course Name</Label>
                            <Input
                                id="courseName"
                                {...register('courseName')}
                                type="text"
                                disabled={isLoading}
                                aria-invalid={!!errors.courseName}
                                aria-describedby="courseName-error"
                            />
                            {errors.courseName && (
                                <p id="courseName-error" className="text-red-500 text-sm">
                                    {errors.courseName.message}
                                </p>
                            )}
                        </div>

                        {/* Course Code */}
                        <div>
                            <Label htmlFor="courseCode">Course Code</Label>
                            <Input
                                id="courseCode"
                                {...register('courseCode')}
                                type="text"
                                disabled={isLoading}
                                aria-invalid={!!errors.courseCode}
                                aria-describedby="courseCode-error"
                            />
                            {errors.courseCode && (
                                <p id="courseCode-error" className="text-red-500 text-sm">
                                    {errors.courseCode.message}
                                </p>
                            )}
                        </div>

                        {/* Credits */}
                        <div>
                            <Label htmlFor="credits">Credits</Label>
                            <Input
                                id="credits"
                                {...register('credits', { valueAsNumber: true })}
                                type="number"
                                disabled={isLoading}
                                aria-invalid={!!errors.credits}
                                aria-describedby="credits-error"
                            />
                            {errors.credits && (
                                <p id="credits-error" className="text-red-500 text-sm">
                                    {errors.credits.message}
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

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={closeModal}
                            type="button"
                            disabled={isLoading}
                        >
                            {isLoading ? <ClipLoader size={20} color="#3B82F6" /> : 'Close'}
                        </Button>
                        <Button
                            size="sm"
                            type="submit"
                            disabled={isLoading || !isDirty}
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

export default CourseForm;
