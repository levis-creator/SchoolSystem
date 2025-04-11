"use client";

import Avvvatars from "avvvatars-react";
import {
    Mail,
    Phone,
    Landmark,
    BadgeInfo,
    UserCheck,
    UserX,
} from "lucide-react";
import { AppUsers, Student } from "@/lib/types";
import { ReactNode } from "react";

type UserType = AppUsers | Student;

interface UserProfileProps {
    user: UserType | null;
    actions?: ReactNode;
}

const isStudent = (user: UserType): user is Student =>
    "admNo" in user && "nationalId" in user;

export default function UserProfile({ user, actions }: UserProfileProps) {
    if (!user) return null;

    const fullName = isStudent(user)
        ? `${user.firstName} ${user.lastName}`
        : user.name || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

    const initials = fullName || user.email || "User";

    return (
        <section
            aria-label="User Profile"
            className="relative flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] shadow-sm w-full"
        >
            {/* Avatar */}
            <div className="shrink-0">
                <Avvvatars value={initials} displayValue={`${fullName}`} size={96} />
            </div>

            {/* Info */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 w-full">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {fullName}
                </h2>

                {/* Role & Status */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm px-3 py-1 rounded-full capitalize">
                        {isStudent(user) ? "Student" : user.role ?? "User"}
                    </span>

                    {isStudent(user) && (
                        <span
                            className={`${user.isActive
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                } text-sm px-3 py-1 rounded-full flex items-center gap-1`}
                        >
                            {user.isActive ? <UserCheck size={14} /> : <UserX size={14} />}
                            {user.isActive ? "Active" : "Inactive"}
                        </span>
                    )}
                </div>

                {/* Details */}
                <div className="mt-4 w-full space-y-3 text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                    {user.email && (
                        <InfoRow
                            icon={<Mail size={16} />}
                            title="Email Address"
                            value={user.email}
                        />
                    )}

                    {isStudent(user) ? (
                        <InfoRow
                            icon={<BadgeInfo size={16} />}
                            title="National ID"
                            value={user.nationalId}
                        />
                    ) : (
                        user.phoneNumber && (
                            <InfoRow
                                icon={<Phone size={16} />}
                                title="Phone Number"
                                value={user.phoneNumber}
                            />
                        )
                    )}

                    {isStudent(user) && user.departmentName && (
                        <InfoRow
                            icon={<Landmark size={16} />}
                            title="Department"
                            value={user.departmentName}
                        />
                    )}

                    {isStudent(user) && (
                        <InfoRow
                            icon={<BadgeInfo size={16} />}
                            title="Admission Number"
                            value={user.admNo}
                        />
                    )}
                </div>
            </div>
            <div className="absolute top-0 right-0 md:static">
                {actions}
            </div>
        </section>
    );
}

// Updated InfoRow with title
const InfoRow = ({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string | number | null;
}) =>
    value ? (
        <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
            <div className="pt-1 text-blue-500 dark:text-blue-400">{icon}</div>
            <div className="space-y-0.5 text-left">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {title}
                </div>
                <div className="break-words">{value}</div>
            </div>
        </div>
    ) : null;
