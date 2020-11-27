import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private _activeRoute: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    return;
  }

  navigate(): void {
    this._router.navigate(['/login']);
  }
}
