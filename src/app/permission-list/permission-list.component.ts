import {Component, OnInit} from '@angular/core';
import {PermissionService} from '../permission.service';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent implements OnInit {
  permissions: Array<any>;

  constructor(private permissionService: PermissionService) { }

  ngOnInit() {
    this.permissionService.getAll().subscribe(data => {
      this.permissions = data;
    });
  }

}
