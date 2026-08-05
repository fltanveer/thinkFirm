export function RadiusSwatch({ name, px }: { name: string; px: number }) {
  return (
    <div className="flex flex-col items-center gap-xs">
      <div
        className="h-4xl w-4xl border-2 border-primary-6 bg-primary-0"
        style={{ borderRadius: `${px}px` }}
      />
      <div className="text-caption text-text-primary">radius-{name}</div>
      <div className="text-caption text-text-secondary">{px}px</div>
    </div>
  );
}
