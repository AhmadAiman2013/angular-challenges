import { createAction, props } from '@ngrx/store';
import { Activity } from './activity.model';

const loadActivitiesSuccess = createAction(
  '[Activity Effect] Load Activities Success',
  props<{ activities: Activity[] }>(),
);

const loadActivitiesFailure = createAction(
  '[Activity Effect] Load Activities Failure',
  props<{ error: string }>(),
);

export const ActivityActions = {
  loadActivitiesSuccess,
  loadActivitiesFailure,
};
