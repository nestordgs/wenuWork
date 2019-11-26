import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  routes = [
    {
      title: 'List Characters', route: 'characters.index', requiredLogin: false,
    },
    {
      title: 'My Favorites', route: 'characters.favorites', requiredLogin: true,
    },
    {
      title: 'Charts',
      options: [
        {
          title: 'Vs. Status', route: 'charts.status', requiredLogin: false,
        },
        {
          title: 'Vs. Episodes', route: 'charts.episodes', requiredLogin: false,
        },
        {
          title: 'Favorites by Status', route: 'charts.fav.status', requiredLogin: true,
        },
        {
          title: 'Favorites by Episodes', route: 'charts.fav.episodes', requiredLogin: true,
        },
      ],
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
