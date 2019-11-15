import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewSemesterDialogComponent } from '@Attendance-web/new-semester-dialog/new-semester-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ErrorMessagesService } from '@Attendance-web/errors/error-messages.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-professor-dialog',
  templateUrl: './new-professor-dialog.component.html',
  styleUrls: ['./new-professor-dialog.component.scss']
})
export class NewProfessorDialogComponent implements OnInit {

  professorForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewSemesterDialogComponent>,private db: AngularFirestore, private formBuilder: FormBuilder, public errorMessagesService: ErrorMessagesService, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.professorForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', Validators.email],
    });
   }

  ngOnInit() {
  }

  newProfessor = () => {
    if (this.professorForm.valid) {
    }else{
      Swal.fire('Oops...', 'There is something missing in the form', 'error');
    }

  }

}
