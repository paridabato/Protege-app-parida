import i18n  from 'i18n-js';
import en from './lang/en.json';
import fr from './lang/fr.json';
import * as Localization from 'expo-localization';
import { AsyncStorage } from 'react-native';

function setLang() {
  AsyncStorage.getItem('lang')
  .then( value => {
    if(value != null) {
      i18n.locale = value;
    } else {
      i18n.locale = Localization.locale;
    }
  })
  .catch( (error) => {
    console.log(error)
  })
}

setLang();

i18n.fallbacks = true;

i18n.translations = {
  en,
  fr
};

export function changeLang(lang) {
  AsyncStorage.setItem('lang', lang);
  setLang();
}

export function strings(name, params = {}) {
  return i18n.t(name, params);
};

export default i18n;