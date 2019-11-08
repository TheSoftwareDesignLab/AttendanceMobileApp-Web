import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';



@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit, OnDestroy {

  


  proffessors: Observable<any[]>;
  admins: Observable<any[]>;
  db: AngularFirestore;

  private unsubscribeProffesor = new Subject<void>();
  private unsubscribeadmins = new Subject<void>();

  userSelected = false;

  selected: any;

  displayedColumns: string[] = ['courseCode', 'name', 'semester',"action"];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort, {static: true}) sort: MatSort;  

  ngOnDestroy(): void {
    this.unsubscribeProffesor.next();
    this.unsubscribeProffesor.complete();
    this.unsubscribeadmins.next();
    this.unsubscribeadmins.complete();
  }

  constructor(private dbp: AngularFirestore,) {
    this.db = dbp;
    this.proffessors = this.db.collection("professors").valueChanges();
    this.admins = this.db.collection("admins").valueChanges();

    this.proffessors.pipe(takeUntil(this.unsubscribeProffesor)).subscribe(x => {
    //? in case is necessay
    });

    this.admins.pipe(takeUntil(this.unsubscribeadmins)).subscribe(admin => {
      //? in case is necessay
    });

  }

  onSelect(professor, admin: boolean){
    this.userSelected = true;
    professor["admin"] = admin;
    this.selected = professor;
    if(admin){
      //? en caso de que se necesite algo en especifico con el admin
    }else if(!admin){
      professor["courses"] = [];
      let m = this.db.collection("professors").doc(professor["email"]).collection("courses").valueChanges();
      m.subscribe(x =>{
        professor["courses"].push(...x);
        this.selected = professor;
        this.dataSource = new MatTableDataSource<any>(professor["courses"]);
        this.dataSource.sort = this.sort;

      });

    }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  addProfessor = () =>{

    console.log("addProfessor", "por implementar");

  }

  addAdmin = () =>{
    console.log("addAdmin", "por implementar");
  }

  addCourse = (selectedProffessor) =>{
    console.log("addCourse", "por implementar");
    console.log("addCourse", selectedProffessor);
  }

  deleteCourse = (selectedCurse) =>{
    console.log("deleteCourse", "por implementar");
    console.log("deleteCourse", selectedCurse);
  }

  deleteUser = (selectedUser) =>{
    console.log("deleteUser", "por implementar");
    console.log("deleteUser", selectedUser);
  }
}
