# 🎨 Branding & Customization Guide

The **Ghost Kitchen** template is built with a highly flexible design system using CSS Custom Properties (Variables). This allows you to rebrand the entire website in minutes.

## 🌈 Global Variables
All core styles are controlled via the `:root` pseudo-class in `assets/css/style.css`.

### 1. Colors
Modify these values to match your brand identity:
```css
:root {
    --primary-color: #e11d48;    /* Brand Primary (e.g., Rose-600) */
    --primary-hover: #be123c;    /* Hover State */
    --secondary-color: #111827;  /* Dark Contrast (e.g., Gray-900) */
    --accent-color: #fff1f2;     /* Background Tints */
}
```

### 2. Typography
We use **Inter** for readability in body text and **Outfit** for high-impact headings. To change them, update these variables and ensure you've linked the new fonts in your HTML `<head>`.
```css
:root {
    --font-main: 'Inter', sans-serif;
    --font-heading: 'Outfit', sans-serif;
}
```

### 3. Themes (Dark/Light Mode)
The site uses a `[data-theme="dark"]` attribute system. You can customize the dark mode palette specifically:
```css
[data-theme="dark"] {
    --bg-color: var(--bg-dark);
    --text-color: var(--text-dark);
    --card-bg: var(--card-bg-dark);
    --border-color: var(--border-dark);
    --accent-color: #1a1f2e; /* Dark theme accent */
}
```

## 🖼️ Replacing Images
For a high-fidelity look, we recommend using high-resolution transparent PNGs or WebP files for culinary items.

- **Logo**: Replace `assets/images/favicon.png` and update the logo maps in the Navbar.
- **Hero Dishes**: Replace files in `assets/images/dishes/`.
- **UI Elements**: Update backgrounds in `assets/images/ui/`.

> [!TIP]
> Use tools like [TinyPNG](https://tinyping.com) to compress your images before uploading to maintain the template's extreme performance.

## ✍️ Content Modification
To change text:
1.  Open the relevant HTML file in your editor.
2.  Use `Ctrl+F` (Windows) or `Cmd+F` (Mac) to search for the placeholder text.
3.  Replace the text within the tags (e.g., `<h1>Replace Me</h1>`).
4.  Ensure you maintain the existing class names to preserve animations.

---
[Return to Hub](../README.md) | [Go to Page Structure](page-structure.md)
