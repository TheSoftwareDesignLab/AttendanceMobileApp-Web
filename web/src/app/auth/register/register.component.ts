import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../firebaseAuth.service';
import { ErrorMessagesService } from '@TGF-frontend/errors/error-messages.service';
import { LoadingService } from '@TGF-frontend/core/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly firebaseAuthService: FirebaseAuthService,
    public readonly errorMessagesService: ErrorMessagesService,
    private readonly loadingSevice: LoadingService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      institution: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      department: ['', ]
    });
  } 

  register() {
    if (this.registerForm.valid) {
      this.loadingSevice.startLoading();
      this.firebaseAuthService.register(this.registerForm.value);
    }
  }
}
