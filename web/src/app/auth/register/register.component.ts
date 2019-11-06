import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../firebaseAuth.service';
import { LoadingService } from '@Attendance-web/loading/loading.service';
import { ErrorMessagesService } from '@Attendance-web/errors/error-messages.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LoadingComponent } from '@Attendance-web/loading/loading.component';
import { SignInComponent } from '../sign-in/sign-in.component';

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
    private readonly loadingService: LoadingService,
    public dialog: MatDialog,
    private dialogRef:MatDialogRef<RegisterComponent>
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      institution: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      department: ['', ]
    });
  }

  goToLogin() {
    this.dialogRef.close();
    this.dialog.open(SignInComponent);
  }

  register() {
    if (this.registerForm.valid) {
      // this.loadingService.startLoading();
      // this.firebaseAuthService.register(this.registerForm.value);
    }
  }
}
