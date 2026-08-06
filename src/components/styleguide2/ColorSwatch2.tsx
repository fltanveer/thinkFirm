export function ColorSwatch2({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex flex-col gap-sg2-xs">
      <div
        className="h-sg2-4xl w-full rounded-sg2-sm border border-sg2-gray-200"
        style={{ background: hex }}
        title={hex}
      />
      <div className="text-sg2-caption text-sg2-text-primary">{name}</div>
      <div className="font-mono text-sg2-caption text-sg2-text-secondary">{hex}</div>
    </div>
  );
}
