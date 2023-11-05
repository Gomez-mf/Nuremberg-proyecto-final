import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { StudentsComponent } from './pages/students/students.component';
import { StudentsDialogComponent } from './pages/students/components/students-dialog/students-dialog.component';
import { StudentsTableComponent } from './pages/students/components/students-table/students-table.component';
import { StudentsModule} from './pages/students/students.module';
import { CoursesTableComponent } from './pages/courses/components/courses-table/courses-table.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CoursesDialogComponent } from './pages/courses/components/courses-dialog/courses-dialog.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
    SidebarComponent,
    HomeComponent,
    StudentsComponent,
    StudentsDialogComponent,
    StudentsTableComponent,
    CoursesComponent,
    CoursesTableComponent,
    CoursesDialogComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatDialogModule,
    StudentsModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
