import { OnInit, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceComponent implements OnInit {

  gamesData = [];
  constructor() { }

  ngOnInit() {
  }
  //method for storing games data to commonService
  setTopGames(games: any){
    this.gamesData = games;
  }
  //method for fetching data from commonService
  getTopGames() {
    return this.gamesData;
  }
}
