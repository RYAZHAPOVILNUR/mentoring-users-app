import { TimerWidgetState } from './user-timer-widget.model';

const STORAGE_KEY = 'user-timer-widget-state';

export const TimerWidgetStorage = {
    load(): TimerWidgetState | null {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        try {
            return JSON.parse(raw) as TimerWidgetState;
        } catch {
            return null;
        }
    },

    save(state: TimerWidgetState): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
};
