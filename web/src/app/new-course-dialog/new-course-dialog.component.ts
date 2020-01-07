import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ErrorMessagesService } from '@Attendance-web/errors/error-messages.service';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-course-dialog',
  templateUrl: './new-course-dialog.component.html',
  styleUrls: ['./new-course-dialog.component.scss']
})
export class NewCourseDialogComponent implements OnInit {

  courseForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<NewCourseDialogComponent>,private db: AngularFirestore, private formBuilder: FormBuilder, public errorMessagesService: ErrorMessagesService, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.courseForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'courseCode': ['', Validators.required],
      'semester': ['', Validators.required],
      'description' : ['', [Validators.required, Validators.maxLength(100)]]
    });
   }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  nuevoCurso = () =>{
    if (this.courseForm.valid) {
      let data = {
        course : this.courseForm.value.courseCode,
        courseCode : this.courseForm.value.courseCode,
        name : this.courseForm.value.name,
        ref: "/" + this.courseForm.value.semester + "/" + this.courseForm.value.courseCode,
        semester:this.courseForm.value.semester
      }

      let data2 = {
        description : this.courseForm.value.description,
        name : this.courseForm.value.name
      }
      this.db.collection('professors').doc(this.data["professor"]["email"]).collection("courses").doc(this.courseForm.value.semester + '%' + this.courseForm.value.courseCode).set(data);
      this.db.collection(this.courseForm.value.semester).doc(this.courseForm.value.courseCode).set(data2);
      this.db.collection(this.courseForm.value.semester).doc(this.courseForm.value.courseCode).collection("professors").doc(this.data["professor"]["email"]).set({ref: "/professors/" + this.data["professor"]["email"]});
      this.dialogRef.close();
      Swal.fire(
        'created!',
        'The Course '+ this.courseForm.value.courseCode +' has been created',
        'success'
      )
    }else{
      Swal.fire('Oops...', 'There is something missing in the form', 'error');
    }
  }


}
