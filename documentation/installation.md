# 🚀 Installation Guide

Setting up your **Ghost Kitchen** template is straightforward. Since this is a static HTML5 template, there are no complex build steps or dependencies to install.

## 🛠️ Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge).
- A code editor (Visual Studio Code is recommended for the best experience).

## 📥 Quick Start
1.  **Extract the files**: Download and unzip the template package into your project folder.
2.  **Open in Browser**: You can simply double-click `index.html` to view the site, but for the best experience (including the theme toggle and scroll animations), we recommend using a local server.

## 🖥️ Recommended Workflow
Using a local server ensures that all assets load correctly and prevents CORS issues.

### Using VS Code 'Live Server' (Recommended)
1.  Open VS Code.
2.  Go to the Extensions view (Ctrl+Shift+X) and search for **Live Server**.
3.  Install the extension.
4.  Open the project folder in VS Code.
5.  Right-click on `index.html` and select **Open with Live Server**.

### Using Python
If you have Python installed, you can run a quick server from the command line:
```bash
# Python 3.x
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

## 🌐 Deployment
To make your website live, simply upload the contents of the root directory (all folders and HTML files) to your hosting provider.

**Compatible Platforms:**
- **Vercel / Netlify**: Connect your GitHub repo or drag-and-drop the folder.
- **GitHub Pages**: Push your code to a repository and enable Pages in settings.
- **Traditional Hosting (SFTP)**: Upload all files to your `public_html` or `www` directory.

---
[Return to Hub](../README.md) | [Go to Customization](customization.md)
