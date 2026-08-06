import { useState } from 'react';
import type { ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { EyeIcon, EyeOffIcon } from '@hugeicons-pro/core-stroke-rounded';

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: 'current-password' | 'new-password';
  labelAction?: ReactNode;
}

export function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete = 'new-password',
  labelAction,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-sg2-xs">
      <div className="flex items-center justify-between gap-sg2-md">
        <label htmlFor={id} className="text-sg2-body-sm font-medium text-sg2-text-secondary">
          {label} <span className="text-sg2-danger-60">*</span>
        </label>
        {labelAction}
      </div>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          required
          className="w-full rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card px-sg2-md py-sg2-sm pr-sg2-3xl text-sg2-body-sm text-sg2-text-primary outline-none transition-colors placeholder:text-sg2-gray-500 focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15"
        />
        <button
          type="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((visible) => !visible)}
          className="absolute right-0 top-1/2 inline-flex h-[44px] w-[44px] -translate-y-1/2 items-center justify-center text-sg2-gray-500 transition-colors hover:text-sg2-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sg2-focus-ring"
        >
          <HugeiconsIcon icon={showPassword ? EyeOffIcon : EyeIcon} size={16} />
        </button>
      </div>
    </div>
  );
}
