import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class UserService {
	constructor(
		private httpClient: HttpClient
	) {}

	public insert(formData: FormData): Observable<any> {
		return this.httpClient.post<any>(`https://localhost:7140/user/insert`, formData);
	}

	public getAll(): Observable<any> {
		return this.httpClient.get<any>(`https://localhost:7140/user/getall`);
	}

	public delete(idUser: string): Observable<any> {
		return this.httpClient.delete<any>(`https://localhost:7140/user/delete?idUser=${idUser}`);
	}

  public getByPk(idUser: string): Observable<any> {
		return this.httpClient.get<any>(`https://localhost:7140/User/GetByPk?idUser=${idUser}`);
	}

  public update(formData: FormData): Observable<any> {
		return this.httpClient.post<any>(`https://localhost:7140/user/update`, formData);
	}
}
