import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleService} from '../role.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit, OnDestroy {

  role: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private roleService: RoleService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.roleService.get(id).subscribe((role: any) => {
          if (role) {
            this.role = role;
            this.role.href = role._links.self.href;
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
    this.router.navigate(['/role-list']);
  }

  save(form: NgForm) {
    this.roleService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error))
  }

  remove(href) {
    this.roleService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error))
  }

}
