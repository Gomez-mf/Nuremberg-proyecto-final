import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { StudentsComponent } from './pages/students/students.component';
import { UsersComponent } from './pages/users/users.component';
import { DashboardComponent } from './dashboard.component';
import { adminGuard } from '../core/guards/admin.guard';

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
            path: 'users',
            canActivate: [adminGuard],
            component: UsersComponent,
          },
          { path: 'courses', component: CoursesComponent },
          {
            path: 'enrollments',
            loadChildren: () =>
              import('./pages/enrollments/enrollments.module').then(
                (m) => m.EnrollmentsModule
              ),
          },
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
