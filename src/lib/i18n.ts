import en from './dictionaries/en.json'
import th from './dictionaries/th.json'
import { Dictionary } from './types/dictionary';

export const getDictionary = (locale: string): Dictionary => {
  switch (locale) {
    case 'th':
      return th as Dictionary;
    default:
      return en as Dictionary;
  }
}
