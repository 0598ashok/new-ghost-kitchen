/**
 * Ghost Kitchen Navbar V4.3
 * Bulletproof Path & Dropdown System
 */

(function() {
    const header = document.getElementById('main-header');
    if (!header) return;

    // 1. Path Detection Logic
    const isPagesFolder = window.location.pathname.includes('/pages/');
    const rootRel = isPagesFolder ? '../' : './';
    const pagesRel = isPagesFolder ? './' : './pages/';

    // 2. Navigation Data (Nested Structure)
    const navData = [
        { 
            label: 'Home', 
            link: `${rootRel}index.html`,
            children: [
                { label: 'Home V1', link: `${rootRel}index.html` },
                { label: 'Home V2', link: `${pagesRel}index-2.html` }
            ]
        },
        { label: 'About', link: `${pagesRel}about.html` },
        { label: 'Services', link: `${pagesRel}services.html` },
        { label: 'Menu', link: `${pagesRel}menu.html` },
        { 
            label: 'Pages', 
            link: '#',
            children: [
                { label: '404 Page', link: `${pagesRel}404.html` },
                { label: 'Coming Soon', link: `${pagesRel}coming-soon.html` }
            ]
        },
        { label: 'Blogs', link: `${pagesRel}blog.html` },
        { label: 'Contact', link: `${pagesRel}contact.html` }
    ];

    // 3. Render HTML
    const render = () => {
        const logoLink = `${rootRel}index.html`;
        const orderLink = `${pagesRel}order.html`;
        
        const html = `
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="${logoLink}">Ghost Kitchen</a>
                </div>

                <ul class="nav-links">
                    ${navData.map(item => `
                        <li class="nav-item ${item.children ? 'has-dropdown' : ''}">
                            <a href="${item.link}" class="nav-link">
                                ${item.label} ${item.children ? '<i class="fas fa-chevron-down"></i>' : ''}
                            </a>
                            ${item.children ? `
                                <ul class="dropdown-menu">
                                    ${item.children.map(child => `
                                        <li><a href="${child.link}" class="dropdown-link">${child.label}</a></li>
                                    `).join('')}
                                </ul>
                            ` : ''}
                        </li>
                    `).join('')}
                </ul>

                <div class="nav-utils">
                    <div class="util-icon" id="theme-toggle" title="Toggle Theme">
                        <i class="fas fa-moon"></i>
                    </div>
                    <div class="util-icon" id="dir-toggle" title="Toggle Direction">
                        <i class="fas fa-arrows-alt-h"></i>
                    </div>
                    <a href="${orderLink}" class="btn-cta btn-order-desktop">Order Now</a>
                    
                    <div class="mobile-toggle" id="mobile-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <div class="mobile-menu" id="mobile-menu">
                <ul class="mobile-nav-list">
                    ${navData.map(item => `
                        <li class="mobile-nav-item ${item.children ? 'has-mobile-dropdown' : ''}">
                            <a href="${item.children ? 'javascript:void(0)' : item.link}" class="mobile-nav-link ${item.children ? 'mobile-dropdown-trigger' : ''}">
                                ${item.label} ${item.children ? '<i class="fas fa-plus"></i>' : ''}
                            </a>
                            ${item.children ? `
                                <ul class="mobile-dropdown">
                                    ${item.children.map(child => `
                                        <li><a href="${child.link}" class="mobile-dropdown-link">${child.label}</a></li>
                                    `).join('')}
                                </ul>
                            ` : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;

        header.innerHTML = html;
        header.classList.add('navbar-v4');
    };

    // 4. Interaction Logic
    const initInteractions = () => {
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const themeToggle = document.getElementById('theme-toggle');
        const dirToggle = document.getElementById('dir-toggle');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });

        if (mobileToggle) {
            mobileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                header.classList.toggle('menu-open');
                mobileMenu.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });
        }

        const mobileTriggers = document.querySelectorAll('.mobile-dropdown-trigger');
        mobileTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const parent = trigger.closest('.has-mobile-dropdown');
                parent.classList.toggle('expanded');
                const icon = trigger.querySelector('i');
                if (icon) icon.className = parent.classList.contains('expanded') ? 'fas fa-minus' : 'fas fa-plus';
            });
        });

        // Theme Toggle
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

        // Direction Toggle (LTR/RTL)
        const updateDirState = (dir) => {
            document.documentElement.dir = dir;
            localStorage.setItem('dir', dir);
            window.dispatchEvent(new CustomEvent('directionChanged', { detail: { direction: dir } }));
            
            // UI Feedback: Toggle active class or change icon if needed
            if (dirToggle) {
                dirToggle.classList.toggle('active', dir === 'rtl');
            }
        };

        const currentDir = localStorage.getItem('dir') || 'ltr';
        document.documentElement.dir = currentDir;
        if (dirToggle) {
            dirToggle.classList.toggle('active', currentDir === 'rtl');
            dirToggle.addEventListener('click', () => {
                const newDir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl';
                updateDirState(newDir);
            });
        }

        const currentFileName = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link, .mobile-dropdown-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const linkFile = href.split('/').pop();
                if (linkFile === currentFileName) {
                    link.classList.add('active');
                    link.closest('.has-dropdown')?.querySelector('.nav-link')?.classList.add('active-parent');
                }
            }
        });
    };

    render();
    setTimeout(initInteractions, 10);
})();
