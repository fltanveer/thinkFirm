import { useState } from 'react';
import { cx } from '../../lib/cx';
import { IconCheck, IconCopy } from '../ui/icons';

export interface CodeSnippetProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeSnippet({ code, language = 'tsx', className }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className={cx('overflow-hidden rounded-xs border border-gray-4 bg-gray-13', className)}>
      <div className="flex items-center justify-between border-b border-gray-11 px-lg py-sm">
        <span className="text-caption font-medium uppercase tracking-wide text-gray-7">{language}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-xs rounded-xs px-sm py-xxs text-caption text-gray-6 transition-colors hover:bg-gray-11 hover:text-card"
        >
          {copied ? <IconCheck width={13} height={13} /> : <IconCopy width={13} height={13} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-lg text-caption leading-relaxed text-gray-2">
        <code>{code}</code>
      </pre>
    </div>
  );
}
