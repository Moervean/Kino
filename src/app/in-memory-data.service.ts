import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {MovieModel} from './Models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(){
    const movies = [
      new MovieModel(1,'Spiderman',
        'https://bi.im-g.pl/im/f3/2e/17/z24307187V,-Spider-Man-Uniwersum-.jpg',
        '2:07:36',
        7),
      new MovieModel(1,'Batman',
        'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fbatman-arkham-knight%2FEGS_WB_Batman_Arkham_Knight_G1_1920x1080_19_0911-1920x1080-1d69e15f00cb5ab57249f208f1f8f45d52cbbc59.jpg?h=1080&resize=1&w=1920',
        '1:48:36',
        9),
    ];
    return movies;
  }
}
