import {MovieModel} from '../Models/movie.model';


export class moviesServices {
  private _movieList: MovieModel[] = [
    new MovieModel('Spiderman',
      'https://bi.im-g.pl/im/f3/2e/17/z24307187V,-Spider-Man-Uniwersum-.jpg',
      '2:07:36',
      7),
    new MovieModel('Batman',
      'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fbatman-arkham-knight%2FEGS_WB_Batman_Arkham_Knight_G1_1920x1080_19_0911-1920x1080-1d69e15f00cb5ab57249f208f1f8f45d52cbbc59.jpg?h=1080&resize=1&w=1920',
      '1:48:36',
    9),
  ];
  addMovie(title: string, img: string, duration: string): void {
    this._movieList.push(new MovieModel(title, img, duration, 0));
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
    for (let i = 0; i < this._movieList.length; i++){
      if (title === this._movieList[i].name){
        this._movieList.splice(i, 1);
      }
    }
  }


}
