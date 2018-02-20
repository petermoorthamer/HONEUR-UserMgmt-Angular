import {Component, Input, OnInit} from '@angular/core';
import {Role} from "../role";
import {PermissionService} from "../permission.service";
import {Permission} from "../permission";
import {RolePermission} from "../rolePermission";

@Component({
  selector: 'app-role-permission-list',
  templateUrl: './role-permission-list.component.html',
  styleUrls: ['./role-permission-list.component.css']
})
export class RolePermissionListComponent implements OnInit {

  @Input() role: Role;
  allPermissions: Permission[];

  constructor(private permissionService: PermissionService) { }

  ngOnInit() {
    this.getAllPermissions()
  }

  getAllPermissions(): void {
    this.permissionService.getAll()
      .subscribe(allPermissions => this.allPermissions = allPermissions);
  }

  hasPermission(permissionId: number): boolean {
    return this.findRolePermission(permissionId) != null;
  }

  selectPermission(event, permissionId) {
    console.log('selectPermission: ' + permissionId);
    if(event.checked) {
      this.addRolePermission(permissionId);
    } else {
      this.removeRolePermission(permissionId);
    }
  }

  private removeRolePermission(permissionId: number): void {
    let rolePermissionToBeDeleted = this.findRolePermission(permissionId);
    if(rolePermissionToBeDeleted != null) {
      this.role.rolePermissions = this.role.rolePermissions.filter(obj => obj !== rolePermissionToBeDeleted);
    }
  }

  private findRolePermission(permissionId: number): RolePermission {
    for(let rolePermission of this.role.rolePermissions) {
      //if(Utilities.endsWith(rolePermission._links.permission.href, '/' + permissionId)) {
      if(rolePermission.permission.id == permissionId) {
        return rolePermission;
      }
    }
    return null;
  }

  private addRolePermission(permissionId: number): void {
    this.role.rolePermissions.push(this.createRolePermission(permissionId));
  }

  private createRolePermission(permissionId: number): RolePermission {
    //var links = RolePermission.createLinks(environment.roleServiceUrl, this.role.id, environment.roleServiceUrl, permissionId);
    let rolePermission = new RolePermission(null, null, null);
    rolePermission.role = this.role.id;
    rolePermission.permission = new Permission(permissionId, null, null);
    return rolePermission;
  }

}
