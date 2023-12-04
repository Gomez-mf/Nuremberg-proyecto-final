import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateEnrollmentPayload, Enrollment } from '../models';
import { course } from '../../courses/models';
import { Student } from '../../students/models';

export const EnrollmentsActions = createActionGroup({
  source: 'Enrollments',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[]}>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
    'Load Enrollment DialogOptions': emptyProps(),
    'Load Enrollment DialogOptions Sucess': props<{ courses: course[]; students: Student[]}>(),
    'Load Enrollment DialogOptions Failure': props<{ error: unknown}>(),
    'Create Enrollment': props< {payload: CreateEnrollmentPayload}>(),
    'Create Enrollment Failure': props<{ error: unknown }>(),
    'Delete Enrollment': props<{ id: number}>(),
    'Delete Enrollments Sucess': props<{ id: number}>(),
  }
});
