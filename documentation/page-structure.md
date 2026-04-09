# 📂 Page Structure & Repository Architecture

Understanding the layout of the **Ghost Kitchen** repository will help you navigate and modify the template efficiently.

## 📁 Root Directory
- `index.html`: The primary Landing Page (Home v1).
- `README.md`: Project overview and entry point.
- `documentation/`: Contains all technical guides and supporting docs.

## 📁 Assets Directory (`/assets`)
- `css/`:
    - `style.css`: The core stylesheet containing all layout, component, and theme logic.
- `js/`:
    - `main.js`: Handles theme toggling, scroll animations, and general UI logic.
    - `navbar-v4.js`: Modular script specifically for the responsive, high-fidelity navigation system.
- `images/`:
    - `logos/`: Branding assets.
    - `dishes/`: High-quality menu item images.
    - `ui/`: Backgrounds, icons, and interface elements.
- `fonts/`: (Optional) Local font binaries for peak performance.

## 📁 Pages Directory (`/pages`)
This directory contains every secondary page of the template, pre-configured for consistent branding.

- `index-2.html`: An alternative Home Page layout with different section arrangements.
- `about.html`: Corporate narrative and brand story.
- `services.html`: Detailed breakdown of ghost kitchen offerings.
- `menu.html`: A structured, visual menu for culinary displays.
- `order.html`: A clean, focused interface for the customer checkout flow.
- `blog.html`: Editorial layout for culinary news and updates.
- `contact.html`: Support hub and inquiry forms.
- `coming-soon.html`: A high-impact maintenance page with a countdown or lead-gen form.
- `404.html`: A stylized error page to keep users engaged even when they get lost.

---
[Return to Hub](../README.md) | [Go to Customization](customization.md)
