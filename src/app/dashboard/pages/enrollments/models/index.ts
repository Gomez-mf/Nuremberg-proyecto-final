
import { course } from '../../courses/models';
import { Student } from '../../students/models';

export interface Enrollment {
  id: number;
  courseId: number;
  studentId: number;
  student?: Student;
  course?: course;
}

export interface CreateEnrollmentPayload {
  courseId: number | null;
  studentId: number | null;
}