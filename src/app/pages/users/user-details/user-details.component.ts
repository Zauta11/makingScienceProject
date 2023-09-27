import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/core/util/interfaces';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent {
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
    ) { }


  readonly user$: Observable<User> = this.route.data.pipe(
    map(({ user }) => user)
  )  

  goToUserFriends(userId: number): void {
    this.router.navigate(['users', userId,'comments'])
  }
 
}
