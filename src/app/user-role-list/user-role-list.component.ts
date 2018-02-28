import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';
import {Role} from "../role";
import {RoleService} from "../role.service";
import {UserRole} from "../userRole";

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.css']
})
export class UserRoleListComponent implements OnInit {

  @Input() user: User;
  allRoles: Role[];

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
    console.log('selectRole: ' + roleId + ': ' + event.target.checked);
    if(event.target.checked) {
      this.addUserRole(roleId);
    } else {
      this.removeUserRole(roleId);
    }
  }

  private removeUserRole(roleId: number): void {
    let userRoleToBeDeleted = this.findUserRole(roleId);
    if(userRoleToBeDeleted != null) {
      this.user.userRoles = this.user.userRoles.filter(obj => obj !== userRoleToBeDeleted);
      console.log(JSON.stringify(this.user.userRoles));
      console.log('Size: ' + this.user.userRoles.length);
    }
  }

  private findUserRole(roleId: number): UserRole {
    if(this.user.userRoles == null) {
      return null;
    }
    for(let userRole of this.user.userRoles) {
      //if(Utilities.endsWith(userRole._links.role.href, '/' + roleId)) {
      if(userRole.role.id == roleId) {
        return userRole;
      }
    }
    return null;
  }

  private addUserRole(roleId: number): void {
    //this.user.addUserRole(this.createUserRole(roleId));
    this.user.userRoles.push(this.createUserRole(roleId));
    console.log(JSON.stringify(this.user.userRoles));
    console.log('Size: ' + this.user.userRoles.length);
  }

  private createUserRole(roleId: number): UserRole {
    //var links = UserRole.createLinks(environment.userServiceUrl, this.user.id, environment.roleServiceUrl, roleId);
    let userRole = new UserRole(null, null, null);
    userRole.user = this.user.id;
    userRole.role = new Role(roleId, null, null, null);
    return userRole;
  }

}
