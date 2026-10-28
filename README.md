# Derivative website

A standalone presentation site for the Derivative browser. HTML, CSS, and JavaScript, with no framework or dependency installation required.

```sh
npm run dev
```

Open http://127.0.0.1:4173. Run `npm run build` to create a deployable static `dist/` folder.

The light design uses self-hosted Manrope variable type and the browser’s exact SpacePalette values. The font is distributed under the SIL Open Font License in assets/fonts/Manrope-OFL.txt. The browser presentation switches between current native search and appearance screenshots, with keyboard arrow navigation. Space color swatches update a labeled illustrative preview. The FAQ uses native disclosure controls. Reduced-motion preferences disable transitions.

All assets are local. The favicon is available as SVG and 32px PNG, with a 180px Apple touch icon. The navigation, hero, and closing download links point directly to the published 0.1.0-preview.4 Apple Silicon DMG on GitHub Releases. The FAQ explains drag-to-Applications installation and Developer ID signing/Apple notarization, with release notes, ZIP/checksum alternatives, and source build instructions. Update these versioned links when publishing a new preview. Older demo video assets are retained but are not used in this version.
