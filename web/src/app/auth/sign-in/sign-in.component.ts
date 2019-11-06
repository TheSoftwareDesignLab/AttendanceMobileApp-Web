import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../firebaseAuth.service';
import { ErrorMessagesService } from '@Attendance-web/errors/error-messages.service';
import { LoadingService } from '@Attendance-web/loading/loading.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RegisterComponent } from '../register/register.component';


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
    private readonly loadingSevice: LoadingService,
    public dialog: MatDialog,
    private dialogRef:MatDialogRef<SignInComponent>
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });


  }

  goToRegister() {
    this.dialogRef.close();
    this.dialog.open(RegisterComponent);
  }

  signIn() {
    if (this.signInForm.valid) {
      // this.loadingSevice.startLoading();
      // this.firebaseAuthService.signIn(this.signInForm.value);
    }
  }
}
