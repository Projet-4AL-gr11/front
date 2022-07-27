import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean;
  error: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private cookieService: CookieService,
              private titleService: Title) {
    this.titleService.setTitle("Connexion - " + environment.name);
    this.error = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmitForm() {

    this.submitted = true;
    const formValue = this.loginForm.value;
    this.authService.login(formValue.username, formValue.password).subscribe({
        next: (response) => {
          {
              this.cookieService.set('user', response.id, {path: "/"}),
              this.cookieService.set('username', response.username, {path: "/"}),
              localStorage.setItem('Refresh', response.currentHashedRefreshToken),
              this.authService.updateUser()
          }
        },
        error: (error) => {
          this.submitted = false;
          if (error.status === 400 || error.status === 0) {
            this.error = true;
          }
        },
        complete: () => {
          if (!this.error) {
            this.router.navigate(['/timeline']).then();
          }
        }
      }
    )
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.min(8)]]
    });
  }
}

