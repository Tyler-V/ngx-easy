import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../login.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Validator } from '../../../../shared/classes/validator.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .subscribe(
          (token: string) => this.toastr.success(token),
          (response: HttpErrorResponse) => this.toastr.error(response.error.message));
    } else {
      Validator.validate(this.loginForm);
    }
  }

}
