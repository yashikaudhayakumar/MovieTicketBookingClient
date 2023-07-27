import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/Models/api-response';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private service: AuthService, private router: Router) { }

  loginForm!: FormGroup;
  submitted: boolean = false;
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.service.login(this.loginForm.value).subscribe({
        next: (response: ApiResponse) => {
          console.log(response);
          if (response.isSuccess) {
            localStorage.setItem("accessToken", response.message);
            this.loginForm.reset();
            this.submitted = false;
            this.service.loggedIn = true;
            this.service.token = response.message;
            this.router.navigate(['']);
          }
          else {
            alert(response.message)
          }
        },
        error: (err: HttpErrorResponse) => {
          this.submitted = false;
          console.log(err);
          alert(err.error.message)
        },
      });
    } else {
      this.submitted = false;
    }
  }
}
