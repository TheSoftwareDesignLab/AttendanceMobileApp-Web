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
         MatAutocompleteModule, MatSelectModule, MatIconModule, MatTableModule, MatDialogModule,
         MatDatepickerModule, MatNativeDateModule, MatGridListModule,MatExpansionModule, MatListModule, MatPaginatorModule} from '@angular/material/';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { NewStudentDialogComponent } from './new-student-dialog/new-student-dialog.component';
import { RandomQuizComponent } from './random-quiz/random-quiz.component'
import { LoadingComponent } from './loading/loading.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { TeacherCoursesViewComponentComponent } from './teacher-courses-view-component/teacher-courses-view-component.component';
import { NewCourseDialogComponent } from './new-course-dialog/new-course-dialog.component';
import { NewSemesterDialogComponent } from './new-semester-dialog/new-semester-dialog.component';
import { NewProfessorDialogComponent } from './new-professor-dialog/new-professor-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    StudentsListComponent,
    NewStudentDialogComponent,
    RandomQuizComponent,
    LoadingComponent,
    AdminViewComponent,
    TeacherCoursesViewComponentComponent,
    NewCourseDialogComponent,
    NewSemesterDialogComponent,
    NewProfessorDialogComponent
  ],
  entryComponents:[
    NewStudentDialogComponent,
    NewCourseDialogComponent,
    NewSemesterDialogComponent,
    NewProfessorDialogComponent
  ],
  imports: [
    MatDatepickerModule,        
    MatNativeDateModule,    
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
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
    MatGridListModule,
    MatExpansionModule,
    MatListModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
