#!/usr/bin/env node
// Reads design-tokens/tokens.json (Figma token export), resolves {Group.Token}
// aliases, and emits:
//   - src/styles/tokens.css   (Tailwind v4 @theme block -> real utility classes)
//   - src/tokens/generated.ts (typed JS data the style-guide page renders from)
// Nothing in the app should hardcode a color/radius/spacing/font value; it all
// flows from tokens.json through this script.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const tokens = JSON.parse(readFileSync(join(root, 'design-tokens/tokens.json'), 'utf-8'));

// ---- pass 1: index every leaf token as "ImmediateParentKey.TokenKey" -> $value ----
const flatRefs = new Map();
function indexRefs(node, parentKey) {
  if (!node || typeof node !== 'object') return;
  for (const [key, child] of Object.entries(node)) {
    if (child && typeof child === 'object' && '$value' in child) {
      if (parentKey) flatRefs.set(`${parentKey}.${key}`, child.$value);
      indexRefs(child, key);
    } else if (child && typeof child === 'object') {
      indexRefs(child, key);
    }
  }
}
indexRefs(tokens, null);

function resolve(value, seen = 0) {
  if (typeof value === 'string') {
    const m = value.match(/^\{(.+)\}$/);
    if (m) {
      if (seen > 10) throw new Error(`circular token ref: ${value}`);
      const looked = flatRefs.get(m[1]);
      if (looked === undefined) throw new Error(`unresolved token ref: ${value}`);
      return resolve(looked, seen + 1);
    }
  }
  return value;
}

const colorGroup = tokens['1']['Color Styles/Mode 1'];
const radiusGroup = tokens['2'][' Radius/Mode 1'];
const spacingGroup = tokens['3'][' Spacing/Mode 1'];
const typeGroup = tokens['4'][' Typography/Mode 1'];

// ---- colors ----
const colors = {}; // cssName -> hex
function addColor(cssName, raw) {
  colors[cssName] = resolve(raw);
}
addColor('border-1', colorGroup['border-1'].$value);
addColor('border-split', colorGroup['border-split'].$value);
addColor('bg-container-1', colorGroup['bg-container-1'].$value);
addColor('bg-layout', colorGroup['bg-layout'].$value);
addColor('bg-group-card', colorGroup['bg-group-card'].$value);
addColor('card', colorGroup['card'].$value);
addColor('nested-card', colorGroup['Nested-card'].$value);
addColor('well', colorGroup['well'].$value);
addColor('secondary-bg', colorGroup['Secondary-bg'].$value);
addColor('secondary-2-bg', colorGroup['Secondary-2-bg'].$value);

for (const [key, tok] of Object.entries(colorGroup['Text-Colors'])) {
  addColor('text-' + key.replace('Text-', '').toLowerCase(), tok.$value);
}
for (const [key, tok] of Object.entries(colorGroup['Neutral-Gray'])) {
  addColor(key.toLowerCase(), tok.$value); // gray-1..gray-13
}
for (const [key, tok] of Object.entries(colorGroup['Primary'])) {
  addColor(key.toLowerCase(), tok.$value); // primary-0..primary-10
}
for (const group of ['Error-color', 'Warning-color', 'Success-color', 'Info-color']) {
  for (const [key, tok] of Object.entries(colorGroup[group])) {
    addColor(key.toLowerCase(), tok.$value); // error-bg, error-border, error-base, error-text, ...
  }
}
addColor('focus-ring', colorGroup['Effects']['Focus rings']['focus-ring'].$value);
addColor('focus-ring-error', colorGroup['Effects']['Focus rings']['focus-ring-error'].$value);

const shadowColors = {}; // shadow-xs, shadow-sm_01, ... -> hex (raw, unresolved composite)
for (const [key, tok] of Object.entries(colorGroup['Effects']['Shadows'])) {
  shadowColors[key] = resolve(tok.$value);
}

