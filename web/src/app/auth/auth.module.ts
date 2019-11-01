import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SignInComponent } from './sign-in/sign-in.component';
import { AuthInterceptor } from './auth.interceptor';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [SignInComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    AngularFireAuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {}
