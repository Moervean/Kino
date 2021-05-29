import {MovieModel} from './movie.model';
import {Room} from './room.model';

export class SeanceModel {
  get room(): Room {
    return this._room;
  }

  private _movie: MovieModel;
  private _date: string;
  private _time: string;
  private _room: Room;

  get movie(): MovieModel {
    return this._movie;
  }

  set movie(value: MovieModel) {
    this._movie = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get time(): string {
    return this._time;
  }

  set time(value: string) {
    this._time = value;
  }


  constructor(movie: MovieModel, date: string, time: string, room: Room) {
    this._movie = movie;
    this._date = date;
    this._time = time;
    this._room = room;
  }
}
