import { Component } from '@angular/core';
import { Student } from '../students/models';
import { StudentsComponent } from '../students/students.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // loading = false;
  // constructor() {
  //   this.getStudents();
  // }
  // async getStudents(): Promise<void> {
  //   this.loading = true;
  //   const getStudentsPromise = new Promise((resolve, reject) => {
  //     const students: Student[] = [
  //       {
  //         id: 1,
  //         name: 'Malena',
  //         lastname: 'Areco',
  //         email: 'malenaAreco@gmail.com',
  //       },
  //     ];
  //     setTimeout(() => {
  //       reject([students]);
  //     }, 1000);
  //   });

  //   await getStudentsPromise
  //     .then((result) => console.log(result))
  //     .catch((error) => {
  //       alert('Error liu liu'), console.log(error);
  //     })
  //     .finally(() => {
  //       this.loading = false;
  //     });
  //   console.log('Hola mundo');
  // }
}
