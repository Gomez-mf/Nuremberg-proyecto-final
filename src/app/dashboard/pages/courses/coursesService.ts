import { Injectable } from "@angular/core";
import { course } from "./models";
import { Observable, of} from "rxjs";

@Injectable({ providedIn: 'root'})
export class coursesService{
    courses: course[] = [
        {
            id: 1,
            name: 'Desarrollo web',
            description: 'Aprende a construir tu propio sitio web en HTML desde cero. Domina el lenguaje nativo de Internet e ingresa al mundo del desarrollo web.',
            duration: '15 semanas',
            price: '$60000'
        },
        {
            id: 2,
            name: 'JavaScript',
            description: 'Domina los fundamentos de la programación a través de uno de los lenguajes más utilizados del mercado. Aprende a generar desarrollos en entornos Web y Mobile.',
            duration: '10 semanas',
            price: '$40000'
        },
        {
            id: 3,
            name: 'React JS',
            description: 'Domina el Framework JavaScript más demandado en la industria para el desarrollo Front End. Aprende a construir un proyecto real desde cero utilizando las mejores prácticas del mercado laboral.',
            duration: '9 semanas',
            price: '$35000'
        },
        {
            id: 4,
            name: 'Angular',
            description: 'Aprende a crear una interfaz de usuario CRUD Maestro/Detalle con el framework para front-end más escalable y estructurado del mercado. Angular se caracteriza, sobre todo, por su arquitectura modular altamente escalable.',
            duration: '5 semanas',
            price: '$35000'
        },
    ];

    getCourses$(): Observable<course[]>{
        return of(this.courses)
    }

    createCourses$(paylod: course): Observable<course[]>{
        this.courses.push(paylod)
        
        return of([...this.courses])
    }

    editCourse$(id: number, payload: course): Observable<course[]> {
        return of(
          this.courses.map((c) => (c.id === id ? { ...c, ...payload } : c))
        );
      }

    deleteCourse$(id: number): Observable<course[]>{
        this.courses = this.courses.filter((c)=>c.id !== id)
        return of(this.courses)
    }

    getCourseById$(id: number): Observable<course | undefined> {
        console.log(this.courses);
        return of(this.courses.find((c) => c.id === id));
        
      }
}
