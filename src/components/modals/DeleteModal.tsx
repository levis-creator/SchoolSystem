"use client";

import { useAtom } from 'jotai';
import { deleteUiAtom } from '@/jotai/atoms/uiAtom';
import Button from '../ui/button/Button';
import { Modal } from '../ui/modal';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners'; // Import a spinner for the loading state

interface DeleteModalProps {
    handleDelete: () => Promise<void>; // Make handleDelete async
    title: string;
    description: string;
    confirmText?: string; // Optional custom confirm button text
    cancelText?: string; // Optional custom cancel button text
}

const DeleteModal = ({ handleDelete, title, description, confirmText = "Yes, I'm sure", cancelText = "Cancel" }: DeleteModalProps) => {
    const [isOpen, setIsOpen] = useAtom(deleteUiAtom);
    const [loading, setLoading] = useState(false); // Loading state for the delete operation

    const closeModal = () => {
        if (!loading) { // Prevent closing the modal while loading
            setIsOpen(false);
        }
    };

    const onDelete = async () => {
        setLoading(true); // Start loading
        try {
            await handleDelete(); // Execute the delete operation
            closeModal(); // Close the modal on success
        } catch (error) {
            console.error("Error during delete operation:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            showCloseButton={false}
            className="max-w-[507px] p-6 lg:p-10"
        >
            <div className="text-center">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
                    {title}
                </h4>
                <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {description}
                </p>

                <div className="flex items-center justify-center w-full gap-3 mt-8">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={closeModal}
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? <ClipLoader size={20} color="#3B82F6" /> : cancelText}
                    </Button>
                    <Button
                        size="sm"
                        onClick={onDelete}
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? <ClipLoader size={20} color="#FFFFFF" /> : confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;