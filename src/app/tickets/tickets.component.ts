import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SeanceModel} from '../Models/seance.model';
import {SeancesService} from '../services/seances.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  seance: SeanceModel;
  pickedSeats: number[] = [];
  freeSeats: boolean[] = [];
  constructor(private route: ActivatedRoute,
              private seanceService: SeancesService,
              private http: HttpClient) {
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.seance = this.seanceService.getSeance(params.title, params.date, params.hour);
      }
    );
    for (let i = 0; i < this.seance.room.seatsNumber; i++){
      this.freeSeats[i] = true;
    }
  }

  ngOnInit(): void {

    console.log(this.seance.id);
    const pickedPlaces = this.seance.reservedSeats.split(',');
    console.log(this.seance.reservedSeats);
    pickedPlaces.forEach(v => {
      const seat = parseInt(v, 10);
      this.freeSeats[seat] = false;
    });

  }


  buyTicket(seatNumber: number) {
    if (!this.pickedSeats.includes(seatNumber)) {
    this.pickedSeats.push(seatNumber);
    }
    else{
      for (let i = 0; i < this.pickedSeats.length; i++){
        if (this.pickedSeats[i] === seatNumber){
          this.pickedSeats.splice(i, 1);
        }
      }
    }


  }

  finalizeTransaction() {

    for (let i = 0; i < this.pickedSeats.length; i++){
      this.freeSeats[this.pickedSeats[i]] = false;
    }

    let reseved = '';
    this.freeSeats.forEach((v, i) => {
      if (v === false){
        console.log(i.toString());
        reseved += i.toString();
        reseved += ',';
      }
    });
    this.seance.reservedSeats = reseved;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const httpOptions = {
      reservedSeats: reseved
    };
    this.http.post('http://localhost:8080/buyTicket/' + this.seance.id + '/' + encodeURIComponent(JSON.stringify(httpOptions)),
      {headers}).subscribe(data => {

    });
    this.pickedSeats = [];
  }
}
