import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserDetailsComponent,
    UserFriendsComponent,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
