# TabGlow

**TabGlow** is a firefox extension that lets you customize your browsing experience by applying a unique color to the current tab. It's designed to enhance visibility, organization, and focus while working with multiple tabs.

---

## Features

- Assigns a random color to each new tab.
- Offers both dark and light theme support for seamless integration with your preferred browser theme.
- Provides a simple, non-intrusive way to stay visually organized while browsing.

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
npm run build
```

### 3. Load Extension in Firefox

1. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
2. Click `Load Temporary Add-on…` and select the `manifest.json` file in the dist folder.
