import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../login.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Validator } from '../../../../shared/classes/validator.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]))
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.loginService.createAccount(this.registerForm.value)
        .subscribe(
          (token: string) => this.toastr.success(token),
          (response: HttpErrorResponse) => this.toastr.error(response.error.message));
    } else {
      Validator.validate(this.registerForm);
    }
  }
}
