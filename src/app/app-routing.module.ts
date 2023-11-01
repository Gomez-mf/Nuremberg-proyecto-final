import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { StudentsComponent } from './dashboard/pages/students/students.component';
import { CoursesComponent } from './dashboard/pages/courses/courses.component';
import { StudentDetailComponent } from './dashboard/pages/students/components/student-detail/student-detail.component';
import { EnrollmentsComponent } from './dashboard/pages/enrollments/enrollments.component';
import { UsersComponent } from './dashboard/pages/users/users.component';

const routes: Routes = [
  {
    path: 'dashboard',
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
        path:'**',
        redirectTo: 'home'
      }
    ],

  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
