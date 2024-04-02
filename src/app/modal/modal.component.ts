import { Component, ElementRef, ViewChild } from '@angular/core';
// @ts-ignore
const $: any = window['$'];
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @ViewChild('modal') modal?: ElementRef;
  dni: string = '';
  username: string = '';
  firstName: string = '';
  birthDate: string = '';
  gender: string = '';
  surName: string = '';

  openModal(
    dni: string,
    username: string,
    firstName: string,
    gender: string,
    surName: string
  ) {
    this.dni = dni;
    this.username = username;
    this.firstName = firstName;
    this.gender = gender;
    this.surName = surName;
    $(this.modal?.nativeElement).modal('show');
  }

  closeModal() {
    $(this.modal?.nativeElement).modal('hide');
  }
}
