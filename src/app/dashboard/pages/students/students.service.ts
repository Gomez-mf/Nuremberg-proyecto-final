import { Inject, Injectable } from '@angular/core';
import { Student } from './models';
import { apiUrl, apiUrlConfig } from 'src/app/config/url.token';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {

  private students: Student[] = [
    {
      id: 1,
      name: 'Malena',
      lastname: 'Areco',
      email: 'malenaAreco@gmail.com',
      subjects: 5,
      age: 25,
    },
    {
      id: 2,
      name: 'Cecilia',
      lastname: 'Almaraz',
      email: 'cecilia.almaraz@gmail.com',
      subjects: 1,
      age: 25,
      
    },
    {
      id: 3,
      name: 'Karina',
      lastname: 'Candia',
      email: 'candia.katina.98@gmail.com',
      subjects: 8,
      age: 23,
    },
    {
      id: 4,
      name: 'Eliana',
      lastname: 'Meza',
      email: 'mezaEliana88@gmail.com',
      subjects: 3,
      age: 22,
    },
  ];

  private students$ = new BehaviorSubject<Student[]>([]);

  private studentsObservable$ = this.students$.asObservable();

  loadStudents(): void {
    this.students$.next(this.students);
  }

  getStudents(): Observable<Student[]> {
    return this.studentsObservable$;
  }
}
