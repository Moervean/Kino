import {MovieModel} from '../Models/movie.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../Models/room.model';

@Injectable()
export class roomsServices {
  jsonvar;
  private _roomsList: Room[] = [];

  get roomsList(): Room[] {
    return this._roomsList;
  }

  set roomsList(value: Room[]) {
    this._roomsList = value;
  }

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/roomsList').subscribe((data) => {
      this.jsonvar = data;
      for (let i = 0; i < this.jsonvar.length; i++) {
        this._roomsList.push(new Room(this.jsonvar[i].id, this.jsonvar[i].miejsca));
      }
    });
  }


  getRoomById(id:number){
    for(let i =0; i < this._roomsList.length;i++){
      if(this._roomsList[i].roomNumber == id){
        return this._roomsList[i];
      }
    }
  }


}
