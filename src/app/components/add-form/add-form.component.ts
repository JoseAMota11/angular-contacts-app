import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="container-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label for="firstName">
          First Name
          <input
            formControlName="firstName"
            type="text"
            id="firstName"
            placeholder="Ex: John"
            class="{{
              firstName?.invalid && (firstName?.dirty || firstName?.touched)
                ? 'invalid'
                : ''
            }}"
          />
        </label>
        <label for="lastName">
          Last Name
          <input
            formControlName="lastName"
            type="text"
            id="lastName"
            placeholder="Ex: Doe"
            class="{{
              lastName?.invalid && (lastName?.dirty || lastName?.touched)
                ? 'invalid'
                : ''
            }}"
          />
        </label>
        <label for="phoneNumbers">
          Phone Numbers
          <textarea
            formControlName="phoneNumbers"
            id="phoneNumbers"
            placeholder="Ex: 000-000-0000, 000-000-0000"
            class="{{
              phoneNumbers?.invalid &&
              (phoneNumbers?.dirty || phoneNumbers?.touched)
                ? 'invalid'
                : ''
            }}"
          ></textarea>
        </label>
        <div>
          <button type="submit">Add</button>
          <button type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </section>
  `,
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent {
  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.minLength(2),
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.minLength(2),
      Validators.required,
    ]),
    phoneNumbers: new FormControl('', [
      Validators.minLength(12),
      Validators.required,
    ]),
  });
  contactsService: ContactsService = inject(ContactsService);

  constructor(private router: Router) {}

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get phoneNumbers() {
    return this.form.get('phoneNumbers');
  }

  onSubmit() {
    if (this.form.valid) {
      this.contactsService.setContact(this.form.value).then((response) => {
        if (response.ok) {
          this.router.navigate(['/']);
        } else {
          console.error('Server responded with an error');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
