import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  ngOnInit(): void {

  this.loginForm  = this.fb.group({
      username: [null,[Validators.required,
  /*       Validators.pattern("^[a-zA-Z0-9]{6,20}") */
      ]
        ],
      password: [null, [Validators.required,
  /*       Validators.pattern("^(?=.*[0-9])+(?=.*[a-z])(?=.*[A-Z])+(?=.*[@#$%^&+=])+(?=\\S+$).{8,20}$") */
      ]],
    });
  }

  invalidLogin?: boolean;
  flag: boolean = true;



  constructor(private router: Router
    ,private jwtHelper : JwtHelperService,
    private adminService:AdminService,
    private fb:FormBuilder) { }

  public login = (form:FormGroup) => {

    this.adminService.login(form.value.username,form.value.password)
    .subscribe(res => {
      const token  =  res.token;
      const userId  =  res.userId;
      localStorage.setItem("access_token",token);
      localStorage.setItem("userId",userId);
      this.invalidLogin = false;
      this.router.navigate(['/tyzwvy/admin']);
    });


  }

  isUserAuthenticated() {
    const token = localStorage.getItem("access_token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }

}
}
