import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {Title} from "@angular/platform-browser";
import {firstValueFrom} from "rxjs";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean;
  error: boolean;

  constructor(private formBuilder: FormBuilder,
              private _authService: AuthService,
              private router: Router,
              private _titleService: Title) {
    this._titleService.setTitle("Inscription - " + environment.name);
    this.error = false;
    this.submitted = false;
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get email() {
    return this.registerForm.get('email');
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmitForm() {
    this.submitted = true;
    const formValue = this.registerForm.value;
    firstValueFrom(this._authService.register(formValue.email, formValue.username, formValue.password))
      .catch(error => {
        this.submitted = false;
        if (error.status === 401) {
          this.error = true;
        }
      })
      .finally(() => {
        this.router.navigate(['/auth/login']).then();
      });
  }

  samePasswordValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    return password.value === confirmPassword.value ? null : {notSame: true};
  }

  private initForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.pattern("^(?=.+[0-9])(?=.+[a-z])(?=.+[A-Z])(?=.+[*.!@$%^&(){}[_\\]:;<>,.?/~_+\\-=|]).{8,32}$")]],
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    }, {validators: this.samePasswordValidator});
  }
}

