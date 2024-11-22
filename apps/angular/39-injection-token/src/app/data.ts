import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMER = 1000;

export const TIMER_STATE = new InjectionToken<number>('TimerState', {
  factory: () => DEFAULT_TIMER,
});

/**
 * Provide a time value with type safety
 * @param timer Timer value in ms
 */
export function provideTimer(timer: number) {
  return { provide: TIMER_STATE, useValue: timer };
}
