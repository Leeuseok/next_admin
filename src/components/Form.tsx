'use client';

import { ReactNode, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({ 
  label, 
  name, 
  error, 
  required = false, 
  children, 
  className 
}: FormFieldProps) {
  return (
    <div className={cn('mb-6', className)}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  register?: UseFormRegister<any>;
  name: string;
}

export function Input({ 
  label, 
  error, 
  register, 
  name, 
  required = false, 
  className,
  ...props 
}: InputProps) {
  const inputElement = (
    <input
      {...props}
      {...(register ? register(name) : {})}
      className={cn(
        'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
        error && 'border-red-300 focus:ring-red-500 focus:border-red-500',
        className
      )}
    />
  );

  if (label) {
    return (
      <FormField label={label} name={name} error={error} required={required}>
        {inputElement}
      </FormField>
    );
  }

  return inputElement;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  register?: UseFormRegister<any>;
  name: string;
}

export function Textarea({ 
  label, 
  error, 
  register, 
  name, 
  required = false, 
  className,
  ...props 
}: TextareaProps) {
  const textareaElement = (
    <textarea
      {...props}
      {...(register ? register(name) : {})}
      className={cn(
        'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
        error && 'border-red-300 focus:ring-red-500 focus:border-red-500',
        className
      )}
    />
  );

  if (label) {
    return (
      <FormField label={label} name={name} error={error} required={required}>
        {textareaElement}
      </FormField>
    );
  }

  return textareaElement;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  register?: UseFormRegister<any>;
  name: string;
  options: { value: string; label: string }[];
}

export function Select({ 
  label, 
  error, 
  register, 
  name, 
  options, 
  required = false, 
  className,
  ...props 
}: SelectProps) {
  const selectElement = (
    <select
      {...props}
      {...(register ? register(name) : {})}
      className={cn(
        'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
        error && 'border-red-300 focus:ring-red-500 focus:border-red-500',
        className
      )}
    >
      <option value="">선택하세요</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  if (label) {
    return (
      <FormField label={label} name={name} error={error} required={required}>
        {selectElement}
      </FormField>
    );
  }

  return selectElement;
}

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register?: UseFormRegister<any>;
  name: string;
}

export function Checkbox({ 
  label, 
  error, 
  register, 
  name, 
  className,
  ...props 
}: CheckboxProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <input
        {...props}
        {...(register ? register(name) : {})}
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  error?: string;
  register?: UseFormRegister<any>;
  required?: boolean;
}

export function RadioGroup({ 
  label, 
  name, 
  options, 
  error, 
  register, 
  required = false 
}: RadioGroupProps) {
  return (
    <FormField label={label} name={name} error={error} required={required}>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              {...(register ? register(name) : {})}
              type="radio"
              value={option.value}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label className="ml-2 block text-sm text-gray-900">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </FormField>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  children, 
  className,
  disabled,
  ...props 
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
}
