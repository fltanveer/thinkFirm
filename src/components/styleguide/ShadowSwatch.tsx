export function ShadowSwatch({ name, boxShadow, tokens }: { name: string; boxShadow: string; tokens: string[] }) {
  return (
    <div className="flex flex-col items-center gap-xs">
      <div className="h-4xl w-4xl rounded-md bg-card" style={{ boxShadow }} />
      <div className="text-caption text-text-primary">shadow-{name}</div>
      <div className="text-center text-caption text-text-secondary">{tokens.join(', ')}</div>
    </div>
  );
}
