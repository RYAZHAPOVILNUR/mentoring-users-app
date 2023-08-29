export const Languages = {
  Russian: 'ru',
  English: 'en'
} as const;

export type LanguageKeys = typeof Languages[keyof typeof Languages];