import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ErrorMessagesService } from '@Attendance-web/errors/error-messages.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-new-semester-dialog',
  templateUrl: './new-semester-dialog.component.html',
  styleUrls: ['./new-semester-dialog.component.scss']
})
export class NewSemesterDialogComponent implements OnInit {

  semesterForm: FormGroup;
  
  constructor(public dialogRef: MatDialogRef<NewSemesterDialogComponent>,private db: AngularFirestore, private formBuilder: FormBuilder, public errorMessagesService: ErrorMessagesService, @Inject(MAT_DIALOG_DATA) private data: any) { 
    this.semesterForm = this.formBuilder.group({
      'semester': ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  newSemester = () =>{
    this.db.collection(this.semesterForm.value.semester);
    this.data["semesters"].push(this.semesterForm.value.semester);
    this.db.collection('semesters').doc('semesters').update(this.data);
    Swal.fire(
      'created!',
      'The Semester '+ this.semesterForm.value.semester +' has been created',
      'success'
    );
    this.dialogRef.close();
  }

}
