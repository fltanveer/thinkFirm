import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui2/Button';
import { Input } from '../../components/ui2/Input';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  CheckmarkCircle02Icon,
  Login01Icon,
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
  const location = useLocation();
  const resetState = location.state as { email?: string; resetLinkSent?: boolean } | null;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [succeeded, setSucceeded] = useState(false);
  const [alert, setAlert] = useState<{
    variant: 'success' | 'error';
    title: string;
    message: string;
  } | null>(() =>
    resetState?.resetLinkSent
      ? {
          variant: 'success',
          title: 'Reset Link Sent',
          message: "We've sent a password reset link to your email address. You can now create a new password.",
        }
      : null
  );

  const tooManyAttempts = attempts >= 3;
  const passwordsValid = isStrongPassword(newPassword) && newPassword === confirmPassword;

  if (succeeded) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center gap-sg2-sm py-sg2-xl text-center">
          <span className="inline-flex h-sg2-3xl w-sg2-3xl items-center justify-center rounded-sg2-full bg-sg2-success-20 text-sg2-success-90">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={28} />
          </span>
          <h1 className="mt-sg2-sm text-sg2-h2 font-bold text-sg2-text-heading">Password updated</h1>
          <p className="max-w-[22rem] text-sg2-body-sm text-sg2-text-secondary">
            Your password has been updated. You can now sign in with your new password.
          </p>
          <Button
            variant="primary"
            size="md"
            className="mt-sg2-md w-full"
            icon={<HugeiconsIcon icon={Login01Icon} size={15} />}
            onClick={() => navigate('/auth/sign-in')}
          >
            Continue to sign in
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      {alert && <AuthAlert {...alert} onDismiss={() => setAlert(null)} />}

      <Link to="/auth/sign-in" className="-my-sg2-sm inline-flex items-center gap-sg2-xs py-sg2-sm text-sg2-body-sm font-medium text-sg2-text-secondary hover:text-sg2-text-link">
        <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        Back to sign in
      </Link>

      <h1 className="mt-sg2-xl text-sg2-h2 font-bold text-sg2-text-heading">Reset Password</h1>
      <p className="mt-sg2-sm text-sg2-body-sm text-sg2-text-secondary">Create a new password for your account.</p>

      <form
        className="mt-sg2-xl flex flex-col gap-sg2-lg"
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
                    variant: 'error',
                    title: 'Too Many Attempts',
                    message: 'Please wait 15 minutes before trying to update your password again.',
                  }
                : {
                    variant: 'error',
                    title: 'Check Your Password',
                    message: 'Meet every password requirement and make sure both passwords match.',
                  }
            );
          }
        }}
      >
        <div className="flex flex-col gap-sg2-xs">
          <label htmlFor="reset-email" className="text-sg2-body-sm font-medium text-sg2-text-secondary">
            Email
          </label>
          <Input
            id="reset-email"
            type="email"
            value={resetState?.email ?? 'info@gmail.com'}
            size="md"
            disabled
          />
        </div>

        <div className="flex flex-col gap-sg2-sm">
          <PasswordField id="reset-new-password" label="New password" value={newPassword} onChange={setNewPassword} />
          <div className="flex flex-col gap-sg2-xs rounded-sg2-sm bg-sg2-bg-well px-sg2-md py-sg2-sm">
            <span className="text-sg2-body-sm text-sg2-text-secondary">Password must contain:</span>
            <ul className="flex flex-col gap-sg2-xxs pl-sg2-lg text-sg2-body-sm text-sg2-text-secondary">
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
          Reset Password
        </Button>
      </form>

      <p className="mt-sg2-xl text-center text-sg2-body-md text-sg2-text-secondary">
        Need help?{' '}
        <Link to="/auth/contact-support" className="font-medium text-sg2-text-link hover:underline">
          Contact support
        </Link>
      </p>

    </AuthLayout>
  );
}
