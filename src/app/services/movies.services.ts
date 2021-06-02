import {MovieModel} from '../Models/movie.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class moviesServices {
  jsonvar;
  private _movieList: MovieModel[] = [];

    constructor(private http: HttpClient) {
       this.http.get('http://localhost:8080/movies').subscribe((data) => {
        this.jsonvar = data;
        for (let i = 0; i < this.jsonvar.length; i++) {
          this._movieList.push(new MovieModel(this.jsonvar[i]["id"],this.jsonvar[i]["nazwa"],this.jsonvar[i]["img"],this.jsonvar[i]["czasTrwania"],
            this.jsonvar[i]["ocena"]));
        }
      });
   }

   public async init(){

   }
  addMovie(title: string, img: string, duration: string): void {
    this._movieList.push(new MovieModel(1, title, img, duration, 0));
  }
  get movieList(): MovieModel[] {


    return this._movieList;
  }
  getMovie(title: string): MovieModel {

    for (let i = 0; i < this._movieList.length; i++){
      if (title === this._movieList[i].name){
        return this._movieList[i];
      }
    }
  }
  removeMovie(title: string){
      let id;
    for (let i = 0; i < this._movieList.length; i++){
      if (title === this._movieList[i].name){
        id = this._movieList[i].id;
        this._movieList.splice(i, 1);
      }
    }

    this.http.post('http://localhost:8080/movieDelete/' + id, '').subscribe(data => {
      console.log(data);
    });
  }


}
