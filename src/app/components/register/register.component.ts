import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../objects/user';
import { Message } from '../../objects/message';

import { UserService } from '../../services/user/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
    }, { validator: this.matchPasswords('password', 'confirm') });
  }

  matchPasswords(password: string, confirm: string) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { 'matchPasswords': true };
      }
    };
  }

  onRegisterSubmit() {

    const user = {
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      username: this.registerForm.get('username').value,
      country: this.registerForm.get('country').value,
      phone: this.registerForm.get('phone').value,
      address: this.registerForm.get('address').value,
      password: this.registerForm.get('password').value
    };

    this.userService.register(user)
      .then((msg: Message) => {
        if (msg.error) {
          this.flashMessagesService.show(msg.message, { cssClass: 'alert-danger' });
        } else {
          this.router.navigate(['/login']);
          this.flashMessagesService.show(msg.message, { cssClass: 'alert-success' });
        }
      })
      .catch(errResp => console.log(errResp));
  }

}
