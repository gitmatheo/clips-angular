import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EmailTaken } from '../validators/email-taken';
import { RegisterValidators } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private auth: AuthService, private emailTaken: EmailTaken) {}
  // name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  // email = new FormControl('', [Validators.required, Validators.email]);
  // age = new FormControl('', [
  //   Validators.required,
  //   Validators.min(18),
  //   Validators.max(120),
  // ]);
  // password = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  // ]);
  // confirm_password = new FormControl('', [Validators.required]);
  // phoneNumber = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(13),
  //   Validators.maxLength(13),
  // ]);

  name = new FormControl('Test', [
    Validators.required,
    Validators.minLength(3),
  ]);
  email = new FormControl(
    'test@test.com',
    [Validators.required, Validators.email],
    [this.emailTaken.validate]
  );
  age = new FormControl('22', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  password = new FormControl('Rety,./123', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirm_password = new FormControl('Rety,./123', [Validators.required]);
  phoneNumber = new FormControl('1234567890', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);
  inSubmission = false;
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  alertColor = 'blue';

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirm_password: this.confirm_password,
      phoneNumber: this.phoneNumber,
    },
    [RegisterValidators.match('password', 'confirm_password')]
  );

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      this.auth.createUser(this.registerForm.value);
    } catch (e) {
      console.log(e);
      this.alertMsg = 'An unexpected error occurred. Please try again later!';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMsg = 'Success! Your account has been created.';
    this.alertColor = 'green';
  }
}
