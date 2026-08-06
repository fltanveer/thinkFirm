import { useRef } from 'react';
import type { KeyboardEvent } from 'react';

export interface PinInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
}

// One-off 6-box OTP/PIN control for the 2FA sign-in method — not promoted
// to ui/ since this is the only place a segmented numeric code shows up.
export function PinInput({ length = 6, value, onChange }: PinInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function setDigit(index: number, digit: string) {
    const next = [...value];
    next[index] = digit;
    onChange(next);
    if (digit && index < length - 1) refs.current[index + 1]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  }

  return (
    <div className="flex w-full gap-sg2-sm" role="group" aria-label="Six-digit security code">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={value[i] ?? ''}
          onChange={(e) => setDigit(i, e.target.value.replace(/[^0-9]/g, '').slice(-1))}
          onKeyDown={(e) => onKeyDown(e, i)}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          className="min-w-0 flex-1 rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card py-sg2-sm text-center text-sg2-body-sm text-sg2-text-primary outline-none transition-colors focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15"
        />
      ))}
    </div>
  );
}
