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

  getAll(): Observable<User[]> {
      return this.http.get(this.apiUrl)
              .map((data: any) => {
                //return data._embedded.users as User[];
                return data as User[];
              });

  }

  get(id: string): Observable<User> {
    return this.http.get(this.apiUrl + '/' + id)
            .map((data: any) => {
              return data as User;
            });
  }

  save(user: User): Observable<any> {
    let result: Observable<Object>;
    if (user['href']) {
    //if (user.id != null) {
      //result = this.http.put(user._links.self.href, user);
      result = this.http.patch(user['href'], user);
    } else {
      result = this.http.post(this.apiUrl, user);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }

}
