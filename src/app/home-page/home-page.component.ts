import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    (localStorage.getItem('loggedin')) ? this.router.navigateByUrl('/notes') : this.router.navigateByUrl('/signin');
  }

}
