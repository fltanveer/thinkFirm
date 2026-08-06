import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui2/Input';
import { Button } from '../../components/ui2/Button';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, Link01Icon } from '@hugeicons-pro/core-stroke-rounded';
import { AuthLayout } from '../../components/patterns/auth/AuthLayout';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  return (
    <AuthLayout>
      <Link to="/auth/sign-in" className="-my-sg2-sm inline-flex items-center gap-sg2-xs py-sg2-sm text-sg2-body-sm font-medium text-sg2-text-secondary hover:text-sg2-text-link">
        <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        Back to sign in
      </Link>

      <h1 className="mt-sg2-xl text-sg2-h2 font-bold text-sg2-text-heading">Reset your password</h1>
      <p className="mt-sg2-sm text-sg2-body-sm text-sg2-text-secondary">
        Enter the email associated with your account and we'll send you a reset link.
      </p>

      <form
        className="mt-sg2-xl flex flex-col gap-sg2-lg"
        onSubmit={(e) => {
          e.preventDefault();
          navigate('/auth/reset-password', {
            state: { email, resetLinkSent: true },
          });
        }}
      >
        <div className="flex flex-col gap-sg2-xs">
          <label htmlFor="forgot-email" className="text-sg2-body-sm font-medium text-sg2-text-secondary">
            Email <span className="text-sg2-danger-60">*</span>
          </label>
          <Input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            size="md"
            required
          />
        </div>

        <Button type="submit" variant="primary" size="md" className="w-full" icon={<HugeiconsIcon icon={Link01Icon} size={15} />}>
          Send reset link
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
