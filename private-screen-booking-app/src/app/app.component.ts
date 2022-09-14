import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string ='';



  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router) { }

    private sidenav!: MatSidenav;

    public isMenuOpen = false;
    public contentMargin = 240;

    get isHandset(): boolean {
      return this.breakpointObserver.isMatched(Breakpoints.Handset);
    }

  // *********************************************************************************************
  // * LIFE CYCLE EVENT FUNCTIONS
  // *********************************************************************************************

    ngOnInit() {
      this.isMenuOpen = false;  // Open side menu by default
      this.title = 'Brand Name';
    }

    ngDoCheck() {
        if (this.isHandset) {
          this.isMenuOpen = false;
        } else {
          this.isMenuOpen = true;
        }
    }


}
