import {SeanceModel} from '../Models/seance.model';
import {Injectable} from '@angular/core';
import {moviesServices} from './movies.services';
import {Room} from '../Models/room.model';
import {MovieModel} from '../Models/movie.model';

@Injectable()
export class SeancesService {
  private list: SeanceModel[] = [];

  constructor(private msService: moviesServices) {
  }

  private _seancesList: SeanceModel[] = [
    new SeanceModel(this.msService.movieList[0], '2021-01-29', '09:00', new Room(1, 60)),
    new SeanceModel(this.msService.movieList[0], '2021-01-29', '10:00', new Room(1, 60)),
    new SeanceModel(this.msService.movieList[0], '2021-01-29', '13:00', new Room(1, 60)),
    new SeanceModel(this.msService.movieList[0], '2021-01-29', '16:00', new Room(1, 60)),
    new SeanceModel(this.msService.movieList[0], '2021-01-29', '20:00', new Room(1, 60)),
    new SeanceModel(this.msService.movieList[1], '2021-01-29', '20:00', new Room(1, 60)),
    new SeanceModel(this.msService.movieList[1], '2021-01-29', '11:20', new Room(1, 60)),
    new SeanceModel(this.msService.movieList[1], '2021-01-29', '15:00', new Room(1, 60)),
  ];
  get seancesList(): SeanceModel[] {
    return this._seancesList;
  }

  daySeancesList(date: string): SeanceModel[] {
    this.list = [];
    for (let i = 0; i < this._seancesList.length; i++) {
      if (this._seancesList[i].date === date) {
        this.list.push(this._seancesList[i]);
      }
    }
    return this.list;
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
    const endDate = new Date('1970-01-01:' + this.msService.getMovie(title).duration).valueOf() + startDate.valueOf() + new Date('1970-01-01:02:00:00').valueOf();
    let j = daySeanceList.length;
    for (i = 0; i < daySeanceList.length; i++) {

      const movieStartDate: Date = new Date(daySeanceList[i].date + ':' + daySeanceList[i].time);
      const movieEndDate = new Date('1970-01-01:' + daySeanceList[i].movie.duration).valueOf()
        + movieStartDate.valueOf()
        + new Date('1970-01-01:02:00:00').valueOf();

      if (daySeanceList[i].room.roomNumber === roomNumber) {
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
