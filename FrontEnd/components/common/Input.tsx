'use client';

import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  helperText?: string;
}

export function Input({ label, error, helperText, ...props }: InputProps) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        className={`form-input ${error ? 'input-error' : ''}`}
        {...props}
      />
      {error && <p className="form-error">{error.message}</p>}
      {helperText && !error && <p className="text-sm text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
}
