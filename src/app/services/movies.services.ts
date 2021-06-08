import {MovieModel} from '../Models/movie.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class moviesServices {
  jsonvar;
  lastid;
  private _movieList: MovieModel[] = [];

    constructor(private http: HttpClient) {
       this.http.get('http://localhost:8080/movies').subscribe((data) => {
        this.jsonvar = data;
        for (let i = 0; i < this.jsonvar.length; i++) {
          this._movieList.push(new MovieModel(this.jsonvar[i]["id"],this.jsonvar[i]["nazwa"],this.jsonvar[i]["img"],this.jsonvar[i]["czasTrwania"],
            this.jsonvar[i]["ocena"]));
          this.lastid= this.jsonvar[i]["id"];
        }
      });
   }

   public async init(){

   }
  addMovie(title: string, img: string, duration: string): void {

      this.lastid++;
      console.log(this.lastid);
    this._movieList.push(new MovieModel(this.lastid, title, img, duration, 0));
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
    this.http.post('http://localhost:8080/seansDelete/' + id, '').subscribe(data => {
      console.log(data);
    });
  }


}
