/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('main-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.remove('header-transparent');
                header.classList.add('header-scrolled');
            } else {
                header.classList.add('header-transparent');
                header.classList.remove('header-scrolled');
            }
        });
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = ''; // Restore scrolling
                // Switch icon back to menu
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
                lucide.createIcons();
            } else {
                mobileMenu.classList.remove('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                // Switch icon to close
                mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
                lucide.createIcons();
            }
        });
    }

    // 3. Dark Mode Toggle
    const themeToggles = [
        document.getElementById('theme-toggle'),
        document.getElementById('theme-toggle-mobile')
    ];
    
    // Check local storage or system preference
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    themeToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', () => {
                // Toggle dark mode class on HTML element
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            });
        }
    });

    // 4. RTL Toggle
    const rtlToggles = [
        document.getElementById('rtl-toggle'),
        document.getElementById('rtl-toggle-mobile')
    ];

    // Check local storage
    if (localStorage.getItem('direction') === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', () => {
                if (document.documentElement.getAttribute('dir') === 'rtl') {
                    document.documentElement.setAttribute('dir', 'ltr');
                    localStorage.setItem('direction', 'ltr');
                } else {
                    document.documentElement.setAttribute('dir', 'rtl');
                    localStorage.setItem('direction', 'rtl');
                }
                
                // Re-init AOS to fix positioning bugs when switching direction dynamically
                if (typeof AOS !== 'undefined') {
                    setTimeout(() => {
                        AOS.refresh();
                    }, 100);
                }
            });
        }
    });
});
