import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
	register(){
		$('#msg').text('');
		$('#err').text('');
		var l=$('#login').val();
		var p=$('#password').val();
		var e=$('#email').val();
		var dane={login:l,password:p,email:e};
		$.get( "http://localhost:8080/register/"+JSON.stringify(dane), function(data) {
		  console.log(data);
		  data=JSON.parse(data);
		  if(data.err){
			  $('#err').text(data.err);
		  }
		  if(data.msg){
			  $('#msg').html(data.msg);
			  setTimeout(function(){document.location.href="/login";},5000);
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
