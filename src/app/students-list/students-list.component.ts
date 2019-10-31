import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ErrorMessagesService } from '../errors/error-messages.service';
import { NewStudentDialogComponent } from '../new-student-dialog/new-student-dialog.component';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent {
  title = 'Attendance List';
  studentForm: FormGroup;
  students: Observable<any[]>;
  todayAttendance: Observable<any[]>;
  course: string;
  day: Date;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private db: AngularFirestore,
    private formBuilder: FormBuilder,
    public errorMessagesService: ErrorMessagesService,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.course = params.get('courseID');
    });
    this.students = db
      .collection('2019-20')
      .doc(this.course + '')
      .collection('students')
      .valueChanges();
    //this.todayAttendance = db.collection('attendance').doc(today.getDate()+"-"+today.getMonth()+"-"+today.getFullYear()).collection('students').valueChanges();
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      mac: [
        '',
        [
          Validators.required,
          Validators.minLength(17),
          Validators.maxLength(17)
        ]
      ]
    });
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    let x  = event.value;
    this.day.setTime(x.getTime());
    console.log(this.day.toUTCString);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.course = params.get('courseID');
    });
  }

  openDialog() {
    this.dialog.open(NewStudentDialogComponent);
  }

  randomQuiz() {
    this.route.paramMap.subscribe(params => {
      this.router.navigateByUrl(`randomQuiz/${params.get('courseID')}`);
    });
  }
}
