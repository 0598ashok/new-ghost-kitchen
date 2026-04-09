# 🆘 Support & Troubleshooting

Need help with **Ghost Kitchen**? We’ve got you covered. This guide addresses common questions and explains how to get technical assistance.

## ❓ Frequently Asked Questions (FAQ)

### 1. The font is not loading correctly.
Ensure that your internet connection is active (if using Google Fonts) or that the `fonts/` directory is present in your `/assets` folder (if using local fonts). Check `style.css` for the correct `@font-face` paths.

### 2. The Dark Mode toggle isn't working.
The theme toggle relies on `assets/js/main.js`. Ensure this script is linked correctly in the footer of your HTML pages. Also, check if your browser has local storage disabled.

### 3. How do I change the currency?
Open your HTML file, search for the price (e.g., "$"), and replace it with your local currency symbol. There is no automated currency conversion; this is a static template designed for maximum control.

### 4. Images are blurry or slow to load.
Ensure you are using optimized WebP or high-quality PNG/JPG files. Refer to the [Customization Guide](customization.md) for image optimization tips.

## 🛠️ Common Troubleshooting Steps
1.  **Clear Cache**: If you make CSS changes and don't see them, clear your browser cache or use an Incognito/Private window.
2.  **Console Check**: Press `F12` and check the **Console** tab for any red error messages. These usually point to missing files or broken paths.
3.  **Path Audit**: Ensure all your links (images, scripts, CSS) use relative paths (e.g., `../assets/` instead of `/assets/`) if you are working within the `/pages` directory.

## 📬 Contact Support
If you have a bug report or a feature request, please reach out to your project coordinator or the developer who provided this template.

---
[Return to Hub](../README.md)
