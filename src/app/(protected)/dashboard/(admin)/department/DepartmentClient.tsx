"use client";

import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import BlankDataPage from "@/components/tables/BlankDataPage";
import {DataAtom, Department} from "@/lib/types";
import useDepartmentColumns from "./column";
import { departmentsAtom, refreshDepartmentsAtom } from "@/app/(protected)/dashboard/(admin)/department/departmentAtoms";
import DepartmentForm from "./DepartmentForm";

const useFetchDepartments = () => {
    const departments = useAtomValue(departmentsAtom);
    const [, fetchData] = useAtom(refreshDepartmentsAtom); // Get fetchData function

    useEffect(() => {
        if (departments.data==undefined && !departments.isLoading) {
            fetchData(); // Call fetch function correctly
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
                dataItems={departments as DataAtom<Department[]>} 
            />
            <DepartmentForm />
        </>
    );
};

export default DepartmentClient;
