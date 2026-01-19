/* script.js - Lógica e Configurações */

// 1. Configuração do Tailwind CSS
tailwind.config = {
    theme: {
        extend: {
            fontFamily: { sans: ['"Inter"', 'sans-serif'] },
            colors: {
                brand: {
                    50: '#f0f4fe', 100: '#dde6fc', 200: '#c2d4fa', 300: '#9abbf6',
                    400: '#689af0', 500: '#437be6', 600: '#2e61d6', 700: '#0f52ba',
                    800: '#204196', 900: '#1f3875', 950: '#152346',
                },
            },
            animation: { 'float-slow': 'float 8s ease-in-out infinite' },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
};

// 2. Configuração do WhatsApp
const whatsappNumber = "5511980160507"; 
// Definido como variável global para ser acessado pelo onclick no HTML
var whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá! Vim pelo Portal do Cliente e preciso de atendimento financeiro.`;

// 3. Lógica do Menu Mobile
const mobileBtn = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

function toggleMenu() {
    const isOpen = !mobileMenu.classList.contains('translate-x-full');
    if (isOpen) {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = 'auto';
    } else {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    }
}

if(mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
if(mobileClose) mobileClose.addEventListener('click', toggleMenu);

// 4. Efeito de Scroll no Header
window.addEventListener('scroll', () => {
    const headerBg = document.getElementById('header-bg');
    if (headerBg) {
        if (window.scrollY > 20) {
            headerBg.classList.remove('opacity-0');
        } else {
            headerBg.classList.add('opacity-0');
        }
    }
});

// 5. Banner de Cookies
setTimeout(() => {
    const banner = document.getElementById('cookie-banner');
    if(banner) banner.classList.remove('translate-y-full', 'opacity-0');
}, 2000);

function acceptCookies() {
    const banner = document.getElementById('cookie-banner');
    if(banner) banner.classList.add('translate-y-full', 'opacity-0');
}