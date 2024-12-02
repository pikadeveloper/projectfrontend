import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  redirectWithDelay(route: string, delay: number = 3000): void {
    setTimeout(() => {
      this.router.navigate([route]);
    }, delay);
  }
}
