import {SeanceModel} from '../Models/seance.model';
import {Injectable} from '@angular/core';
import {moviesServices} from './movies.services';
import {Room} from '../Models/room.model';
import {MovieModel} from '../Models/movie.model';
import {HttpClient} from '@angular/common/http';
import {roomsServices} from './roms.services';

@Injectable()
export class SeancesService {
  private list: SeanceModel[] = [];
  jsonvar;
  constructor(private msService: moviesServices,
                    private http: HttpClient,
              private rmService: roomsServices) {
    this.http.get('http://localhost:8080/seansList').subscribe((data) => {
      this.jsonvar = data;
      for (let i = 0; i < this.jsonvar.length; i++) {
        // this._movieList.push(new MovieModel(this.jsonvar[i]["id"],this.jsonvar[i]["nazwa"],this.jsonvar[i]["img"],this.jsonvar[i]["czasTrwania"],
        //   this.jsonvar[i]["ocena"]));
        this.http.get('http://localhost:8080/movies/' + this.jsonvar[i].movieId).subscribe(data => {
          const movie = new MovieModel(data[0].id,
            data[0].nazwa,
            data[0].img,
            data[0].czasTrwania,
            data[0].ocena);
          const room = this.rmService.getRoomById(this.jsonvar[i].roomId);
          this._seancesList.push(new SeanceModel(this.jsonvar[i].id,movie, this.jsonvar[i].data, this.jsonvar[i].czas, room));


        });


      }
    });

  }

  private _seancesList: SeanceModel[] = [];
  get seancesList(): SeanceModel[] {
    return this._seancesList;
  }

  daySeancesList(date: string): SeanceModel[] {
    this.list = [];
    for (let i = 0; i < this._seancesList.length; i++) {
      console.log(date);
      console.log(this._seancesList[i].date );

      if (this._seancesList[i].date == date) {
        this.list.push(this._seancesList[i]);
      }
    }
    return this.list;
  }

  async init(){

  }
  removeSeance(title: string, date: string, time: string) {

    for (let i = 0; i < this._seancesList.length; i++) {
      if (this._seancesList[i].movie.name === title
        && this._seancesList[i].date === date
        && this._seancesList[i].time === time) {

        this._seancesList.splice(i, 1);
      }
    }

  }

  getSeance(title: string, date: string, time: string): SeanceModel {
    for (let i = 0; i < this._seancesList.length; i++) {
      if (this._seancesList[i].movie.name === title
        && this._seancesList[i].date === date
        && this._seancesList[i].time === time) {
        return this._seancesList[i];
      }

    }
  }

  addSeance(movie: MovieModel, date: string, time: string, room: Room) {
    this._seancesList.push(new SeanceModel(movie, date, time, room));
  }

  isRoomFree(date: string, time: string, roomNumber: number, title: string): boolean {
    let i: number;
    const daySeanceList: SeanceModel[] = this.daySeancesList(date);
    const startDate = new Date(date + ':' + time);
    const endDate = new Date('1970-01-01:' + this.msService.getMovie(title).duration).valueOf() + startDate.valueOf()
      + new Date('1970-01-01:02:00:00').valueOf();
    let j = daySeanceList.length;
    for (i = 0; i < daySeanceList.length; i++) {

      const movieStartDate: Date = new Date(daySeanceList[i].date + ':' + daySeanceList[i].time);

      const movieEndDate = new Date('1970-01-01:' + daySeanceList[i].movie.duration).valueOf()
        + movieStartDate.valueOf()
        + new Date('1970-01-01:02:00:00').valueOf();

      if (daySeanceList[i].room.roomNumber == roomNumber) {
        if (( startDate.valueOf() > movieEndDate.valueOf() || endDate.valueOf() < movieStartDate.valueOf())) {
          j--;
        }
      }else{
        j--;
      }
    }

    if (j === 0) {
      return true;
    } else {
      return false;
    }
  }
}
