export function ShadowSwatch2({ name, boxShadow, token }: { name: string; boxShadow: string; token: string }) {
  return (
    <div className="flex flex-col items-center gap-sg2-xs">
      <div className="h-sg2-4xl w-sg2-4xl rounded-sg2-sm bg-sg2-bg-card" style={{ boxShadow }} />
      <div className="text-sg2-caption text-sg2-text-primary">shadow-{name}</div>
      <div className="text-center text-sg2-caption text-sg2-text-secondary">{token}</div>
    </div>
  );
}
