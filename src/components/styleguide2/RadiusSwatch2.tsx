export function RadiusSwatch2({ name, px }: { name: string; px: number }) {
  return (
    <div className="flex flex-col items-center gap-sg2-xs">
      <div
        className="h-sg2-4xl w-sg2-4xl border-2 border-sg2-primary-100 bg-sg2-primary-30"
        style={{ borderRadius: `${px}px` }}
      />
      <div className="text-sg2-caption text-sg2-text-primary">radius-{name}</div>
      <div className="text-sg2-caption text-sg2-text-secondary">{px}px</div>
    </div>
  );
}
