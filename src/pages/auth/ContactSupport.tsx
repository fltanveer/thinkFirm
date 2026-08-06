import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Combobox } from '../../components/ui2/Combobox';
import { Input } from '../../components/ui2/Input';
import { Button } from '../../components/ui2/Button';
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

      <Link to="/auth/sign-in" className="-my-sg2-sm inline-flex items-center gap-sg2-xs py-sg2-sm text-sg2-body-sm font-medium text-sg2-text-secondary hover:text-sg2-text-link">
        <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        Back to sign in
      </Link>

      <h1 className="mt-sg2-xl text-sg2-h2 font-bold text-sg2-text-heading">How can we help?</h1>
      <p className="mt-sg2-sm text-sg2-body-sm text-sg2-text-secondary">
        Tell us what you need help with and our support team will get back to you.
      </p>

      <form
        className="mt-sg2-xl flex flex-col gap-sg2-lg"
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
          labelClassName="text-sg2-body-sm"
          placeholder="Choose a category…"
          menuSearch
          required
          size="md"
          options={CATEGORIES}
          value={category || null}
          onChange={(v) => setCategory(v ?? '')}
        />

        <div className="flex flex-col gap-sg2-xs">
          <label htmlFor="support-subject" className="text-sg2-body-sm font-medium text-sg2-text-secondary">
            Subject <span className="text-sg2-danger-60">*</span>
          </label>
          <Input
            id="support-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Briefly describe your request"
            size="md"
            required
          />
        </div>

        <div className="flex flex-col gap-sg2-xs">
          <label htmlFor="support-details" className="text-sg2-body-sm font-medium text-sg2-text-secondary">
            Details <span className="text-sg2-danger-60">*</span>
          </label>
          <textarea
            id="support-details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Include any details that will help us understand the issue"
            rows={4}
            required
            className="w-full resize-none rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card px-sg2-md py-sg2-sm text-sg2-body-sm text-sg2-text-primary outline-none transition-colors placeholder:text-sg2-gray-500 focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15"
          />
        </div>

        <div className="flex flex-col gap-sg2-sm">
          <div className="flex items-center justify-between gap-sg2-md rounded-sg2-sm border border-dashed border-sg2-gray-300 px-sg2-md py-sg2-sm">
            <div className="flex items-center gap-sg2-sm">
              <span className="flex h-sg2-2xl w-sg2-2xl shrink-0 items-center justify-center rounded-sg2-sm bg-sg2-gray-100 text-sg2-gray-500">
                <HugeiconsIcon icon={Attachment01Icon} size={16} />
              </span>
              <div>
                <p className="text-sg2-body-md font-medium text-sg2-text-primary">Drop a file here, or choose one</p>
                <p className="text-sg2-body-sm text-sg2-text-secondary">PNG, JPG, or PDF · Up to 5 MB</p>
              </div>
            </div>
            <Button
              type="button"
              variant="stroke"
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
            <div className="flex items-center justify-between rounded-sg2-sm bg-sg2-bg-well px-sg2-md py-sg2-sm">
              <div>
                <p className="text-sg2-body-md font-medium text-sg2-text-primary">{file.name}</p>
                <p className="text-sg2-body-sm text-sg2-text-secondary">{formatSize(file.size)} · Uploaded just now</p>
              </div>
              <button
                type="button"
                aria-label="Remove file"
                onClick={() => setFile(null)}
                className="inline-flex h-[44px] w-[44px] items-center justify-center text-sg2-gray-500 hover:text-sg2-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sg2-focus-ring"
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
