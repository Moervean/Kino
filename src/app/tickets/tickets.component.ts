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

    //const pickedPlaces = this.seance.reservedSeats.split(',');            //stara wersja, zajęte
    //console.log(this.seance.reservedSeats);
	var temp=this;
    console.log(temp.seance.id);
	$.get( "http://localhost:8080/reservedSeats/"+(temp.seance.id), function(data) {
		  console.log(data);
		  data=JSON.parse(data);
		  if(data.err==1){
			  console.log(data.err);
			  return;
		  }
		  const pickedPlaces = data.seats;
		  console.log(temp.freeSeats);
		  console.log(data.seats);
			pickedPlaces.forEach(v => {
			  const seat = parseInt(v, 10);
			  temp.freeSeats[seat] = false;
			});
		 
		})
	

  }
  dodaj(){
	  	//Cookies.set('Message', 'Hello C-Sharp Corner')//set the cookie value  
    //var CookieValue=Cookies.get('Message')//get the value from cookie  
	for (let i = 0; i < this.pickedSeats.length; i++){
      this.freeSeats[this.pickedSeats[i]] = false;
    }
    var s=getCookie('koszyk');
	var x=[];
	if(s.length==0)x=[];
	else{
		x=s.split(",");
	}
	
    let reseved = '';
    this.freeSeats.forEach((v, i) => {
      if (v === false){
		x.push(i);
        console.log(i.toString());
      }
    });
	var odp="";
	x.forEach(function(e,i){
		odp+=e;
		if(i!=x.length-1)odp+=",";
	});
	setCookie('koszyk',odp,7);
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
      reservedSeats: reseved,
	  token: getCookie('token')
    };
    this.http.post('http://localhost:8080/buyTicket/' + this.seance.id + '/' + encodeURIComponent(JSON.stringify(httpOptions)),
      {headers}).subscribe(data => {

    });
    this.pickedSeats = [];
  }
}
function setCookie(cname, cvalue, exdays) {
	  var d = new Date();
	  d.setTime(d.getTime() + (exdays*24*60*60*1000));
	  var expires = "expires="+ d.toUTCString();
	  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
		  c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		  return c.substring(name.length, c.length);
		}
	  }
	  return "";
	}