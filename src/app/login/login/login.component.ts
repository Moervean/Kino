import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {
    }

  ngOnInit(): void {
  }

	login(){
		var temp=this;
		console.log("try login");
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
			  setTimeout(()=>{
				temp.router.routeReuseStrategy.shouldReuseRoute = () => false;
				temp.router.onSameUrlNavigation = 'reload';
				temp.router.navigate(["/"]);
			  },2000);
			  reloadMenu();
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
function reloadMenu(){
	var token=getCookie('token');  
	if(token){
		$.get( "http://localhost:8080/getUserData/"+token, function(data) {
			  console.log(data);
			  data=JSON.parse(data);
			  if(data.code==0){
				  console.log(data.err);
			  }
			  if(data.code==1){
				  console.log("set");
				  //setCookie('token', data.token,7);
				  var div="<li class='nav-item'><image  src='https://avatar.oxro.io/avatar.svg?name="+(data.user).login+"&background=6ab04c&color=000' style='height:32px;width:32px;border-radius:30px;'/></li>\
				  <span class='nav-link'>"+data.user.login+"</span>\
				  \
				  ";
				  /*div='\
				  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\
		<span class="navbar-toggler-icon"></span>\
	  </button>\
	  <div class="collapse navbar-collapse" id="navbar-list-4">\
		<ul class="navbar-nav">\
			<li class="nav-item dropdown">\
			<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
			  <img src="https://avatar.oxro.io/avatar.svg?name='+(data.user).login+'&background=6ab04c&color=000" width="40" height="40" style="width:32px;height:32px" class="rounded-circle">\
			</a>\
			<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">\
			  <a class="dropdown-item">'+(data.user).login+'</a>\
			  <a class="dropdown-item" (click)="wyloguj()">Wyloguj</a>\
			</div>\
		  </li>   \
		</ul>\
	  </div>';*/
				$("#logged").css("display", "block");
				$("#login_btn").css("display", "none");
				$("#avatar").attr("src",'https://avatar.oxro.io/avatar.svg?name='+(data.user).login+'&background=6ab04c&color=000');
				
				  $('#login_name').text((data.user).login);
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
	}else{
		$("#logged").css("display", "none");
				$("#login_btn").css("display", "block");
	}
}