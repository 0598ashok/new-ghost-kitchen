/**
 * Ghost Kitchen Navbar V4.4
 * Interactions Only — HTML is static in each page file.
 * Handles: scroll, mobile menu, dropdowns, theme, direction, active links.
 */

(function () {
    const header = document.getElementById('main-header');
    if (!header) return;

    // 1. Scroll: pill shrinks on scroll
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    });

    // 2. Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            header.classList.toggle('menu-open');
            document.body.classList.toggle('no-scroll');
        });
    }

    // 3. Mobile sub-dropdowns
    document.querySelectorAll('.mobile-dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.closest('.has-mobile-dropdown');
            parent.classList.toggle('expanded');
            const icon = trigger.querySelector('i');
            if (icon) icon.className = parent.classList.contains('expanded') ? 'fas fa-minus' : 'fas fa-plus';
        });
    });

    // 4. Theme toggle (light / dark)
    const themeToggle = document.getElementById('theme-toggle');
    const updateThemeIcon = (theme) => {
        const icon = themeToggle?.querySelector('i');
        if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    };
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    // 5. Direction toggle (LTR / RTL)
    const dirToggle = document.getElementById('dir-toggle');
    const ltrText = 'LTR';
    const rtlText = 'RTL';

    const applyDir = (dir) => {
        document.documentElement.dir = dir;
        localStorage.setItem('dir', dir);
        window.dispatchEvent(new CustomEvent('directionChanged', { detail: { direction: dir } }));
        if (dirToggle) {
            dirToggle.innerHTML = dir === 'rtl' ? ltrText : rtlText;
            dirToggle.classList.toggle('active', dir === 'rtl');
        }
    };
    const currentDir = localStorage.getItem('dir') || 'ltr';
    applyDir(currentDir);
    if (dirToggle) {
        dirToggle.addEventListener('click', () => {
            applyDir(document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl');
        });
    }

    // 6. Active link highlighting
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link, .mobile-dropdown-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.split('/').pop() === currentFile) {
            link.classList.add('active');
            const parentDropdown = link.closest('.nav-item.has-dropdown');
            if (parentDropdown) parentDropdown.querySelector('.nav-link')?.classList.add('active-parent');
        }
    });
})();
