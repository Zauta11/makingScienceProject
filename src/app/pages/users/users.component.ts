import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, EMPTY } from 'rxjs';
import { User } from 'src/app/core/util/interfaces';
import { ApiService } from './infrastructure/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {

  users: User[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10; // Number of items to load per batch.

  constructor(
    private readonly apiService: ApiService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly router: Router
    ) {
      this.initData();
    }

  initData(): void {
    this.isLoading = true;
    this.apiService
    .getUsers(this.currentPage, this.itemsPerPage)
    .pipe(
      delay(1500),
      catchError(() => {
        alert('Error');

        return EMPTY;
      })
    )
      .subscribe((newData) => {
        this.users.push(...newData);
        this.isLoading = false;
        this.currentPage++;
        this.cdRef.markForCheck();      
      });
    }
    
    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const contentHeight = document.documentElement.scrollHeight;
  
      if (!this.isLoading && windowHeight + scrollY >= contentHeight) {
        this.initData();
      }
    }


  goToDetails(userId: number): void {
    this.router.navigate(['users', userId]);
  }

  
  trackByFn(index: number, item: User): number {
    return item.id;
  }





}
