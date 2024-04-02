import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../api/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css'],
})
export class UserInsertComponent {
  frmInsertUser: FormGroup;
  message: string = '';
  messageType: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.frmInsertUser = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      firstName: [null, Validators.required],
      surName: [null, Validators.required],
      dni: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^\d+$/),
        ],
        Validators.maxLength(8),
      ],
      birthDate: [null, Validators.required],
      gender: [null, Validators.required],
    });
  }

  public sendFrmInsertUser(): void {
    if (this.frmInsertUser.invalid) {
      this.markFormGroupTouched(this.frmInsertUser);
      return;
    }

    const formData = new FormData();

    formData.append('dtoUser.username', this.frmInsertUser.value.username);
    formData.append('dtoUser.password', this.frmInsertUser.value.password);
    formData.append('dtoUser.firstName', this.frmInsertUser.value.firstName);
    formData.append('dtoUser.surName', this.frmInsertUser.value.surName);
    formData.append('dtoUser.dni', this.frmInsertUser.value.dni);
    formData.append(
      'dtoUser.birthDate',
      `${this.frmInsertUser.value.birthDate.year}-${this.leftPad(
        this.frmInsertUser.value.birthDate.month,
        2,
        '0'
      )}-${this.leftPad(this.frmInsertUser.value.birthDate.day, 2, '0')}`
    );
    formData.append('dtoUser.gender', this.frmInsertUser.value.gender);

    this.userService.insert(formData).subscribe({
      next: (response: any) => {
        this.message = response.mo.listMesasage;
        this.messageType = response.mo.type;
        Swal.fire({
          position: 'top-end',
          title: "Se registro el usuario correctamente",
          text: 'Todo correcto',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        setTimeout(() => {
          location.reload();
        }, 1500);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  private leftPad(str: string, length: number, padChar: string): string {
    return (Array(length).fill(padChar).join('') + str).slice(-length);
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
