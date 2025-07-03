/*=============== BASE SETUP & NAVBAR ===============*/
const e=document.getElementById('nav-menu'),c=document.getElementById('nav-toggle'),n=document.getElementById('nav-close'),o=document.querySelectorAll('.nav-link'),t=document.querySelector('.header');
// Show & Hide Mobile Menu
if(c){c.addEventListener('click',()=>e.classList.add('active'))}if(n){n.addEventListener('click',()=>e.classList.remove('active'))}o.forEach(c=>c.addEventListener('click',()=>e.classList.remove('active')));
// Header Shadow on Scroll
window.addEventListener('scroll',()=>{t.classList.toggle('scroll-header',window.scrollY>=50)});
/*=============== MENU FILTER ===============*/const i=document.querySelectorAll('.category-btn');const l=document.querySelectorAll('.menu-item');i.forEach(c=>{c.addEventListener('click',()=>{i.forEach(c=>c.classList.remove('active'));c.classList.add('active');const e=c.dataset.category;l.forEach(c=>{if(e==='all'||c.dataset.category===e){c.style.display='block'}else{c.style.display='none'}})})});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
   origin: 'top',
   distance: '60px',
   duration: 2500,
   delay: 400,
});

sr.reveal(`.home-text, .heading`);
sr.reveal(`.home-img, .about-container, .menu-grid, .contact-container, .services-container, .testimonials-container`, {delay: 500});
sr.reveal(`.menu-item`, {interval: 100});


// ===================================
// LANGUAGE & THEME & TYPING LOGIC
// ===================================

const langSwitcherButton = document.getElementById('lang-switcher');
const themeCheckbox = document.getElementById('theme-checkbox');
const body = document.body;
const typedElement = document.getElementById('typed-text');
let currentTypedInstance; // To hold the Typed.js instance

// --- 1. TRANSLATIONS OBJECT ---
const translations = {
    en: {
        nav_home: "Home", nav_about: "About Us", nav_menu: "Menu", nav_services: "Services", nav_contact: "Contact Us",
        hero_subtitle: "Welcome to Taste",
        hero_title: "Discover the True <br> Taste of Happiness",
        hero_description: "We offer you the most delicious meals, prepared with great care from the freshest ingredients.",
        hero_btn_menu: "Browse Menu", hero_btn_order: "Order Now",
        about_subtitle: "About Us", about_title: "We Serve The Best<br>& Freshest Food", about_description: "At Taste, we pride ourselves on providing the best dining experience. We use the finest fresh ingredients and follow the highest quality standards.",
        services_subtitle: "Our Services", services_title: "We Provide The Best Services", service1_title: "Quality Food", service1_desc: "We use the finest and freshest ingredients to prepare our meals.", service2_title: "Fast Delivery", service2_desc: "We guarantee your order arrives as quickly as possible.", service3_title: "Continuous Support", service3_desc: "Our customer service team is always available to answer your inquiries.",
        menu_subtitle: "Our Menu", menu_title: "Our Signature Meals",
        footer_contact_title: "Contact Info", footer_links_title: "Quick Links", footer_brand_title: "Taste",
        copyright_text: "&copy; 2024 All rights reserved - Designed & Developed by Khalid Abd Elhamid"
    },
    ar: {
        nav_home: "الرئيسية", nav_about: "من نحن", nav_menu: "القائمة", nav_services: "خدماتنا", nav_contact: "اتصل بنا",
        hero_subtitle: "مرحباً بكم في Taste",
        hero_title: "اكتشف طعم <br> السعادة الحقيقي",
        hero_description: "نقدم لكم أشهى وألذ الوجبات المحضرة بعناية فائقة من أجود المكونات الطازجة.",
        hero_btn_menu: "تصفح القائمة", hero_btn_order: "اطلب الآن",
        about_subtitle: "من نحن", about_title: "نقدم ألذ وأشهى<br>المأكولات", about_description: "نحن في Taste نفخر بتقديم أفضل تجربة طعام لعملائنا. نستخدم أجود المكونات الطازجة ونتبع أعلى معايير الجودة.",
        services_subtitle: "خدماتنا", services_title: "نقدم لكم أفضل الخدمات", service1_title: "جودة الطعام", service1_desc: "نستخدم أجود المكونات الطازجة ونتبع أعلى معايير الجودة.", service2_title: "توصيل سريع", service2_desc: "نضمن وصول طلبك في أسرع وقت ممكن وبحالة ممتازة.", service3_title: "دعم متواصل", service3_desc: "فريق خدمة العملاء متاح دائماً للرد على استفساراتكم.",
        menu_subtitle: "قائمتنا", menu_title: "أشهى الوجبات المميزة",
        footer_contact_title: "معلومات الاتصال", footer_links_title: "روابط سريعة", footer_brand_title: "Taste",
        copyright_text: "جميع الحقوق محفوظة &copy; 2024 - تصميم وتطوير خالد عبد الحميد"
    }
};

// --- 2. HELPER FUNCTIONS (THEME, LANGUAGE, TYPING) ---
function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('darkmode');
        if(themeCheckbox) themeCheckbox.checked = true;
    } else {
        body.classList.remove('darkmode');
        if(themeCheckbox) themeCheckbox.checked = false;
    }
    localStorage.setItem('theme', theme);
}

function initializeTyping(language) {
    console.log("Attempting to initialize typing for language:", language); 

    if (typedElement) {
        console.log("Found #typed-text element. Creating new Typed instance."); 

        const strings = language === 'ar' 
            ? ['اكتشف طعم <br> السعادة الحقيقي', 'أفضل برجر في سوهاج', 'وجبات شهية تنتظرك']
            : ['Discover the True <br> Taste of Happiness', 'The Best Burger in Town', 'Delicious Meals Await You'];

        const options = { strings, typeSpeed: 70, backSpeed: 40, loop: true, showCursor: true, cursorChar: '|' };

        if(currentTypedInstance) {
            currentTypedInstance.destroy();
        }
        currentTypedInstance = new Typed(typedElement, options);

        console.log("Typed.js instance created successfully."); 
    } else {
        console.error("CRITICAL ERROR: Could not find element with id 'typed-text'!"); 
    }
}
function setLanguage(language) {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[language][key]) {
            element.innerHTML = translations[language][key];
        }
    });
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    if(langSwitcherButton) langSwitcherButton.textContent = language === 'ar' ? 'EN' : 'ع';
    localStorage.setItem('language', language);
    initializeTyping(language); // Re-initialize typing with new language strings
}

// --- 3. EVENT LISTENERS ---
if (langSwitcherButton) {
    langSwitcherButton.addEventListener('click', () => {
        const newLang = document.documentElement.lang === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
    });
}

if (themeCheckbox) {
    themeCheckbox.addEventListener('change', () => {
        const newTheme = themeCheckbox.checked ? 'dark' : 'light';
        applyTheme(newTheme);
    });
}

// --- 4. ON PAGE LOAD ---
// --- 4. ON PAGE LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("Page fully loaded. Starting initial setup."); 

    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLang = localStorage.getItem('language') || 'ar';

    console.log(`Applying theme: ${savedTheme}, Applying language: ${savedLang}`); 

    applyTheme(savedTheme);
    setLanguage(savedLang); // This will also trigger initializeTyping
});