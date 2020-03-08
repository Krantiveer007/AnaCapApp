import { Component, OnInit } from '@angular/core';
import { CommonServiceComponent } from './common-service/common-service.component';
import * as topgames from '../assets/mock/topgames.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AnaCapApp';
  //importing data from mock json
  games: any = (topgames as any).default;

 constructor(private commonService: CommonServiceComponent, private router: Router) {}
 ngOnInit() {
  // converting Json to string and checking if it is not blank and have an attribute names Rank
  let jsonAsString = JSON.stringify(this.games);
  let isGamesValid = jsonAsString.length > 0
  ? (jsonAsString.includes('Rank') ? true : false)
  : false;
  if(isGamesValid) {
    this.commonService.setTopGames(this.games);
  } else {
    this.router.navigate(['error', {navigationReason: 'topGamesJsonNotFound'}], { skipLocationChange: true })
  }
 }
}
