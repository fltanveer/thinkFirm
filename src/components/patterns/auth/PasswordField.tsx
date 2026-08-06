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
    <div className="flex flex-col gap-xs">
      <div className="flex items-center justify-between gap-md">
        <label htmlFor={id} className="text-caption font-medium text-text-secondary">
          {label} <span className="text-error-base">*</span>
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
          className="w-full rounded-xs border border-gray-5 bg-card px-lg py-md pr-4xl text-title text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-primary-6 focus:ring-4 focus:ring-focus-ring/15"
        />
        <button
          type="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((visible) => !visible)}
          className="absolute right-0 top-1/2 inline-flex h-[44px] w-[44px] -translate-y-1/2 items-center justify-center text-text-secondary transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          <HugeiconsIcon icon={showPassword ? EyeOffIcon : EyeIcon} size={16} />
        </button>
      </div>
    </div>
  );
}
