import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Role} from "./role";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RoleService {

  private apiUrl = '//localhost:9095/roles';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl)
      .map((data: any) => {
        return data._embedded.roles as Role[];
      });

  }

  get(id: string) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  save(role: any): Observable<any> {
    let result: Observable<Object>;
    if (role['href']) {
      result = this.http.put(role.href, role);
    } else {
      result = this.http.post(this.apiUrl, role);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }

}
