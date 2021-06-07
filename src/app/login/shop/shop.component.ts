import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
	  load();
  }
  
}
function load(){
	  var x= getCookie('koszyk');
	  var msg="";
	  if(x==null||x.length==0){
		  msg="Brak rezerwacji w koszyku";
		  
		  $("#lista").html(msg);
		  return;
	  }
	  console.log(x);
	  var y=JSON.parse(x);
	  $.get( "http://localhost:8080/seansList/"+JSON.stringify(y.seanse), function(data) {
		  console.log(data);
		  data=JSON.parse(data);
		  if(data.err){
			  $('#err').text(data.err);
		  }
		  if(data.msg){
			  $('#msg').html(data.msg);
		  }
		  var a=JSON.parse(data);
		  a.forEach((e)=>{
			 msg+='<a class="list-group-item">\
			  <h4 class="list-group-item-heading"></h4><span style="cursor:pointer" onClick="delete(i)" class="badge">Usuń</span>\
			    <p class="list-group-item-text">'+e.data+' '+e.czas+'</p><span style="background:var(--)" class="badge"></span>\
			  </a>';
		  });
		  $("#lista").html(msg);
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