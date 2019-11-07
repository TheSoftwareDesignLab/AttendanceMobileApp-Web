import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Usuario {
  nombre: string;
  correo: string;
  admin: boolean;
}

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})



export class AdminViewComponent implements OnInit {
  


  proffessors: Observable<any[]>;
  admins: Observable<any[]>;
  db: AngularFirestore;
  usuarios: Usuario[];


  

  constructor(private dbp: AngularFirestore,) {
    this.db = dbp;
    this.proffessors = this.db.collection("professors").valueChanges();
    this.admins = this.db.collection("professors").valueChanges();

    this.proffessors.subscribe(x => {
      
    })

  }

  ngOnInit() {
  }

}
