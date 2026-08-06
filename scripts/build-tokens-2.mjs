#!/usr/bin/env node
// Reads design-tokens/tokens-old.json (a second, structurally different Figma
// token export — "Style Guide 2") and emits:
//   - src/styles/tokens-2.css   (Tailwind v4 @theme block, all keys prefixed
//     sg2-* so they never collide with the primary tokens.json theme in
//     src/styles/tokens.css — both can be imported on the same page)
//   - src/tokens/generated-2.ts (typed JS data the Style Guide 2 page renders from)
// Nothing in components/ui2 should hardcode a color/radius/spacing/font
// value; it all flows from tokens-old.json through this script.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const tokens = JSON.parse(readFileSync(join(root, 'design-tokens/tokens-old.json'), 'utf-8'));

// ---- pass 1: index every leaf token as "ImmediateParentKey.TokenKey" -> $value ----
// tokens-old.json's own aliases reference collection names with their "-color"
// suffix stripped (e.g. Interactive-States.danger-default -> "{Danger.danger-60}"
// but the actual group key is "Danger-color") — so every group is indexed a
// second time under its stripped name too.
const flatRefs = new Map();
function stripColorSuffix(name) {
  return name.replace(/-color$/i, '').trim();
}
function indexRefs(node, parentKey) {
  if (!node || typeof node !== 'object') return;
  for (const [key, child] of Object.entries(node)) {
    if (child && typeof child === 'object' && '$value' in child) {
      if (parentKey) {
        flatRefs.set(`${parentKey}.${key}`, child.$value);
        const stripped = stripColorSuffix(parentKey);
        if (stripped !== parentKey) flatRefs.set(`${stripped}.${key}`, child.$value);
      }
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

const colorGroup = tokens['1'][' Color Styles/Mode 1'];
const radiusGroup = tokens['2'][' Radius/Mode 1'];
const spacingGroup = tokens['3'][' Spacing/Mode 1'];
const typeGroup = tokens['4'][' Typography/Mode 1'];
const sizingGroup = tokens['5'][' Sizing/Mode 1'];

// ---- colors ----
const colors = {}; // cssName -> hex
function addColor(cssName, raw) {
  colors[cssName] = resolve(raw);
}
addColor('white', colorGroup['Base']['white'].$value);
addColor('black', colorGroup['Base']['black'].$value);
for (const [key, tok] of Object.entries(colorGroup['Neutral-Gray'])) addColor(key, tok.$value);
for (const [key, tok] of Object.entries(colorGroup['Primary'])) addColor(key, tok.$value);
for (const [key, tok] of Object.entries(colorGroup['Supporting'])) addColor(key, tok.$value);
for (const group of ['Success-color', 'Warning-color', 'Danger-color', 'Info-color']) {
  for (const [key, tok] of Object.entries(colorGroup[group])) addColor(key, tok.$value);
}
for (const [key, tok] of Object.entries(colorGroup['Text-Colors'])) addColor(key, tok.$value);
for (const [key, tok] of Object.entries(colorGroup['Surface'])) addColor(key, tok.$value);
for (const [key, tok] of Object.entries(colorGroup['Border'])) addColor(key, tok.$value);
for (const [key, tok] of Object.entries(colorGroup['Interactive-States'])) addColor(key, tok.$value);
addColor('focus-ring', colorGroup['Effects']['Focus rings']['focus-ring'].$value);
addColor('focus-ring-danger', colorGroup['Effects']['Focus rings']['focus-ring-danger'].$value);

// tokens-old.json's shadow tokens are flat single hex values (no offset/blur/
// spread, same limitation as tokens.json) — same hand-picked single-layer
// geometry convention as build-tokens.mjs, still every color traces to a
// real shadow-* token.
const shadowColors = {};
for (const [key, tok] of Object.entries(colorGroup['Effects']['Shadows'])) {
  shadowColors[key] = resolve(tok.$value);
}
const SHADOW_GEOMETRY = {
  xs: { y: 1, blur: 2 },
  sm: { y: 1, blur: 3 },
  md: { y: 4, blur: 8 },
  lg: { y: 8, blur: 16 },
  xl: { y: 12, blur: 24 },
};
const shadowScale = Object.entries(SHADOW_GEOMETRY).map(([tier, g]) => {
  const token = `shadow-${tier}`;
  const color = shadowColors[token];
  return { tier, token, boxShadow: `0 ${g.y}px ${g.blur}px 0 ${color}` };
});

// ---- radius ----
// tokens-old.json's own step values happen to fill both radius roles the
// design system needs: radius-xs = 2px plays the role tokens.json's
// radius-xxs plays (compact controls: checkbox/pill/badge/chip), and
// radius-sm = 4px plays the role tokens.json's radius-xs plays (inputs,
// buttons, cards, modals — the 4px ceiling). Names don't line up 1:1 across
// the two token sets, but the values do.
const radius = {};
for (const [key, tok] of Object.entries(radiusGroup)) {
  radius[key.replace(/^radius-/, '')] = tok.$value;
}

// ---- spacing ----
const spacing = {};
for (const [key, tok] of Object.entries(spacingGroup)) {
  spacing[key.replace(/^spacing-/, '')] = tok.$value;
}

// ---- typography ----
const fontFamily = typeGroup['Font family'].primary.$value;
const fontWeights = {};
for (const [key, tok] of Object.entries(typeGroup['Font weight'])) {
  fontWeights[key] = tok.$value;
}
// Same fixed CSS-keyword translation build-tokens.mjs uses — standard
// weight-name numbers, not a project-specific choice, so plain
// font-medium/font-semibold/font-bold already trace correctly and don't
// need their own sg2-prefixed classes.
const WEIGHT_NUMBERS = { regular: 400, medium: 500, semibold: 600, bold: 700 };

const typeScale = Object.entries(typeGroup['Font size']).map(([name, tok]) => ({
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
  size: tok.$value,
}));
// Unlike tokens.json, tokens-old.json's line-heights are three reusable
// generic modes (tight/normal/relaxed) rather than one per size — so they're
// exposed as their own reference list instead of paired per type-scale row.
const lineHeights = Object.entries(typeGroup['Line height']).map(([name, tok]) => ({ name, value: tok.$value }));

// ---- sizing (no equivalent group in tokens.json — reference-only, not
// consumed as Tailwind classes by any ui2 component) ----
const componentHeights = Object.entries(sizingGroup['Component height']).map(([name, tok]) => ({
  name: name.replace(/^size-/, ''),
  px: tok.$value,
}));
const iconSizes = Object.entries(sizingGroup['Icon size']).map(([name, tok]) => ({
  name: name.replace(/^icon-/, ''),
  px: tok.$value,
}));

// =========================================================================
// emit src/tokens/generated-2.ts
// =========================================================================
const tsOut = `// AUTO-GENERATED by scripts/build-tokens-2.mjs from design-tokens/tokens-old.json
// Do not hand-edit — re-run \`npm run build:tokens\` instead.

export const colors2 = ${JSON.stringify(colors, null, 2)} as const;

export const shadowColors2 = ${JSON.stringify(shadowColors, null, 2)} as const;

export const shadowScale2 = ${JSON.stringify(shadowScale, null, 2)} as const;

export const radius2 = ${JSON.stringify(radius, null, 2)} as const;

export const spacing2 = ${JSON.stringify(spacing, null, 2)} as const;

export const fontFamily2 = ${JSON.stringify(fontFamily)};

export const fontWeights2 = ${JSON.stringify(fontWeights, null, 2)} as const;

export const fontWeightNumbers2 = ${JSON.stringify(WEIGHT_NUMBERS, null, 2)} as const;

export const typeScale2 = ${JSON.stringify(typeScale, null, 2)} as const;

export const lineHeights2 = ${JSON.stringify(lineHeights, null, 2)} as const;

export const componentHeights2 = ${JSON.stringify(componentHeights, null, 2)} as const;

export const iconSizes2 = ${JSON.stringify(iconSizes, null, 2)} as const;
`;
mkdirSync(join(root, 'src/tokens'), { recursive: true });
writeFileSync(join(root, 'src/tokens/generated-2.ts'), tsOut);

// =========================================================================
// emit src/styles/tokens-2.css (Tailwind v4 @theme, sg2-* namespaced)
// =========================================================================
const colorVars = Object.entries(colors)
  .map(([name, hex]) => `  --color-sg2-${name}: ${hex};`)
  .join('\n');

const radiusVars = Object.entries(radius)
  .map(([name, px]) => `  --radius-sg2-${name}: ${px}px;`)
  .join('\n');

const spacingVars = Object.entries(spacing)
  .map(([name, px]) => `  --spacing-sg2-${name}: ${px}px;`)
  .join('\n');

const textVars = typeScale
  .map(({ slug, size }) => `  --text-sg2-${slug}: ${size}px;`)
  .join('\n');

const shadowVars = shadowScale
  .map(({ tier, boxShadow }) => `  --shadow-sg2-${tier}: ${boxShadow};`)
  .join('\n');

const cssOut = `/* AUTO-GENERATED by scripts/build-tokens-2.mjs from design-tokens/tokens-old.json
   Do not hand-edit — re-run \`npm run build:tokens\` instead. */
@theme {
${colorVars}

${radiusVars}

${spacingVars}

${textVars}

${shadowVars}
}
`;
mkdirSync(join(root, 'src/styles'), { recursive: true });
writeFileSync(join(root, 'src/styles/tokens-2.css'), cssOut);

console.log(`sg2 tokens: ${Object.keys(colors).length} colors, ${Object.keys(radius).length} radii, ${Object.keys(spacing).length} spacing, ${typeScale.length} type sizes, ${Object.keys(shadowColors).length} shadow colors, ${componentHeights.length} component heights, ${iconSizes.length} icon sizes`);
