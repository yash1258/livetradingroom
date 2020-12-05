import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this._auth.isAuthenticated();
    return;
  }

  navigate(): void {
    this._router.navigate(['/login']);
    
  }

  logout(): void {
    this._auth.logout();
    location.reload();
  }
}
