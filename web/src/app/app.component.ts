import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;
  constructor(private db: AngularFirestore) {
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


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
}