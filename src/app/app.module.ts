import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
/*import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';*/
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {UserService} from './user.service';
import {UserListComponent} from './user-list/user-list.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {RoleService} from './role.service';
import {RoleListComponent} from './role-list/role-list.component';
import {RoleEditComponent} from './role-edit/role-edit.component';
import {PermissionListComponent} from './permission-list/permission-list.component';
import {PermissionEditComponent} from './permission-edit/permission-edit.component';
import {PermissionService} from "./permission.service";
import {UserRoleListComponent} from './user-role-list/user-role-list.component';
import {RolePermissionListComponent} from './role-permission-list/role-permission-list.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/user-list', pathMatch: 'full' },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'user-add',
    component: UserEditComponent
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent
  },
  {
    path: 'role-list',
    component: RoleListComponent
  },
  {
    path: 'role-add',
    component: RoleEditComponent
  },
  {
    path: 'role-edit/:id',
    component: RoleEditComponent
  },
  {
    path: 'permission-list',
    component: PermissionListComponent
  },
  {
    path: 'permission-add',
    component: PermissionEditComponent
  },
  {
    path: 'permission-edit/:id',
    component: PermissionEditComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserEditComponent,
    RoleListComponent,
    RoleEditComponent,
    PermissionListComponent,
    PermissionEditComponent,
    UserRoleListComponent,
    RolePermissionListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    /*MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule*/
  ],
  providers: [UserService, RoleService,PermissionService],
  bootstrap: [AppComponent]
})
export class AppModule { }





