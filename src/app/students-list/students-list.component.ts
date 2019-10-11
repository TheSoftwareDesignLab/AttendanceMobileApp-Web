import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material';
import { ErrorMessagesService } from '../errors/error-messages.service';
import {NewStudentDialogComponent} from '../new-student-dialog/new-student-dialog.component'

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent {
  title = 'Attendance List';
  studentForm: FormGroup;
  students: Observable<any[]>;
  todayAttendance: Observable<any[]>

  constructor(public dialog: MatDialog, private db: AngularFirestore, private formBuilder: FormBuilder, public errorMessagesService: ErrorMessagesService) {
    const today = new Date();
    this.students = db.collection('studentsList').valueChanges();
    this.todayAttendance = db.collection('attendance').doc(today.getDate()+"-"+today.getMonth()+"-"+today.getFullYear()).collection('students').valueChanges();
    this.studentForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'code': ['', Validators.required],
      'mac' : ['', [Validators.required, Validators.minLength(17),Validators.maxLength(17)]]
    });
  }

  openDialog()
  {
    this.dialog.open(NewStudentDialogComponent);
  }
 
}
