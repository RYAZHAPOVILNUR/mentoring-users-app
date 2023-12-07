<<<<<<< HEAD
export const Languages = {
  Russian: 'ru',
  English: 'en'
} as const;

=======
export const Languages = {
  Russian: 'ru',
  English: 'en'
} as const;

>>>>>>> feature-branch
export type LanguageKeys = typeof Languages[keyof typeof Languages];