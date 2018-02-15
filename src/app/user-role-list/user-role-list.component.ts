import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';
import {Role} from "../role";
import {RoleService} from "../role.service";
import {UserRole} from "../userRole";
import {environment} from '../../environments/environment';
import {Utilities} from "../utilities";

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.css']
})
export class UserRoleListComponent implements OnInit {

  @Input() user: User;
  allRoles: Role[];
  userRoles: Role[];

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    this.getAllRoles();
  }

  getAllRoles(): void {
    this.roleService.getAll()
      .subscribe(allroles => this.allRoles = allroles);
  }

  hasRole(roleId: number): boolean {
    return this.findUserRole(roleId) != null;
  }

  selectRole(event, roleId) {
    if(event.checked) {
      this.addUserRole(roleId);
    } else {
      this.removeUserRole(roleId);
    }
  }

  private removeUserRole(roleId: number): void {
    let userRoleToBeDeleted = this.findUserRole(roleId);
    if(userRoleToBeDeleted != null) {
      this.user.userRoles = this.user.userRoles.filter(obj => obj !== userRoleToBeDeleted);
    }
  }

  private findUserRole(roleId: number): UserRole {
    for(let userRole of this.user.userRoles) {
      if(Utilities.endsWith(userRole._links.role.href, '/' + roleId)) {
        return userRole;
      }
    }
    return null;
  }

  private addUserRole(roleId: number): void {
    this.user.userRoles.push(this.createUserRole(roleId));
  }

  private createUserRole(roleId: number): UserRole {
    var links = UserRole.createLinks(environment.userServiceUrl, this.user.id, environment.roleServiceUrl, roleId);
    return new UserRole(null, null, links);
  }

}
