import { Languages } from '../constants/languages.constant';

export type LanguageKeys = (typeof Languages)[keyof typeof Languages];
