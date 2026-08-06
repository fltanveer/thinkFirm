import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs } from '../../components/ui2/Tabs';
import { Input } from '../../components/ui2/Input';
import { Checkbox } from '../../components/ui2/Checkbox';
import { Button } from '../../components/ui2/Button';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link01Icon, SmartPhone01Icon, LockPasswordIcon } from '@hugeicons-pro/core-stroke-rounded';
import { AuthLayout } from '../../components/patterns/auth/AuthLayout';
import { PinInput } from '../../components/patterns/auth/PinInput';
import { PasswordField } from '../../components/patterns/auth/PasswordField';
import { AuthAlert } from '../../components/patterns/auth/AuthAlert';

type AuthMethod = 'password' | 'magic-link' | '2fa';

const METHOD_BUTTON: Record<Exclude<AuthMethod, never>, { label: string; icon: typeof Link01Icon }> = {
  password: { label: 'Password', icon: LockPasswordIcon },
  'magic-link': { label: 'Magic link', icon: Link01Icon },
  '2fa': { label: '2FA', icon: SmartPhone01Icon },
};

export default function SignIn() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<AuthMethod>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState<string[]>(Array(6).fill(''));
  const [agreed, setAgreed] = useState(true);
  const [alert, setAlert] = useState<{ variant: 'success' | 'error'; title: string; message: string } | null>(null);

  const otherMethods = (Object.keys(METHOD_BUTTON) as AuthMethod[]).filter((m) => m !== method);

  return (
    <AuthLayout>
      {alert && <AuthAlert {...alert} onDismiss={() => setAlert(null)} />}

      <h1 className="text-sg2-h2 font-bold text-sg2-text-heading">Welcome back</h1>
      <p className="mt-sg2-sm text-sg2-body-sm text-sg2-text-secondary">Sign in to access your Enterprise workspace.</p>

      {method === 'password' && (
        <Tabs
          variant="segmented"
          className="mt-sg2-xl w-full"
          items={[
            { value: 'signin', label: 'Sign In' },
            { value: 'signup', label: 'Sign Up' },
          ]}
          value="signin"
          onChange={(v) => {
            if (v === 'signup') navigate('/auth/sign-up');
          }}
        />
      )}

      <form
        className="mt-sg2-xl flex flex-col gap-sg2-lg"
        onSubmit={(e) => {
          e.preventDefault();
          if (method === 'magic-link') {
            setAlert({
              variant: 'success',
              title: 'Magic Link Sent',
              message: 'Check your inbox for a secure sign-in link.',
            });
          } else if (method === '2fa' && pin.some((digit) => !digit)) {
            setAlert({
              variant: 'error',
              title: 'Enter Your Security Code',
              message: 'Enter all six digits from your authenticator app to continue.',
            });
          } else {
            navigate('/dashboard');
          }
        }}
      >
        <div className="flex flex-col gap-sg2-xs">
          <label htmlFor="signin-email" className="text-sg2-body-sm font-medium text-sg2-text-secondary">
            Email <span className="text-sg2-danger-60">*</span>
          </label>
          <Input
            id="signin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            size="md"
            required
          />
        </div>

        {method === 'password' && (
          <PasswordField
            id="signin-password"
            label="Password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            labelAction={
              <Link to="/auth/forgot-password" className="text-sg2-body-sm font-medium text-sg2-text-link hover:underline">
                Forgot password?
              </Link>
            }
          />
        )}

        {method === '2fa' && (
          <div className="flex flex-col gap-sg2-xs">
            <label className="text-sg2-body-sm font-medium text-sg2-text-secondary">
              Security code <span className="text-sg2-danger-60">*</span>
            </label>
            <PinInput value={pin} onChange={setPin} />
          </div>
        )}

        <div className="flex items-start gap-sg2-sm">
          <Checkbox
            size="sm"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="mt-[2px]"
          />
          <p className="text-sg2-body-sm text-sg2-text-secondary">
            I agree to the{' '}
            <a href="#" onClick={(event) => event.preventDefault()} className="text-sg2-text-link hover:underline">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <Link to="/policy" className="text-sg2-text-link hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          disabled={!agreed}
          icon={method === 'magic-link' ? <HugeiconsIcon icon={Link01Icon} size={15} /> : undefined}
        >
          {method === 'magic-link' ? 'Send magic link' : method === '2fa' ? 'Verify and sign in' : 'Sign in'}
        </Button>
      </form>

      <div className="relative my-sg2-lg">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-sg2-border-subtle" />
        <span className="relative mx-auto block w-fit bg-sg2-bg-card px-sg2-md text-sg2-caption text-sg2-text-secondary">
          Or use another sign-in method
        </span>
      </div>

      <div className="grid grid-cols-2 gap-sg2-md">
        {otherMethods.map((m) => (
          <Button
            key={m}
            variant="stroke"
            size="md"
            icon={<HugeiconsIcon icon={METHOD_BUTTON[m].icon} size={15} />}
            onClick={() => setMethod(m)}
          >
            {METHOD_BUTTON[m].label}
          </Button>
        ))}
      </div>

      <div className="mt-sg2-xl flex flex-col gap-sg2-sm text-center text-sg2-body-md text-sg2-text-secondary">
        <p>
          New to Enterprise?{' '}
          <Link to="/auth/sign-up" className="font-medium text-sg2-text-link hover:underline">
            Create an account
          </Link>
        </p>
        <p>
          Need help?{' '}
          <Link to="/auth/contact-support" className="font-medium text-sg2-text-link hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
