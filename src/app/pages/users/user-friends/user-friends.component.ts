import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, delay, EMPTY, Observable } from 'rxjs';
import { User, UserFriends } from 'src/app/core/util/interfaces';
import { ApiService } from '../infrastructure/api.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFriendsComponent {

  userId: number = this.route.snapshot.params["id"];
  userFriends: UserFriends[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5; // Number of items to load per batch.
 

  constructor (
    private readonly route: ActivatedRoute, 
    private readonly apiService: ApiService,
    private readonly cdRef: ChangeDetectorRef
    ) {
      this.initUserFriendsData();
    }
  
  readonly user$: Observable<User> = this.apiService.getUserDetails(this.userId)
  
  initUserFriendsData(): void {
    this.isLoading = true;
    this.apiService
    .getUserFriends(this.currentPage, this.itemsPerPage, this.userId)
    .pipe(
      delay(1500),
      catchError(() => {
        alert('Error');

        return EMPTY;
      })
    )
      .subscribe((newData) => {
        this.userFriends.push(...newData);
        this.isLoading = false;
        this.currentPage++;
        this.cdRef.markForCheck()

      });
    }
    
    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const contentHeight = document.documentElement.scrollHeight;
  
      if (!this.isLoading && windowHeight + scrollY >= contentHeight) {
        this.initUserFriendsData();
      }
    }

  

  trackByFn(index: number, item: UserFriends): number {
    return item.id;
  }

}
