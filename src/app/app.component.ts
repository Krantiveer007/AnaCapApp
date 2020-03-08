import { Component, OnInit } from '@angular/core';
import { CommonServiceComponent } from './common-service/common-service.component';
import * as topgames from '../assets/mock/topgames.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AnaCapApp';
  //importing data from mock json
  games: any = (topgames as any).default;

 constructor(private commonService: CommonServiceComponent) {}
 ngOnInit() {
  //storing JSON data to local storage
  this.commonService.setTopGames(this.games);
 }
}
