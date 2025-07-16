import { InjectionToken } from '@angular/core';

import { Theme } from '../interfaces/theme.interface';

export const THEMES_TOKEN = new InjectionToken<Theme[]>('THEMES_TOKEN');
