import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { RandomQuizComponent } from './random-quiz/random-quiz.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'studentsList/:courseID', component: StudentsListComponent },
  { path: 'randomQuiz/:courseID', component: RandomQuizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
