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
  surName: string = '';
  gender: string = '';
  birthDate: string = '';


  openModal(
    dni: string,
    username: string,
    firstName: string,
    surName: string,
    gender: string,
    birthDate: any
  ) {
    this.dni = dni;
    this.username = username;
    this.firstName = firstName;
    this.gender = gender;
    this.surName = surName;
    this.birthDate = birthDate;
    $(this.modal?.nativeElement).modal('show');
  }

  closeModal() {
    $(this.modal?.nativeElement).modal('hide');
  }
}
