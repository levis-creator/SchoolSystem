"use client";

import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import BlankDataPage from "@/components/tables/BlankDataPage";
import {DataAtom, Course} from "@/lib/types";
import useCourseColumns from "./column";

import { refreshCoursesAtom, CoursesAtom } from "./courseAtoms";
import CourseForm from "./CourseForm";

const useFetchCourses = () => {
    const Courses = useAtomValue(CoursesAtom);
    const [, fetchData] = useAtom(refreshCoursesAtom); // Get fetchData function

    useEffect(() => {
        if (Courses.data==undefined && !Courses.isLoading) {
            fetchData(); // Call fetch function correctly
        }
    }, [Courses.data, Courses.isLoading, fetchData]);

    return Courses;
};

const CourseClient = () => {
    const Courses = useFetchCourses();
    const columns = useCourseColumns();
 
    return (
        <>
            <BlankDataPage<Course>
                pageTitle="Course"
                columns={columns}
                dataItems={Courses as DataAtom<Course[]>} 
                defaultHiddenColumns={["nationalId", "departmentCode"]}
            />
            <CourseForm />
        </>
    );
};

export default CourseClient;
