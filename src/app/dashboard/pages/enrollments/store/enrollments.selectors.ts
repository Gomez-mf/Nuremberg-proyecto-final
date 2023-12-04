import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollments from './enrollments.reducer';

export const selectEnrollmentsState =
  createFeatureSelector<fromEnrollments.State>(
    fromEnrollments.enrollmentsFeatureKey
  );

export const selectEnrollments = createSelector(
  selectEnrollmentsState,
  (state) => state.enrollments
);

export const selectCourses = createSelector(
  selectEnrollmentsState,
  (state) => state.coursesOptions
);

export const selectStudents = createSelector(
  selectEnrollmentsState,
  (state) => state.studentsOptions
);
