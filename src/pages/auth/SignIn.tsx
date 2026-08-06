import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs } from '../../components/ui/Tabs';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
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

      <h1 className="text-h3 font-bold text-text-heading">Welcome back</h1>
      <p className="mt-sm text-body text-text-secondary">Sign in to access your Enterprise workspace.</p>

      {method === 'password' && (
        <Tabs
          variant="segmented"
          className="mt-2xl w-full"
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
        className="mt-2xl flex flex-col gap-xl"
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
        <div className="flex flex-col gap-xs">
          <label htmlFor="signin-email" className="text-caption font-medium text-text-secondary">
            Email <span className="text-error-base">*</span>
          </label>
          <Input
            id="signin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            size="lg"
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
              <Link to="/auth/forgot-password" className="text-caption font-medium text-primary-6 hover:underline">
                Forgot password?
              </Link>
            }
          />
        )}

        {method === '2fa' && (
          <div className="flex flex-col gap-xs">
            <label className="text-caption font-medium text-text-secondary">
              Security code <span className="text-error-base">*</span>
            </label>
            <PinInput value={pin} onChange={setPin} />
          </div>
        )}

        <div className="flex items-start gap-sm">
          <Checkbox checked={agreed} onChange={(event) => setAgreed(event.target.checked)} className="mt-[2px]" />
          <p className="text-body text-text-secondary">
            I agree to the{' '}
            <a href="#" onClick={(event) => event.preventDefault()} className="text-primary-6 hover:underline">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <Link to="/policy" className="text-primary-6 hover:underline">
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

      <div className="relative my-xl">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gray-4" />
        <span className="relative mx-auto block w-fit bg-card px-md text-caption text-text-secondary">
          Or use another sign-in method
        </span>
      </div>

      <div className="grid grid-cols-2 gap-md">
        {otherMethods.map((m) => (
          <Button
            key={m}
            variant="stroke-gray"
            size="md"
            icon={<HugeiconsIcon icon={METHOD_BUTTON[m].icon} size={15} />}
            onClick={() => setMethod(m)}
          >
            {METHOD_BUTTON[m].label}
          </Button>
        ))}
      </div>

      <div className="mt-2xl flex flex-col gap-sm text-center text-body text-text-secondary">
        <p>
          New to Enterprise?{' '}
          <Link to="/auth/sign-up" className="font-medium text-primary-6 hover:underline">
            Create an account
          </Link>
        </p>
        <p>
          Need help?{' '}
          <Link to="/auth/contact-support" className="font-medium text-primary-6 hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
