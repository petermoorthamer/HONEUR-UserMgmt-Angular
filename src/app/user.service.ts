import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {User} from "./user";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private apiUrl = environment.userServiceUrl;

  constructor(private http: HttpClient) {
  }

  getApiUrl(): string {
    return this.apiUrl;
  }

  getAll(): Observable<any> {
      return this.http.get(this.apiUrl)
              .map((data: any) => {
                return data._embedded.users as User[];
              });

  }

  get(id: string) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  save(user: any): Observable<any> {
    let result: Observable<Object>;
    if (user['href']) {
      result = this.http.put(user.href, user);
    } else {
      result = this.http.post(this.apiUrl, user);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }

}
