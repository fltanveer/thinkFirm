import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Combobox } from '../../components/ui/Combobox';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, Attachment01Icon, Cancel01Icon, Upload01Icon } from '@hugeicons-pro/core-stroke-rounded';
import { AuthLayout } from '../../components/patterns/auth/AuthLayout';
import { AuthAlert } from '../../components/patterns/auth/AuthAlert';

const CATEGORIES = [
  'Account & Billing',
  'Technical Troubleshooting',
  'API & Integrations',
  'Security & Privacy',
  'Product Guidance & Tutorials',
  'Onboarding & Setup',
  'Bug Reports & Feedback',
  'Returns & Refunds',
].map((label) => ({ value: label, label }));

function formatSize(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ContactSupport() {
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <AuthLayout>
      {showConfirmation && (
        <AuthAlert
          variant="success"
          title="Request Submitted"
          message="We've received your request. Our support team will get back to you soon."
          onDismiss={() => setShowConfirmation(false)}
        />
      )}

      <Link to="/auth/sign-in" className="-my-sm inline-flex items-center gap-xs py-sm text-caption font-medium text-text-secondary hover:text-primary-6">
        <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        Back to sign in
      </Link>

      <h1 className="mt-2xl text-h3 font-bold text-text-heading">How can we help?</h1>
      <p className="mt-sm text-body text-text-secondary">
        Tell us what you need help with and our support team will get back to you.
      </p>

      <form
        className="mt-2xl flex flex-col gap-xl"
        onSubmit={(e) => {
          e.preventDefault();
          if (!category || !subject.trim() || !details.trim()) return;
          setShowConfirmation(true);
          setCategory('');
          setSubject('');
          setDetails('');
          setFile(null);
        }}
      >
        <Combobox
          label="Support category"
          placeholder="Choose a category…"
          menuSearch
          required
          size="lg"
          options={CATEGORIES}
          value={category || null}
          onChange={(v) => setCategory(v ?? '')}
        />

        <div className="flex flex-col gap-xs">
          <label htmlFor="support-subject" className="text-caption font-medium text-text-secondary">
            Subject <span className="text-error-base">*</span>
          </label>
          <Input
            id="support-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Briefly describe your request"
            size="lg"
            required
          />
        </div>

        <div className="flex flex-col gap-xs">
          <label htmlFor="support-details" className="text-caption font-medium text-text-secondary">
            Details <span className="text-error-base">*</span>
          </label>
          <textarea
            id="support-details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Include any details that will help us understand the issue"
            rows={4}
            required
            className="w-full resize-none rounded-xs border border-gray-5 bg-card px-lg py-md text-title text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-primary-6 focus:ring-4 focus:ring-focus-ring/15"
          />
        </div>

        <div className="flex flex-col gap-sm">
          <div className="flex items-center justify-between gap-md rounded-xs border border-dashed border-gray-5 px-md py-sm">
            <div className="flex items-center gap-sm">
              <span className="flex h-3xl w-3xl shrink-0 items-center justify-center rounded-xs bg-gray-2 text-gray-7">
                <HugeiconsIcon icon={Attachment01Icon} size={16} />
              </span>
              <div>
                <p className="text-body font-medium text-text-primary">Drop a file here, or choose one</p>
                <p className="text-caption text-text-secondary">PNG, JPG, or PDF · Up to 5 MB</p>
              </div>
            </div>
            <Button
              type="button"
              variant="stroke-gray"
              size="sm"
              icon={<HugeiconsIcon icon={Upload01Icon} size={14} />}
              onClick={() => fileInputRef.current?.click()}
            >
              Browse
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

          {file && (
            <div className="flex items-center justify-between rounded-xs bg-gray-2 px-md py-sm">
              <div>
                <p className="text-body font-medium text-text-primary">{file.name}</p>
                <p className="text-caption text-text-secondary">{formatSize(file.size)} · Uploaded just now</p>
              </div>
              <button
                type="button"
                aria-label="Remove file"
                onClick={() => setFile(null)}
                className="inline-flex h-[44px] w-[44px] items-center justify-center text-text-secondary hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} />
              </button>
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          disabled={!category || !subject.trim() || !details.trim()}
        >
          Submit request
        </Button>
      </form>
    </AuthLayout>
  );
}
