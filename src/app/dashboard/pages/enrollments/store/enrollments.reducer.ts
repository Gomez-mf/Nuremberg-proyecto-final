import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentsActions } from './enrollments.actions';
import { Enrollment } from '../models';
import { course } from '../../courses/models';
import { Student } from '../../students/models';

export const enrollmentsFeatureKey = 'enrollments';

export interface State {
  isLoading: boolean;
  isLoadingMatDialog: boolean;
  enrollments: Enrollment[];
  coursesOptions: course[];
  studentsOptions: Student[];
  error: unknown;
}

export const initialState: State = {
  isLoading: false,
  isLoadingMatDialog: false,
  enrollments: [],
  coursesOptions: [],
  studentsOptions: [],
  error: null,
};

export const reducer = createReducer(
  initialState,

  //Enrollments
  on(EnrollmentsActions.loadEnrollments, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(EnrollmentsActions.loadEnrollmentsSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    enrollments: data,
  })),
  on(EnrollmentsActions.loadEnrollmentsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  //MatDialog
  on(EnrollmentsActions.loadEnrollmentDialogOptions, (state) => {
    return {
      ...state,
      isLoadingMatDialog: true,
    };
  }),
  on(EnrollmentsActions.loadEnrollmentDialogOptionsSucess, (state, action) => ({
    ...state,
    coursesOptions: action.courses,
    studentsOptions: action.students,
    isLoadingMatDialog: false,
  })),

  on(EnrollmentsActions.loadEnrollmentDialogOptionsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EnrollmentsActions.deleteEnrollment, (state, { id}) => {
    return {
      ...state,
      enrollments: state.enrollments.filter((enrollment)=>enrollment.id !== id),

    }
  })
);

export const enrollmentsFeature = createFeature({
  name: enrollmentsFeatureKey,
  reducer,
});