// tokens.json only carries shadow LAYER COLORS (EFFECT_COLOR scope) — no
// offset/blur/spread exists anywhere in the export. The geometry below is a
// hand-picked convention (NOT sourced from tokens.json) used purely to turn
// those colors into visible box-shadows; every color it uses still traces
// back to a real shadow-* token. Ask design for real effect values if
// pixel-accurate shadows are needed later.
const SHADOW_GEOMETRY = {
  xs: [{ y: 1, blur: 2, spread: 0 }],
  sm: [{ y: 1, blur: 2, spread: 0 }, { y: 1, blur: 3, spread: 0 }],
  md: [{ y: 2, blur: 4, spread: -1 }, { y: 4, blur: 6, spread: -1 }],
  lg: [{ y: 2, blur: 4, spread: -2 }, { y: 4, blur: 8, spread: -2 }, { y: 8, blur: 16, spread: -4 }],
  xl: [{ y: 4, blur: 8, spread: -2 }, { y: 8, blur: 16, spread: -4 }, { y: 12, blur: 24, spread: -6 }],
  '2xl': [{ y: 8, blur: 16, spread: -4 }, { y: 16, blur: 24, spread: -4 }],
  '3xl': [{ y: 12, blur: 24, spread: -6 }, { y: 20, blur: 32, spread: -6 }],
};
const shadowScale = Object.keys(SHADOW_GEOMETRY).map((tier) => {
  const layerKeys = Object.keys(shadowColors)
    .filter((k) => k === `shadow-${tier}` || k.startsWith(`shadow-${tier}_`))
    .sort();
  const geometry = SHADOW_GEOMETRY[tier];
  const layers = layerKeys.map((key, i) => {
    const g = geometry[i] ?? geometry[geometry.length - 1];
    return { token: key, color: shadowColors[key], css: `0 ${g.y}px ${g.blur}px ${g.spread}px ${shadowColors[key]}` };
  });
  return { tier, boxShadow: layers.map((l) => l.css).join(', '), layers };
});
const insetShadows = [
  {
    name: 'skeumorphic-inner',
    token: 'shadow-skeumorphic-inner',
    boxShadow: `inset 0 1px 2px ${shadowColors['shadow-skeumorphic-inner']}`,
  },
  {
    name: 'skeumorphic-inner-border',
    token: 'shadow-skeumorphic-inner-border',
    boxShadow: `inset 0 0 0 1px ${shadowColors['shadow-skeumorphic-inner-border']}`,
  },
];

// ---- radius ----
const radius = {}; // xs, sm, md, ... -> number(px)
for (const [key, tok] of Object.entries(radiusGroup)) {
  radius[key.replace(/^radius-/, '')] = tok.$value;
}

// ---- spacing ----
const spacing = {}; // xs, sm, md, ... -> number(px)
for (const [key, tok] of Object.entries(spacingGroup)) {
  spacing[key.replace(/^spacing-/, '')] = tok.$value;
}

// ---- typography ----
const fontFamily = typeGroup['Font family'].primary.$value;
const fontWeights = {}; // regular, medium, semibold, bold, *-italic -> figma label
for (const [key, tok] of Object.entries(typeGroup['Font weight'])) {
  fontWeights[key] = tok.$value;
}
// CSS font-weight only accepts numbers (or normal/bold) — "Semibold"/"Medium"
// aren't valid CSS keywords, so each token's own label is mapped to the
// standard numeric value it names. Not a value from tokens.json, but a fixed
// 1:1 translation of it, applied only to non-italic weights (italic is
// expressed via font-style, handled separately).
const WEIGHT_NUMBERS = { regular: 400, medium: 500, semibold: 600, bold: 700 };

const sizeEntries = [];
const lineHeightEntries = [];
for (const [key, tok] of Object.entries(typeGroup['Font size'])) {
  const scope = tok.$extensions['com.figma.scopes'][0];
  if (scope === 'FONT_SIZE') sizeEntries.push([key, tok.$value]);
  else if (scope === 'LINE_HEIGHT') lineHeightEntries.push([key, tok.$value]);
}
const lineHeightByNormalizedName = new Map(
  lineHeightEntries.map(([key, val]) => [key.replace(/\s*2$/, '').trim().toLowerCase(), { key, val }])
);

