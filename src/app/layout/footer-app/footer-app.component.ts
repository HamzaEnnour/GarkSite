import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-app',
  templateUrl: './footer-app.component.html',
  styleUrls: ['./footer-app.component.scss']
})
export class FooterAppComponent implements OnInit {

  year: number = 2020;
  constructor(private scrollToService: ScrollToService,) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

  scrollTo(target) {
    const config: ScrollToConfigOptions = {
      target,
      offset: -150
    };
    this.scrollToService.scrollTo(config);
  }

}
