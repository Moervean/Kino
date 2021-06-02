import { Component, OnInit } from '@angular/core';
import {moviesServices} from '../services/movies.services';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private mServices: moviesServices,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
  }

}
