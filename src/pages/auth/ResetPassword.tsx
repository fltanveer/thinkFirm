import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  CheckmarkCircle02Icon,
  LockIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import { AuthLayout } from '../../components/patterns/auth/AuthLayout';
import { AuthAlert } from '../../components/patterns/auth/AuthAlert';
import { PasswordField } from '../../components/patterns/auth/PasswordField';
import { isStrongPassword } from '../../lib/authValidation';

const REQUIREMENTS = [
  'At least 8 characters',
  'One uppercase and one lowercase letter',
  'At least one number',
  'At least one special character',
];

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [succeeded, setSucceeded] = useState(false);
  const [alert, setAlert] = useState<{ title: string; message: string } | null>(null);

  const tooManyAttempts = attempts >= 3;
  const passwordsValid = isStrongPassword(newPassword) && newPassword === confirmPassword;

  if (succeeded) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center gap-sm py-2xl text-center">
          <span className="inline-flex h-4xl w-4xl items-center justify-center rounded-full bg-success-bg text-success-base">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={28} />
          </span>
          <h1 className="mt-sm text-h3 font-bold text-text-heading">Password updated</h1>
          <p className="max-w-[22rem] text-body text-text-secondary">
            Your password has been updated. You can now sign in with your new password.
          </p>
          <Button variant="primary" size="md" className="mt-md w-full" onClick={() => navigate('/auth/sign-in')}>
            Continue to sign in
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      {alert && <AuthAlert variant="error" {...alert} onDismiss={() => setAlert(null)} />}

      <Link to="/auth/sign-in" className="-my-sm inline-flex items-center gap-xs py-sm text-caption font-medium text-text-secondary hover:text-primary-6">
        <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        Back to sign in
      </Link>

      <h1 className="mt-2xl text-h3 font-bold text-text-heading">Create a new password</h1>
      <p className="mt-sm text-body text-text-secondary">Choose a strong password you haven't used before.</p>

      <form
        className="mt-2xl flex flex-col gap-xl"
        onSubmit={(e) => {
          e.preventDefault();
          if (tooManyAttempts) return;
          if (passwordsValid) {
            setSucceeded(true);
          } else {
            const nextAttempts = attempts + 1;
            setAttempts(nextAttempts);
            setAlert(
              nextAttempts >= 3
                ? {
                    title: 'Too Many Attempts',
                    message: 'Please wait 15 minutes before trying to update your password again.',
                  }
                : {
                    title: 'Check Your Password',
                    message: 'Meet every password requirement and make sure both passwords match.',
                  }
            );
          }
        }}
      >
        <div className="flex flex-col gap-sm">
          <PasswordField id="reset-new-password" label="New password" value={newPassword} onChange={setNewPassword} />
          <div className="flex flex-col gap-xs rounded-xs bg-gray-2 px-md py-sm">
            <span className="text-caption text-text-secondary">Password must contain:</span>
            <ul className="flex flex-col gap-xxs pl-lg text-caption text-text-secondary">
              {REQUIREMENTS.map((r) => (
                <li key={r} className="list-disc">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <PasswordField
          id="reset-confirm-password"
          label="Confirm new password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          disabled={tooManyAttempts}
          icon={<HugeiconsIcon icon={LockIcon} size={15} />}
        >
          Update password
        </Button>
      </form>

      <p className="mt-2xl text-center text-body text-text-secondary">
        Need help?{' '}
        <Link to="/auth/contact-support" className="font-medium text-primary-6 hover:underline">
          Contact support
        </Link>
      </p>

    </AuthLayout>
  );
}
