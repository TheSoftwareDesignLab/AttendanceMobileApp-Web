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
         MatAutocompleteModule, MatSelectModule, MatIconModule, MatTableModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule   } from '@angular/material/';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { NewStudentDialogComponent } from './new-student-dialog/new-student-dialog.component';
import { RandomQuizComponent } from './random-quiz/random-quiz.component'
import { LoadingComponent } from './loading/loading.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegisterComponent } from './auth/register/register.component';
import { AdminViewComponent } from './admin-view/admin-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    StudentsListComponent,
    NewStudentDialogComponent,
    RandomQuizComponent,
    LoadingComponent,
    SignInComponent,
    RegisterComponent,
    AdminViewComponent
  ],
  entryComponents:[
    NewStudentDialogComponent,
    SignInComponent,
    RegisterComponent
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
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
