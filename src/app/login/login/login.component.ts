import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

	login(){
		$('#msg').text('');
		$('#err').text('');
		var l=$('#login').val();
		var p=$('#password').val();
		var dane={login:l,password:p};
		$.post( "http://localhost:8080/login/"+JSON.stringify(dane), function(data) {
		  console.log(data);
		  data=JSON.parse(data);
		  if(data.err){
			  $('#err').text(data.err);
		  }
		  if(data.msg){
			  $('#msg').html(data.msg);
			  setCookie('token', data.token,7);
			  setTimeout(function(){document.location.href="/";},5000);
		  }
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
