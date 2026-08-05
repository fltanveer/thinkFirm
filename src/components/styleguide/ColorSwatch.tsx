// Swatch fills use inline `style` (not a Tailwind bg-* class) because the
// color list is data-driven — arbitrary bg-[value] classes can't be
// generated for values only known at runtime. The hex itself still comes
// straight from generated.ts (i.e. from tokens.json), nothing is hardcoded.
export function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex flex-col gap-xs">
      <div
        className="h-4xl w-full rounded-md border border-gray-4"
        style={{ background: hex }}
        title={hex}
      />
      <div className="text-caption text-text-primary">{name}</div>
      <div className="font-mono text-caption text-text-secondary">{hex}</div>
    </div>
  );
}
