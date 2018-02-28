import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {NgForm} from '@angular/forms';
import {environment} from "../../environments/environment";
import {User} from "../user";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  user: User;
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.user = new User(null, null, null, []);
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.userService.get(id).subscribe((user: User) => {
          if (user) {
            console.log('UserEditComponent user: ' + JSON.stringify(user));
            this.user = user;
            //this.user.href = user._links.self.href;
            this.user.href = environment.userServiceUrl + '/' + id;
          } else {
            console.log(`User with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/user-list']);
  }

  save(form: NgForm) {
    console.log('save user: user roles: ' + JSON.stringify(this.user.userRoles) + ', # = ' + this.user.userRoles.length);
    this.userService.save(this.user).subscribe(result => {
      this.gotoList();
    }, error => console.error(error))
  }

  remove(href) {
    this.userService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error))
  }
}
