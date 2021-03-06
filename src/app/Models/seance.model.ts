import {MovieModel} from './movie.model';
import {Room} from './room.model';

export class SeanceModel {
  get room(): Room {
    return this._room;
  }

  private _id: number;
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  private _movie: MovieModel;
  private _date: string;
  private _time: string;
  private _room: Room;
  private _reservedSeats: string;

  get reservedSeats(): string {
    return this._reservedSeats;
  }

  set reservedSeats(value: string) {
    this._reservedSeats = value;
  }

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


  constructor(id: number, movie: MovieModel, date: string, time: string, room: Room, reservedSeats: string) {
    this._id = id;
    this._movie = movie;
    this._date = date;
    this._time = time;
    this._room = room;
    this._reservedSeats = reservedSeats;
  }
}
