"use client";

import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { ColumnDef } from "@tanstack/react-table";
import { modalAtom } from "@/jotai/atoms/uiAtom";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Button from "../ui/button/Button";
import DataTable from "./DataTable";
import { DataAtom } from "@/lib/types";

interface BlankDataPageProps<T> {
    pageTitle: string;
    columns: ColumnDef<T, unknown>[];
    dataItems?: DataAtom<T[]>;
    onAddClick?: () => void;
    defaultHiddenColumns?: string[]; // <-- Added prop
}

const BlankDataPage = <T,>({
    pageTitle,
    dataItems,
    columns,
    onAddClick,
    defaultHiddenColumns = [], // <-- Default value
}: BlankDataPageProps<T>) => {
    const setIsOpen = useSetAtom(modalAtom);

    const handleAddClick = useCallback(() => {
        if (onAddClick) {
            onAddClick();
        } else {
            setIsOpen(true);
        }
    }, [onAddClick, setIsOpen]);

    const renderContent = () => {
        if (dataItems?.isLoading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <ClipLoader color="#3B82F6" size={40} />
                </div>
            );
        }

        if (dataItems?.error) {
            return (
                <div className="flex justify-center items-center h-64 text-red-600">
                    <p>Error loading data: {dataItems.error}</p>
                </div>
            );
        }

        if (!dataItems?.data || dataItems.data.length === 0) {
            return (
                <div className="flex justify-center items-center h-64 text-gray-500">
                    <p>No data available</p>
                </div>
            );
        }

        return (
            <DataTable
                columns={columns}
                data={dataItems.data}
                defaultHiddenColumns={defaultHiddenColumns} // <-- Passed down
            />
        );
    };

    return (
        <div>
            <PageBreadcrumb pageTitle={pageTitle} />
            <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12 max-w-full">
                <div className="flex justify-end mb-6">
                    <Button onClick={handleAddClick}>
                        Add {pageTitle} <Plus className="ml-2" size={16} />
                    </Button>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};

export default BlankDataPage;
