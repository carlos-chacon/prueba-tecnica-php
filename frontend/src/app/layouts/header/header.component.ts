import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title!: string;
  description!: string;

  constructor(private hs: HeaderService) {}

  ngOnInit(): void {
    this.hs.titleHeader.subscribe(title => {
      this.title = title;
    });

    this.hs.descriptionHeader.subscribe(description => {
      this.description = description;
    })
  }

}
