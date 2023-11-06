import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="container-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label for="firstName">
          First Name
          <input formControlName="firstName" type="text" id="firstName" />
        </label>
        <label for="lastName">
          Last Name
          <input formControlName="lastName" type="text" id="lastName" />
        </label>
        <label for="email">
          Email
          <input formControlName="email" type="text" id="email" />
        </label>
        <button type="submit">Add</button>
      </form>
    </section>
  `,
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.minLength(2),
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.minLength(2),
      Validators.required,
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  onSubmit() {
    console.log(this.form.value);
  }
}
