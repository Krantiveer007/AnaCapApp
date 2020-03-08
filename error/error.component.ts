import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage = 'This page is not available. Please try again or contact the administrator.';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      if(params['navigationReason'] === 'topGamesJsonNotFound') {
        this.errorMessage = 'There is some error in loading data, please refresh or contact the administrator.'
      }
    });
  }

}
