import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PermissionService} from "../permission.service";
import {Subscription} from "rxjs/Subscription";
import {Permission} from "../permission";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
  styleUrls: ['./permission-edit.component.css']
})
export class PermissionEditComponent implements OnInit {

  permission: Permission;
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.permission = new Permission(null, null,  null);
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.permissionService.get(id).subscribe((permission: any) => {
          if (permission) {
            this.permission = permission;
            //this.permission.href = permission._links.self.href;
            this.permission.href = environment.permissionServiceUrl + '/' + id;
          } else {
            console.log(`Permission with id '${id}' not found, returning to list`);
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
    this.router.navigate(['/permission-list']);
  }

  save(form: NgForm) {
    this.permissionService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error))
  }

  remove(href) {
    this.permissionService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error))
  }

}
