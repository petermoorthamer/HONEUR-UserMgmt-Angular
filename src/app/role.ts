import {RolePermission} from "./rolePermission";
import {UserRole} from "./userRole";

export class Role {

  id: number;
  name: string;
  href: string;
  rolePermissions: RolePermission[];
  userRoles: UserRole[];

  constructor(id: number, name: string, rolePermissions: RolePermission[], userRoles: UserRole[]){
    this.id = id;
    this.name = name;
    this.rolePermissions = rolePermissions;
    this.userRoles = userRoles;
  }

}
