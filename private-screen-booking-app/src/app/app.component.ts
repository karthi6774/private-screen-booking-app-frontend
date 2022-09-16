import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string ='';



  constructor(private breakpointObserver: BreakpointObserver) { }

   // private sidenav!: MatSidenav;

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
      this.title = 'Brand Name'; // add the brand name here
    }

    // toggles menu icons
    ngDoCheck() {
        if (this.isHandset) {
          this.isMenuOpen = false;
        } else {
          this.isMenuOpen = true;
        }
    }

}
