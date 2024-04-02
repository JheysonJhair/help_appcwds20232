import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../../api/user.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ModalComponent } from '../../../modal/modal.component';
import { Router } from '@angular/router';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'user-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.css'],
})
export class UserGetAllComponent {
  @ViewChild(ModalComponent) modal?: ModalComponent;
  @ViewChild(EditComponent) editar?: EditComponent;
  listUser: any[] = [];
  message: string = '';
  messageType: string = '';
  userData: any;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: (response: any) => {
        this.listUser = response.listDtoUser;
        this.message = response.mo.listMessage;
        this.messageType = response.mo.type;
      },
      error: (error: any) => {
        Swal.fire({
          position: 'top-end',
          title: this.message,
          text: 'Opps,algo salio mal',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      },
    });
  }

  delete(idUser: string): void {
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(idUser).subscribe({
          next: (response: any) => {
            this.listUser = this.listUser.filter((x) => x.idUser != idUser);
            this.message = response.mo.listMessage;
            this.messageType = response.mo.type;
            this.showSuccessMessage(this.message);
          },
          error: (error: any) => {
            this.showErrorMessage(this.message);
          },
        });
      }
    });
  }

  showSuccessMessage(message: string) {
    this.toastr.success(message, 'Success');
  }

  showErrorMessage(message: string) {
    this.toastr.error(message, 'Error');
  }

  openModal(userId: string) {
    this.userService.getByPk(userId).subscribe((userData: any) => {
      this.userData = userData.dtoUser;
      console.log(this.userData);
      this.modal?.openModal(
        this.userData.dni,
        this.userData.username,
        this.userData.firstName,
        this.userData.gender,
        this.userData.surName
      );
    });
  }

  edit(userId: string) {
    this.userService.getByPk(userId).subscribe((userData: any) => {
      this.userData = userData.dtoUser;
      this.editar?.openModal(
        this.userData.idUser,
        this.userData.dni,
        this.userData.username,
        this.userData.password,
        this.userData.firstName,
        this.userData.surName,
        this.userData.gender,
        this.userData.birthDate ,
      );
    });
  }

}
