# TabGlow

**TabGlow** is a firefox extension that lets you customize your browsing experience by applying a unique color to the current tab. It's designed to enhance visibility, organization, and focus while working with multiple tabs. Users can manage color options, and ensure that their chosen colors persist across sessions.

---

## Features

- **Random Tab Colors**: Each time you switch tabs, a random color from your preferred theme (light or dark) is applied to the active tab.
- **Dark and Light Theme Support**: TabGlow automatically detects and applies a color scheme based on your system theme.
- **Customizable Color Options**: Users can add, delete, and update tab colors directly from the extension settings. Color selections are saved to storage, making them persistent across sessions.

---

## Installation Steps

### 1. Download the Source Code

Clone or download this repository to get started.

```bash
git clone https://github.com/brkgng/tabglow.git
cd tabglow
```

### 2. Compile TypeScript Files

```bash
npm i
npm run build
```

### 3. Load Extension in Firefox

1. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
2. Click `Load Temporary Add-on…` and select the `manifest.json` file in the <span style="color:red">dist</span> folder.
