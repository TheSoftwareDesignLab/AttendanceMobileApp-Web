import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { NewCourseDialogComponent } from '../new-course-dialog/new-course-dialog.component';
import Swal from 'sweetalert2';
import { NewSemesterDialogComponent } from '@Attendance-web/new-semester-dialog/new-semester-dialog.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit, OnDestroy {
  proffessors: Observable<any[]>;
  admins: Observable<any[]>;
  semestersObs: Observable<any>;
  semesters: [];
  db: AngularFirestore;

  private unsubscribeProffesor = new Subject<void>();
  private unsubscribeadmins = new Subject<void>();
  private unsubscribesemesters = new Subject<void>();


  userSelected = false;

  selected: any;

  displayedColumns: string[] = ['courseCode', 'name', 'semester', 'action'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnDestroy(): void {
    this.unsubscribeProffesor.next();
    this.unsubscribeProffesor.complete();
    this.unsubscribeadmins.next();
    this.unsubscribeadmins.complete();
    this.unsubscribesemesters.next();
    this.unsubscribesemesters.complete();
  }

  constructor(private dbp: AngularFirestore, public dialog: MatDialog) {
    this.db = dbp;
    this.proffessors = this.db.collection('professors').valueChanges();
    this.admins = this.db.collection('admins').valueChanges();
    this.semestersObs = this.db.collection('semesters').doc('semesters').valueChanges();

    this.proffessors.pipe(takeUntil(this.unsubscribeProffesor)).subscribe(x => {
      //? in case is necessay
    });

    this.semestersObs.pipe(takeUntil(this.unsubscribesemesters)).subscribe(x => {
      this.semesters = x["semesters"];
    });

    this.admins.pipe(takeUntil(this.unsubscribeadmins)).subscribe(admin => {
      //? in case is necessay
    });
  }

  onSelect(professor, admin: boolean) {
    this.userSelected = true;
    professor['admin'] = admin;
    this.selected = professor;
    if (admin) {
      //? en caso de que se necesite algo en especifico con el admin
    } else if (!admin) {
      professor['courses'] = [];
      let m = this.db
        .collection('professors')
        .doc(professor['email'])
        .collection('courses')
        .valueChanges();
      m.subscribe(x => {
        professor['courses'] = [];
        professor['courses'].push(...x);
        this.selected = professor;
        this.dataSource = new MatTableDataSource<any>(professor['courses']);
        this.dataSource.sort = this.sort;
      });
    }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  addProfessor = () => {
    console.log('addProfessor', 'por implementar');
  };

  addAdmin = () => {
    console.log('addAdmin', 'por implementar');
  };

  addCourse = selectedProffessor => {
    this.db
      .collection('semesters')
      .doc('semesters')
      .valueChanges()
      .subscribe(x => {
        this.dialog.open(NewCourseDialogComponent, {
          data: { professor: this.selected, semesters: x['semesters'] }
        });
      });
  };

  deleteCourse = selectedCurse => {
    Swal.fire({
      title: 'Are you sure?',
      type: "warning",
      text: 'you will delete all the information related to that course.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.db.collection(selectedCurse["semester"]).doc(selectedCurse["courseCode"]).delete();
        this.db.collection("professors").doc(this.selected["email"]).collection("courses").doc(selectedCurse["semester"] + "%" + selectedCurse["courseCode"]).delete();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }else{
        Swal.fire(
          'ok...',
          'nothing have happend.',
          'info'
        )
      }
    });
  };

  deleteUser = selectedUser => {
    console.log('deleteUser', 'por implementar');
    console.log('deleteUser', selectedUser);
  };

  addSemester = () => {
    this.dialog.open(NewSemesterDialogComponent, {
      data: {semesters: this.semesters}
    });
  }
}
