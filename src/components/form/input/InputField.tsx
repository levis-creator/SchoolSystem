"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  success?: boolean;
  error?: boolean;
  hint?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  className = "",
  success = false,
  error = false,
  hint = "",
  ...props
}) => {
  const inputClasses = `
    h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400
    focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
    ${props.disabled ? "text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
      : error ? "text-error-800 border-error-500 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500"
        : success ? "text-success-500 border-success-400 focus:ring-success-500/10 dark:text-success-400 dark:border-success-500"
          : "bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"}
    ${className}
  `;

  return (
    <div className="relative">
      <input id={name} name={name} type={type} className={inputClasses} {...props} />

      {hint && (
        <p className={`mt-1.5 text-xs ${error ? "text-error-500" : success ? "text-success-500" : "text-gray-500"}`}>
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