const typeScale = sizeEntries.map(([name, size]) => {
  const match = lineHeightByNormalizedName.get(name.trim().toLowerCase());
  if (match) lineHeightByNormalizedName.get(name.trim().toLowerCase()).matched = true;
  return {
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    size,
    lineHeight: match ? match.val : null,
    lineHeightToken: match ? match.key : null,
  };
});
const orphanLineHeights = [...lineHeightByNormalizedName.values()]
  .filter((e) => !e.matched)
  .map((e) => ({ token: e.key, value: e.val }));

// =========================================================================
// emit src/tokens/generated.ts
// =========================================================================
const tsOut = `// AUTO-GENERATED by scripts/build-tokens.mjs from design-tokens/tokens.json
// Do not hand-edit — re-run \`npm run build:tokens\` instead.

export const colors = ${JSON.stringify(colors, null, 2)} as const;

export const shadowColors = ${JSON.stringify(shadowColors, null, 2)} as const;

export const shadowScale = ${JSON.stringify(shadowScale, null, 2)} as const;

export const insetShadows = ${JSON.stringify(insetShadows, null, 2)} as const;

export const radius = ${JSON.stringify(radius, null, 2)} as const;

export const spacing = ${JSON.stringify(spacing, null, 2)} as const;

export const fontFamily = ${JSON.stringify(fontFamily)};

export const fontWeights = ${JSON.stringify(fontWeights, null, 2)} as const;

export const fontWeightNumbers = ${JSON.stringify(WEIGHT_NUMBERS, null, 2)} as const;

export const typeScale = ${JSON.stringify(typeScale, null, 2)} as const;

export const orphanLineHeights = ${JSON.stringify(orphanLineHeights, null, 2)} as const;
`;
mkdirSync(join(root, 'src/tokens'), { recursive: true });
writeFileSync(join(root, 'src/tokens/generated.ts'), tsOut);

// =========================================================================
// emit src/styles/tokens.css (Tailwind v4 @theme)
// =========================================================================
const colorVars = Object.entries(colors)
  .map(([name, hex]) => `  --color-${name}: ${hex};`)
  .join('\n');

const radiusVars = Object.entries(radius)
  .map(([name, px]) => `  --radius-${name}: ${px}px;`)
  .join('\n');

const spacingVars = Object.entries(spacing)
  .map(([name, px]) => `  --spacing-${name}: ${px}px;`)
  .join('\n');

const fontWeightVars = Object.entries(WEIGHT_NUMBERS)
  .map(([name, num]) => `  --font-weight-${name}: ${num};`)
  .join('\n');

const shadowVars = shadowScale
  .map(({ tier, boxShadow }) => `  --shadow-${tier}: ${boxShadow};`)
  .join('\n');

const insetShadowVars = insetShadows
  .map(({ name, boxShadow }) => `  --inset-shadow-${name}: ${boxShadow};`)
  .join('\n');

const textVars = typeScale
  .map(({ slug, size, lineHeight }) =>
    lineHeight != null
      ? `  --text-${slug}: ${size}px;\n  --text-${slug}--line-height: ${lineHeight}px;`
      : `  --text-${slug}: ${size}px;`
  )
  .join('\n');

const cssOut = `/* AUTO-GENERATED by scripts/build-tokens.mjs from design-tokens/tokens.json
   Do not hand-edit — re-run \`npm run build:tokens\` instead. */
@import "tailwindcss";

@theme {
  --font-sans: "${fontFamily}", ui-sans-serif, system-ui, sans-serif;

${colorVars}

${radiusVars}

${spacingVars}

${textVars}

${fontWeightVars}

${shadowVars}

${insetShadowVars}
}
`;
mkdirSync(join(root, 'src/styles'), { recursive: true });
writeFileSync(join(root, 'src/styles/tokens.css'), cssOut);

console.log(`tokens: ${Object.keys(colors).length} colors, ${Object.keys(radius).length} radii, ${Object.keys(spacing).length} spacing, ${typeScale.length} type sizes (${typeScale.filter(t => t.lineHeight).length} paired with line-height), ${orphanLineHeights.length} orphan line-heights, ${Object.keys(shadowColors).length} shadow colors`);
