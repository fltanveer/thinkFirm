import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, Link01Icon } from '@hugeicons-pro/core-stroke-rounded';
import { AuthLayout } from '../../components/patterns/auth/AuthLayout';
import { AuthAlert } from '../../components/patterns/auth/AuthAlert';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <AuthLayout>
      {showConfirmation && (
        <AuthAlert
          variant="success"
          title="Reset Link Sent"
          message="We've sent a password reset link to your email address. Check your inbox and follow the instructions to reset your password."
          onDismiss={() => setShowConfirmation(false)}
        />
      )}

      <Link to="/auth/sign-in" className="-my-sm inline-flex items-center gap-xs py-sm text-caption font-medium text-text-secondary hover:text-primary-6">
        <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        Back to sign in
      </Link>

      <h1 className="mt-2xl text-h3 font-bold text-text-heading">Reset your password</h1>
      <p className="mt-sm text-body text-text-secondary">
        Enter the email associated with your account and we'll send you a reset link.
      </p>

      <form
        className="mt-2xl flex flex-col gap-xl"
        onSubmit={(e) => {
          e.preventDefault();
          setShowConfirmation(true);
        }}
      >
        <div className="flex flex-col gap-xs">
          <label htmlFor="forgot-email" className="text-caption font-medium text-text-secondary">
            Email <span className="text-error-base">*</span>
          </label>
          <Input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            size="lg"
            required
          />
        </div>

        <Button type="submit" variant="primary" size="md" className="w-full" icon={<HugeiconsIcon icon={Link01Icon} size={15} />}>
          {showConfirmation ? 'Resend reset link' : 'Send reset link'}
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
