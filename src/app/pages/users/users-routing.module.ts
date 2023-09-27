import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from './resolvers/user.resolver';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { UsersComponent } from './users.component';

const routes: Routes = [

  {
    path: '',
    component: UsersComponent
  },

  {
    path: ':id',
    resolve: { user: UserResolver },
    component: UserDetailsComponent
  },

  {
    path: ':id/comments',
    component: UserFriendsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
