"use client";

import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import DepartmentForm from "@/components/form/forms/DepartmentForm";
import BlankDataPage from "@/components/tables/BlankDataPage";
import { Department } from "@/lib/types";
import useDepartmentColumns from "./column";
import { departmentsAtom, refreshDepartmentsAtom } from "@/jotai/atoms/departmentAtoms";

const useFetchDepartments = () => {
    const departments = useAtomValue(departmentsAtom);
    const [, fetchData] = useAtom(refreshDepartmentsAtom);

    useEffect(() => {
        // @ts-expect-error: Ignoring TypeScript error for unknown error type
        if (!departments.data?.length && !departments.isLoading) {
            fetchData().catch((error) => {
                console.error("Failed to fetch departments:", error);
            });
        }
    }, [departments.data, departments.isLoading, fetchData]);

    return departments;
};

const DepartmentClient = () => {
    const departments = useFetchDepartments();
    const columns = useDepartmentColumns();

    return (
        <>

            <BlankDataPage<Department>
                pageTitle="Department"
                columns={columns}
                // @ts-expect-error: Ignoring TypeScript error for unknown error type

                dataItems={departments}
            />
            <DepartmentForm />
        </>
    );
};

export default DepartmentClient;