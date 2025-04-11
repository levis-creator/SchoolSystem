"use client";

import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import BlankDataPage from "@/components/tables/BlankDataPage";
import {DataAtom, Student} from "@/lib/types";
import useStudentColumns from "./column";
import StudentForm from "./StudentForm";
import { refreshStudentsAtom, StudentsAtom } from "./studentAtoms";

const useFetchStudents = () => {
    const Students = useAtomValue(StudentsAtom);
    const [, fetchData] = useAtom(refreshStudentsAtom); // Get fetchData function

    useEffect(() => {
        if (Students.data==undefined && !Students.isLoading) {
            fetchData(); // Call fetch function correctly
        }
    }, [Students.data, Students.isLoading, fetchData]);

    return Students;
};

const StudentClient = () => {
    const Students = useFetchStudents();
    const columns = useStudentColumns();
 
    return (
        <>
            <BlankDataPage<Student>
                pageTitle="Student"
                columns={columns}
                dataItems={Students as DataAtom<Student[]>} 
                defaultHiddenColumns={["nationalId", "departmentCode"]}
            />
            <StudentForm />
        </>
    );
};

export default StudentClient;
