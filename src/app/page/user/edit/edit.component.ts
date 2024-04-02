import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../../api/user.service';
import Swal from 'sweetalert2';
// @ts-ignore
const $: any = window['$'];

@Component({
  selector: 'user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  @ViewChild('editar') editar?: ElementRef;

  idUser: string = '';
  dni: string = '';
  username: string = '';
  password: string = '';
  firstName: string = '';
  surName: string = '';
  gender: string = '';
  birthDate: any;
  formattedBirthDate: string = '';

  constructor(
    private userService: UserService,
  ) {}

  openModal(
    idUser: string,
    dni: string,
    username: string,
    password: string,
    firstName: string,
    surName: string,
    gender: string,
    birthDate: any
  ) {
    this.idUser = idUser;
    this.dni = dni;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.surName = surName;
    this.gender = gender;
    this.birthDate = birthDate;

    this.formattedBirthDate = new Date(birthDate)
      .toISOString()
      .substring(0, 10);

    $(this.editar?.nativeElement).modal('show');
  }

  closeModal() {
    $(this.editar?.nativeElement).modal('hide');
  }

  submitForm() {

    const formData = new FormData();
    formData.append('dtoUser.idUser', this.idUser);
    formData.append('dtoUser.dni', this.dni);
    formData.append('dtoUser.username', this.username);
    formData.append('dtoUser.password', this.password);
    formData.append('dtoUser.firstName', this.firstName);
    formData.append('dtoUser.surName', this.surName);
    formData.append('dtoUser.gender', this.gender);
    formData.append('dtoUser.birthDate', this.formattedBirthDate);

    this.userService.update(formData).subscribe(
      (response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Se actualizo correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        this.closeModal();
        setTimeout(() => {
          location.reload();
        }, 1500);
      },
      (error) => {
        console.error('Error al actualizar los datos:', error);
      }
    );
  }
}
