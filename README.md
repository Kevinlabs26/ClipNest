# ClipNest

ClipNest is a Windows desktop app for organizing reusable scripts, documents, and checklists. It is built with Tauri 2 and runs locally in WebView2.

## Features

- Organize content into categories and nested categories.
- Create bilingual scripts, single-body documents, and checklists.
- Search, filter by tag, and sort by order, edit time, title, or copy count.
- Copy scripts in either language, fill in `{{name}}` placeholders, and use AI translation.
- Browse category steps in sequence and move between them without leaving the scene.
- Reorder cards by dragging them, and attach images from the clipboard or a file.
- Edit card titles and body text inline. Changes are saved automatically.
- Export losslessly compressed `.json.gz` backups when supported (otherwise `.json`), including images; import older `.json` backups too. Keep up to 10 local restore points.

## Requirements

- Windows
- Node.js and npm
- Rust toolchain required by Tauri 2
- Microsoft Edge WebView2 Runtime

## Development

```powershell
npm run dev
```

## Build

```powershell
npm run build
```

The Windows executable is written to `src-tauri/target/release`. The NSIS installer is written to `src-tauri/target/release/bundle/nsis`.

## Data and privacy

ClipNest stores text in local WebView storage and images in IndexedDB. Library data stays on the device unless you export a backup. AI translation sends the selected text to the configured provider. API keys are stored separately using Windows user encryption.
