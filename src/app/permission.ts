export class Permission {

  id: number;
  value: string;
  description: string;
  href: string;

  constructor(id: number, value: string, description: string){
    this.id = id;
    this.value = value;
    this.description = description;
  }

}
