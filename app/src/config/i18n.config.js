import {I18n} from 'i18n-js';
import * as Localization from 'expo-localization';
import en from './../lang/en.json';
import tr from './../lang/tr-TR.json';

const i18n = new I18n({
    ...en,
    ...tr
});

i18n.defaultLocale = 'tr-TR';
i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default i18n;

