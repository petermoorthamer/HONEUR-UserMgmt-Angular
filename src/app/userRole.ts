export class UserRole {

  id: number;
  status: string;
  _links : any;

  constructor(id: number, status: string, _links: any){
    this.id = id;
    this.status = status;
    this._links = _links;
  }

  static createLinks(userRef: string, userId: number, roleRef: string, roleId: number) {
    return {
      "user": {
        "href": (userRef + "/" + userId)
      },
      "role": {
        "href": (roleRef + "/" + roleId)
      }
    };
  }

}
