import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatCardModule, MatToolbarModule, MatFormFieldModule,
         MatAutocompleteModule, MatSelectModule, MatIconModule, MatTableModule, MatDialogModule} from '@angular/material/';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { NewStudentDialogComponent } from './new-student-dialog/new-student-dialog.component';
import { RandomQuizComponent } from './random-quiz/random-quiz.component'

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    StudentsListComponent,
    NewStudentDialogComponent,
    RandomQuizComponent
  ],
  entryComponents:[
    NewStudentDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'my-app-name'),
    AngularFirestoreModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
