import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs } from '../../components/ui/Tabs';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { AuthLayout } from '../../components/patterns/auth/AuthLayout';
import { PasswordField } from '../../components/patterns/auth/PasswordField';
import { AuthAlert } from '../../components/patterns/auth/AuthAlert';
import { isStrongPassword } from '../../lib/authValidation';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [alert, setAlert] = useState<{ variant: 'success' | 'error'; title: string; message: string } | null>(null);

  return (
    <AuthLayout>
      {alert && <AuthAlert {...alert} onDismiss={() => setAlert(null)} />}

      <h1 className="text-h3 font-bold text-text-heading">Create your account</h1>
      <p className="mt-sm text-body text-text-secondary">Set up your Enterprise account to get started.</p>

      <Tabs
        variant="segmented"
        className="mt-2xl w-full"
        items={[
          { value: 'signin', label: 'Sign In' },
          { value: 'signup', label: 'Sign Up' },
        ]}
        value="signup"
        onChange={(v) => {
          if (v === 'signin') navigate('/auth/sign-in');
        }}
      />

      <form
        className="mt-2xl flex flex-col gap-xl"
        onSubmit={(e) => {
          e.preventDefault();
          if (!isStrongPassword(password)) {
            setAlert({
              variant: 'error',
              title: 'Choose a Stronger Password',
              message: 'Use at least 8 characters with uppercase, lowercase, a number, and a special character.',
            });
            return;
          }
          if (password !== confirmPassword) {
            setAlert({
              variant: 'error',
              title: 'Passwords Do Not Match',
              message: 'Enter the same password in both password fields.',
            });
            return;
          }
          setAlert({
            variant: 'success',
            title: 'Account Created',
            message: 'Your Enterprise account is ready. You can now sign in.',
          });
        }}
      >
        <div className="flex flex-col gap-xs">
          <label htmlFor="signup-name" className="text-caption font-medium text-text-secondary">
            Full name <span className="text-error-base">*</span>
          </label>
          <Input id="signup-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" size="lg" required />
        </div>

        <div className="flex flex-col gap-xs">
          <label htmlFor="signup-email" className="text-caption font-medium text-text-secondary">
            Email <span className="text-error-base">*</span>
          </label>
          <Input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            size="lg"
            required
          />
        </div>

        <div className="flex flex-col gap-xs">
          <PasswordField id="signup-password" label="Password" value={password} onChange={setPassword} />
          <p className="text-caption text-text-secondary">
            Use 8+ characters with uppercase, lowercase, a number, and a special character.
          </p>
        </div>

        <PasswordField
          id="signup-confirm-password"
          label="Confirm password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <div className="flex items-start gap-sm">
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-[2px]"
          />
          <p className="text-body text-text-secondary">
            I agree to the{' '}
            <a href="#" onClick={(e) => e.preventDefault()} className="text-primary-6 hover:underline">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <Link to="/policy" className="text-primary-6 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>

        <Button type="submit" variant="primary" size="md" className="w-full" disabled={!agreed}>
          Create account
        </Button>
      </form>

      <div className="mt-2xl flex flex-col gap-sm text-center text-body text-text-secondary">
        <p>
          Already have an account?{' '}
          <Link to="/auth/sign-in" className="font-medium text-primary-6 hover:underline">
            Sign in
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
