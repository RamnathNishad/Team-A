'use client';

import React from 'react';
import { FieldError } from 'react-hook-form';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: FieldError;
  options: Array<{ value: string; label: string }>;
}

export function Select({ label, error, options, ...props }: SelectProps) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <select
        className={`form-input ${error ? 'input-error' : ''}`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="form-error">{error.message}</p>}
    </div>
  );
}
