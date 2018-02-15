import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {Permission} from "./permission";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PermissionService {

  private apiUrl = environment.permissionServiceUrl;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    // TODO make page size more dynamic
    return this.http.get(this.apiUrl + '?size=50')
      .map((data: any) => {
        return data._embedded.permissions as Permission[];
      });

  }

  get(id: string) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  save(permission: any): Observable<any> {
    let result: Observable<Object>;
    if (permission['href']) {
      result = this.http.put(permission.href, permission);
    } else {
      result = this.http.post(this.apiUrl, permission);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }

}
