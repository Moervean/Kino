import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SeanceModel} from '../Models/seance.model';
import {SeancesService} from '../services/seances.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  seance: SeanceModel;
  pickedSeats: number[] = [];
  constructor(private route: ActivatedRoute,
              private seanceService: SeancesService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.seance = this.seanceService.getSeance(params.title, params.date, params.hour);
      }
    );
  }


  buyTicket(seatNumber: number) {
    if (!this.pickedSeats.includes(seatNumber)) {
    this.pickedSeats.push(seatNumber);
    }
    else{
      for (let i = 0; i < this.pickedSeats.length; i++){
        if (this.pickedSeats[i] === seatNumber){
          this.pickedSeats.splice(i,1);
        }
      }
    }


  }

  finalizeTransaction() {
    for(let i=0; i<this.pickedSeats.length;i++){
      this.seance.room.freeSeats[this.pickedSeats[i]]= false;
    }
    this.pickedSeats = [];
  }
}
