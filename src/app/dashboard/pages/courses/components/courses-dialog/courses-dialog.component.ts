import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { coursesService } from '../../courses.service';
import { course } from '../../models';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.css'],
})
export class CoursesDialogComponent {


  nameControl = new FormControl('',[Validators.required, Validators.maxLength(20)]);
  descriptionControl = new FormControl('', Validators.required);
  durationsControl = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  priceControl = new FormControl('',[Validators.required, Validators.maxLength(8)]);

  courseForm = new FormGroup({
    name: this.nameControl,
    duration: this.durationsControl,
    description: this.descriptionControl,
    price: this.priceControl,
  });

  
  constructor(
    private matDialogRef: MatDialogRef<CoursesDialogComponent>,
    private courseService: coursesService,
    @Inject(MAT_DIALOG_DATA) public course: course
  ) {

    if (this.course) {
      this.courseForm.patchValue(this.course);
    }

}

onSubmit(): void {
  if (this.courseForm.invalid) {
    return this.courseForm.markAllAsTouched();
  } else {
    this.matDialogRef.close(this.courseForm.value);
  }
}
}