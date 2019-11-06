import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { FirebaseAuthService } from './auth/firebaseAuth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;
  constructor(private db: AngularFirestore, private router: Router,
    public dialog: MatDialog, private firebaseAuthService: FirebaseAuthService
    ) {
    this.options = [];
    db.collection('professors').doc("m.linaresv@uniandes.edu.co").collection('courses').valueChanges().subscribe(course => {
      course.forEach(element =>{
        this.options.push(element.courseCode);
      })
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  goTo(option) {
    this.router.navigateByUrl(`/studentsList/${option}`);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  signInDialog() {
    this.firebaseAuthService.signIn();
    // this.dialog.open(SignInComponent);
  }
  
}