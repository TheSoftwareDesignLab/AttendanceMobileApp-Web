import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ErrorMessagesService } from '@TGF-frontend/errors/error-messages.service';

import { AuthService } from '../auth.service';
import { FirebaseAuthService } from '../firebaseAuth.service';
import { LoadingService } from '@TGF-frontend/core/loading.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly firebaseAuthService: FirebaseAuthService,
    public readonly errorMessagesService: ErrorMessagesService,
    private readonly loadingSevice: LoadingService
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  } 

  signIn() {
    if (this.signInForm.valid) {
      this.loadingSevice.startLoading();
      this.firebaseAuthService.signIn(this.signInForm.value);
    }
  }
}
