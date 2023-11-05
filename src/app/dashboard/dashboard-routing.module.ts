import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { EnrollmentsComponent } from './pages/enrollments/enrollments.component';
import { StudentDetailComponent } from './pages/students/components/student-detail/student-detail.component';
import { StudentsComponent } from './pages/students/students.component';
import { UsersComponent } from './pages/users/users.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          { path: 'home', component: HomeComponent },
          {
            path: 'students',
            component: StudentsComponent,
          },
          {
            path: 'students/detail/:id',
            component: StudentDetailComponent,
          },
          {
            path: 'teachers',
            component: UsersComponent,
          },
          { path: 'courses', component: CoursesComponent },
          { path: 'enrollments', component: EnrollmentsComponent },
          {
            path: '**',
            redirectTo: 'home',
          },
        ]

      },
    ]),
  ],
  exports:[RouterModule]
})
export class DashboardRoutingModule {}
