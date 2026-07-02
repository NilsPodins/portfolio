const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        navLinks.forEach(a => a.classList.remove('active'));
        document.querySelector('nav a[href="#contacts"]')?.classList.add('active');
        return;
    }

    let current = null;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
            current = section.id;
        }
    });

    navLinks.forEach(a => a.classList.remove('active'));
    if (current) {
        document.querySelector(`nav a[href="#${current}"]`)?.classList.add('active');
    }
});

let currentLang = 'lv';

function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
    currentLang = lang;
    document.querySelector('.lang-btn').textContent = lang === 'lv' ? 'LV ▾' : 'EN ▾';

    const cvLink = document.querySelector('a[download]');
    if (cvLink) cvLink.href = translations[lang].downloadCvHref;
}

function toggleLanguage() {
    setLanguage(currentLang === 'lv' ? 'en' : 'lv');
}

function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    const btn = document.querySelector('.hamburger');
    menu.classList.toggle('open');
    btn.textContent = menu.classList.contains('open') ? '✕' : '☰';
}


document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-menu').classList.remove('open');
        document.querySelector('.hamburger').textContent = '☰';
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.card, .exp-block').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});