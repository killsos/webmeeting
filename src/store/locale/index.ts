import i18n from '@/locale/index'

const setDirection = () => {
    if( i18n.global.locale === 'ar') {
        document.body.style.direction = 'rtl';
    } else {
        document.body.style.direction = 'ltr';
    }
}

export function getLocale() {
    return i18n.global.locale;
}

export function setLocale(language: string) {
    i18n.global.locale = language;
    setDirection()
}

export function setDefaultLocale() {
    i18n.global.locale = navigator.language.slice(0, 2);
    setDirection();
    console.log('setDefaultLocale', i18n.global.locale);
}
