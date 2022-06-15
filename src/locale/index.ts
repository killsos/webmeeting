
import zh from './zh';
import en from './en';
import ar from './ar';
import { createI18n, I18nOptions } from 'vue-i18n'


const messages = {
    en: { ...en },
    ar: { ...ar},
    zh: { ...zh },
};

const i18Option:I18nOptions = {
    locale: 'ar',
    messages,
};

const i18n = createI18n(i18Option);

export default  i18n;

