import {UserRole} from "./userRole";

export class User {

  id: number;
  name: string;
  login: string;
  href: string;
  userRoles: UserRole[] = [];

  constructor(id: number, name: string, login: string, userRoles: UserRole[]) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.userRoles = userRoles;
  }

  public addUserRole(userRole: UserRole): void {
    this.userRoles.push(userRole);
  }

}

