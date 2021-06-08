import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
  lista: Array<any>=[];
  zakupione: Array<any>=[];
  constructor(private sanitizer: DomSanitizer,private http: HttpClient) { }

  ngOnInit(): void {
	  this.load();
	  this.loadZakupy();
  }
  finalizeShop():void{
	var x= getCookie('koszyk');
	  var msg="";
	  if(x.length==0){
		  //msg="Brak rezerwacji w koszyku";
		  //$("#lista").html(msg);
		  return;
	  }
	  console.log(x);
	  var y=JSON.parse(x); 
	  
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
	console.log(y);
	y.seanse.forEach((e,i)=>{
		var r=JSON.stringify(y.miejsca[i]).replace("[","").replace("]","");
		const httpOptions = {
		  reservedSeats: r,
		  token: getCookie('token')
		};
		this.http.post('http://localhost:8080/buyTicket/' + e+ '/' + encodeURIComponent(JSON.stringify(httpOptions)),
		  {headers}).subscribe(data => {

		});
	});
	setCookie("koszyk",1,-1);
	this.lista=[];
	msg="Wykupiono rezerwacje z koszyka";
	$("#lista").html(msg);
	this.loadZakupy();
  }
	del(id):void{
	  var x= getCookie('koszyk');
	  var msg="";
	  if(x.length==0){
		  //msg="Brak rezerwacji w koszyku";
		  //$("#lista").html(msg);
		  return;
	  }
	  console.log(x);
	  var y=JSON.parse(x); 
	  var odp=0;
	  y.seanse.forEach((e,i)=>{
		  if(e==id){
			  odp=i;
		  }
	  });
	  if(y.miejsca)y.miejsca.splice(odp,1);
	  y.seanse.splice(odp,1);
	  setCookie("koszyk",JSON.stringify(y),7);
	  if(y.seanse.length==0){
		  this.lista=[];
	  }else 
	  this.load();
  
	}
	loadZakupy():void{
	  var temp=this;
	  //zakupione
	  console.log("zakupione");
	  $.get( "http://localhost:8080/zakupione/"+getCookie("token"), function(data) {
		  var d=JSON.parse(data);
			console.log("zakupione2");
		  var t=temp;
		  d.forEach((el,ind)=>{
			  $.get( "http://localhost:8080/seans/"+el.id_seans, function(data2) {
				  var d2=JSON.parse(data2);
					console.log("zakupione3");
					d2=d2[0];
					console.log(d2);
					
				  $.get( "http://localhost:8080/movies/"+d2.movieId, function(dd) {
					  console.log("nr"+dd);
					  dd=JSON.parse(dd);
					  dd=dd[0];
					  temp.zakupione.push({nazwa:dd.nazwa,czas:d2.czas,data:d2.data,img:dd.img,miejsce:el.nr_miejsca});
				  });
			  });
		  });

	  });
	}
	load():void{
	  var x= getCookie('koszyk');
	  var msg="";
	  if(x.length==0){
		  msg="Brak rezerwacji w koszyku";
		  $("#lista").html(msg);
		  return;
	  }
	  console.log(x);
	  var y=JSON.parse(x); 
	  console.log(y);
	  var temp=this;

	  
	  
	  //koszyk
	  $.get( "http://localhost:8080/seansList/"+JSON.stringify(y.seanse), function(data) {
		  console.log(data);
		  data=JSON.parse(data);
		  console.log(data);
		  if(data.err){
			  $('#err').text(data.err);
		  }
		  if(data.msg){
			  $('#msg').html(data.msg);
		  }
		  var a=JSON.parse(data.seanse);
		  console.log(a);
		  //$("#lista").html("");
		  temp.lista=[];
		  a.forEach((e)=>{
			   $.get( "http://localhost:8080/movies/"+e.movieId, function(d) {
				   console.log("zwrot:");
				   var aaa=JSON.parse(d);
				   console.log(aaa);
				  /* $("#lista").append('<a class="list-group-item list-group-item-dark">\
				   <div class="row">\
					  <div class="col-sm-3"><img class="float-left" style="width:160px;height:180px" src="'+aaa[0].img+'"/></div></div>\
					  <div class="row"><div class="col-md-6 col-sm-5"><h4 class="list-group-item-heading float-left">'+aaa[0].nazwa+'</h4></div>\
					  <div class="col-md-7"><p class="list-group-item-text float-left">'+e.data+' '+e.czas+'</p></span><button style="cursor:pointer" onClick="delete('+e.id+')" class="btn btn-danger float-right">Usuń</button></div>\
					 </div> \
					  </a>');*/
					  /* $("#lista").append($compile('<div class="container border-own border-own-color">\
						  <div class="row">\
						    <div class="col-md-4"><img class="float-left" style="width:160px;height:180px" src="'+aaa[0].img+'"/></div>\
							<div class="col-md-8">\
							  '+aaa[0].nazwa+'\
							  <div class="row">\
								<div class="col-md-6">'+e.data+' '+e.czas+'</div>\
								<button style="cursor:pointer" (click)="usun('+e.id+')" class="btn btn-danger float-right">Usuń</button>\
							  </div>\
							</div>\
						  </div>\
						</div>'));
						var ress='<div class="container border-own border-own-color">\
						  <div class="row">\
						    <div class="col-md-4"><img class="float-left" style="width:160px;height:180px" src="'+aaa[0].img+'"/></div>\
							<div class="col-md-8">\
							  '+aaa[0].nazwa+'\
							  <div class="row">\
								<div class="col-md-6">'+e.data+' '+e.czas+'</div>\
								<button style="cursor:pointer" (click)="del('+e.id+')" class="btn btn-danger float-right">Usuń</button>\
							  </div>\
							</div>\
						  </div>\
						</div>';*/
						var ind=-1;
						console.log(y);
						console.log(e);
						y.seanse.forEach((ee,ii)=>{if(ee==e.id)ind=ii;});
						//if(ind==-1)return;
						var str="";
						console.log(y.miejsca);
						y.miejsca[ind].forEach((e,i)=>{
						str+=e;if(i!=y.miejsca[ind].length-1)str+=",";});
						temp.lista.push({nazwa:aaa[0].nazwa,data:e.data,czas:e.czas,img:aaa[0].img,miejsca:str});
						//temp.lista= temp.sanitizer.bypassSecurityTrustHtml(ress);
			   });
			 
		  });
						console.log("listaaa \n\n\n");
						console.log(temp.lista);
		  
		})
		  .done(function() {
			console.log( "second success" );
		  })
		  .fail(function() {
			console.log( "error" );
		  })
		  .always(function() {
			console.log( "finished" );
		  });
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