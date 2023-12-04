import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';
import { EnrollmentsActions } from './enrollments.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroments.local';
import { CreateEnrollmentPayload, Enrollment } from '../models';
import { course } from '../../courses/models';
import { Student } from '../../students/models';

@Injectable()
export class EnrollmentsEffects {
  loadEnrollmentss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.loadEnrollments),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getEnrollments().pipe(
          map((data) => EnrollmentsActions.loadEnrollmentsSuccess({ data })),
          catchError((error) =>
            of(EnrollmentsActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });

  loadEnrollmentsDialogOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.loadEnrollmentDialogOptions),
      concatMap(() =>
        this.getEnrollmentsDialogOptions().pipe(
          map((resp) =>
            EnrollmentsActions.loadEnrollmentDialogOptionsSucess(resp)
          ),
          catchError((error)=>
          of(EnrollmentsActions.loadEnrollmentDialogOptionsFailure({ error }))
          )
        )
      )
    );
  });

  createEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentsActions.createEnrollment),
      concatMap((action)=> {
        return this.createEnrollment(action.payload).pipe(
          map(data => EnrollmentsActions.loadEnrollments()),
          catchError((error) =>
          of(EnrollmentsActions.createEnrollmentFailure({ error }))
        )
        )
      })
    )
  )

  deleteEnrollments$ = createEffect(()=>
  this.actions$.pipe(
    ofType(EnrollmentsActions.deleteEnrollment),
    mergeMap(action => this.deleteEnrollment(action.id).pipe(
      map(()=> EnrollmentsActions.deleteEnrollmentsSucess({id: action.id}))
    ))
    // concatMap((action)=>{
    //   return this.deleteEnrollment(action.id).pipe(
    //     map(()=>{
    //       return this.deleteEnrollment(id:action.id)
    //     })
    //   )
    // })
    
  ))

  constructor(private actions$: Actions, private httpclient: HttpClient) {}

  createEnrollment(payload: CreateEnrollmentPayload): Observable<Enrollment[]>{
    return this.httpclient.post<Enrollment[]>(`${environment.baseUrl}/enrollments`, payload)
  }

  getEnrollmentsDialogOptions(): Observable<{
    courses: course[];
    students: Student[];
  }> {
    return forkJoin([
      this.httpclient.get<course[]>(`${environment.baseUrl}/courses`),
      this.httpclient.get<Student[]>(`${environment.baseUrl}/students`),
    ]).pipe(
      map(([courses, students]) => {
        return {
          courses,
          students,
        };
      })
    );
  }

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpclient.get<Enrollment[]>(
      `${environment.baseUrl}/enrollments?_expand=course&_expand=student`
    );
  }

  deleteEnrollment(id: number): Observable<Enrollment[]>
  {
    return this.httpclient.delete<Enrollment[]>(`${environment.baseUrl}/enrollments/${id}`)
  }
}
