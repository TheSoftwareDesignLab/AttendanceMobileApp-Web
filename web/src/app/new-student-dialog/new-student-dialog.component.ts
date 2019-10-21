import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ErrorMessagesService } from '../errors/error-messages.service';

@Component({
  selector: 'app-new-student-dialog',
  templateUrl: './new-student-dialog.component.html',
  styleUrls: ['./new-student-dialog.component.scss']
})
export class NewStudentDialogComponent {
  studentForm: FormGroup;

  constructor(private db: AngularFirestore, private formBuilder: FormBuilder, public errorMessagesService: ErrorMessagesService) {
    const today = new Date();
    this.studentForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'code': ['', Validators.required],
      'mac' : ['', [Validators.required, Validators.minLength(17),Validators.maxLength(17)]]
    });
  }

  nuevoEstudiante() {
    if (this.studentForm.valid) {
      this.studentForm.value.mac = this.studentForm.value.mac.toUpperCase();
      this.db.collection('studentsList').doc(this.studentForm.value.code).get().subscribe( result => {
        if (!result.exists || result.get('mac') === this.studentForm.value.mac) {
          this.db.collection('studentsList').doc(this.studentForm.value.code).set(this.studentForm.value).then( ok => {
            Swal.fire('Great', 'You have been added to the system', 'success')
          });
        } else {
          Swal.fire('Oops...', 'There is already a student with that code in this system', 'error')
        }
      });
    } else {
      Swal.fire('Oops...', 'There is something missing in the form', 'error')
    }
  }
}
