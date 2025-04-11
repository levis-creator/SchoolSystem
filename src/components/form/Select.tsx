interface SelectInputProps<T> {
    label: string;
    name: string;
    className?: string;
    options: T[];
    display: keyof T;
    multiple?: boolean;
    disabled?: boolean;
    valueKey?: keyof T | string;
    value?: string | string[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectInput<T>({
                                           label,
                                           name,
                                           className = "sm:col-span-2",
                                           options = [],
                                           multiple = false,
                                           display,
                                           value,
                                           onChange,
                                           valueKey = "id",
                                           disabled = false,
                                           ...props
                                       }: SelectInputProps<T>) {
    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium leading-6 text-slate-800 dark:text-slate-50"
                >
                    {label}
                </label>
            )}
            <div className="mt-2 w-full">
                <select
                    {...props}
                    id={name}
                    name={name}
                    disabled={disabled}
                    multiple={multiple}
                    value={value}
                    onChange={onChange}
                    className="block w-full dark:bg-slate-800 dark:text-slate-50 rounded-md border-0 py-2 text-slate-800 shadow-sm ring-1 ring-inset ring-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    <option value="">Select Department</option>
                    {options.map((option, i) => {
                        const optionValue = option[valueKey as keyof T] as string;
                        const displayValue = option[display] as string;
                        return (
                            <option key={i} value={optionValue}>
                                {displayValue}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}
