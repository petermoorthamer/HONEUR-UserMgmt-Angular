import {Permission} from "./permission";

export class RolePermission {

  id: number;
  status: string;
  role: number;
  permission: Permission;
  _links : any;

  constructor(id: number, status: string, _links: any){
    this.id = id;
    this.status = status;
    this._links = _links;
  }

  static createLinks(roleRef: string, roleId: number, permissionRef: string, permissionId: number) {
    return {
      "permission": {
        "href": (permissionRef + "/" + permissionId)
      },
      "role": {
        "href": (roleRef + "/" + roleId)
      }
    };
  }

}
