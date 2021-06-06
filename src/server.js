var mysql = require("mysql");
var express = require("express");
var app = express();
var sha256 = require('js-sha256');
var crypto = require('crypto');
var cors = require('cors');
app.use(cors());
let connection = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "projekt",
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("\n\n\x1b[32mPolaczono :)\n\n\x1b[0m");
});
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Nasluchiwanie na http://%s:%s", host, port);
});

//zwracanie json'ów
app.get("/movies", function (req, res) {
  try {
    movieList().then((x) => {
      res.end(x);
      console.log("movies: " + x);
    });
  } catch (err) {
    console.log("ERROR " + err);
  }
});
app.get("/movies/:id", function (req, res) {
  try {
    getMovieById(req.params.id).then((x) => {
      res.end(x);
      console.log("movies: " + x);
    });
  } catch (err) {
    console.log("ERROR " + err);
  }
});
app.get("/seansList", function (req, res) {
  try {
    seanse().then((x) => {
      res.end(x);
      console.log("movies: " + x);
    });
  } catch (err) {
    console.log("ERROR " + err);
  }
});
app.get("/seans/:id", function (req, res) {
  try {
    seansById(req.params.id).then((x) => {
      res.end(x);
      console.log("movies: " + x);
    });
  } catch (err) {
    console.log("ERROR " + err);
  }
});

app.get("/roomsList", function (req, res) {
  try {
    roomsList().then((x) => {
      res.end(x);
      console.log("movies: " + x);
    });
  } catch (err) {
    console.log("ERROR " + err);
  }
});
app.get("/roomsById/:id", function (req, res) {
  try {
    roomsById(req.params.id).then((x) => {
      res.end(x);
      console.log("movies: " + x);
    });
  } catch (err) {
    console.log("ERROR " + err);
  }
});

app.get("/seansList/:ids", function (req, res) {
  try {
	  var a=req.params.ids;
	  a=JSON.parse(a);
	  
    seansByIds(a.seanse).then((x) => {
		var xx=JSON.parse(x);
		xx={seanse:x,miejsca:a.miejsca};
      res.end(JSON.stringify(xx));
      console.log("movies: " + x);
    });
  } catch (err) {
    console.log("ERROR " + err);
  }
});
//
//
//      Dodawanie do bazy /POST/
//
//
app.post("/movieAdd", (req, res) => {
  const movie = req.body;
  console.log(movie);

  connection.query(
    "INSERT INTO `movie`( `nazwa`, `img`, `czasTrwania`, `ocena`) VALUES (\"" +
      movie.nazwa +
      "\",\"" +
      movie.img +
      "\",\"" +
      movie.czasTrwania +
      "\"," +
      movie.ocena +
      ")",
    function (err, res, fields) {
      if (err) {
        console.log(err.message);
      }
    }
  );

  res.send("Dodano film: " + movie);
});
//INSERT INTO `movie`(`id`, `nazwa`, `img`, `czasTrwania`, `ocena`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5])
//UPDATE `movie` SET `id`=[value-1],`nazwa`=[value-2],`img`=[value-3],`czasTrwania`=[value-4],`ocena`=[value-5] WHERE 1
app.post('/movieEdit/:id/:data', (req, res) => {
	const data=JSON.parse(req.params.data);
    const id = req.params.id;
    const nazwa = data.nazwa;
    const czasTrwania = data.czasTrwania;
    const ocena = data.ocena;

  connection.query(
    "UPDATE movie SET nazwa=\"" +
    nazwa +
    "\", czasTrwania=\"" +
    czasTrwania +
    "\",ocena=" +
    ocena +
    " WHERE id = " +
    id,
    function (err, res, fields) {
      if (err) {
        console.log(err.message);
      }
    }
  );
    res.send('Movie edytowany. Id: '+id+'\nDane: '+nazwa);
});

app.post("/seansAdd/:data", (req, res) => {
  const seans = JSON.parse(req.params.data);
  console.log(seans);

  connection.query(
    "INSERT INTO `seans`( `movieId`, `data`, `czas`, `roomId`) VALUES (" +
      seans.movieId +
      ",\"" +
      seans.data +
      "\",\"" +
      seans.czas +
      "\"," +
      seans.roomId +
      ")",
    function (err, res, fields) {
      if (err) {
        console.log(err.message);
      }
    }
  );

  res.send("Dodano film: " + seans);
});
app.post("/seansEdit/:id/:data", (req, res) => {
  const data=JSON.parse(req.params.data);
  const id = req.params.id;

  connection.query(
    "UPDATE `seans` SET `movieId`=" +
      data.movieId +
      ",`data`=\""+data.data+"\",`czas`=\"" +
      data.czas +
      "\",`roomId`=" +
      data.roomId +
      " WHERE `id` = " +
      id,
    function (err, res, fields) {
      if (err) {
        console.log(err.message);
      }
    }
  );

  res.send("Seans edytowany. Id: " + id + "\nDane: " + newSeans);
});
//rezerwacje
// przesylane jest jako data (json string) token (usera), id_seansu i nr_miejsca
//
app.post("/rezerwacjaAdd/:data", (req, res) => {
  const rez = JSON.parse(req.params.data);
  console.log(rez);
  connection.query("SELECT * FROM `rezerwacje` WHERE nr_miejsca = "+rez.nr_miejsca, function (err, res, fields) {
      if (err) {
        throw "Linia 193 " + err.message;
      }
      if (!res || res.length == 0){
		  try {
			userByToken(rez.token).then((x) => {
			  //res.end(x);
			  console.log("user: " + x);
			  var user=JSON.parse(x);
			  connection.query(
				"INSERT INTO `seans`( `id_login`, `id_seans`, `nr_miejsca`) VALUES (\"" +
				  user.id +
				  "\"," +
				  rez.id_seans +
				  "," +
				  rez.nr_miejsca +
				  ")",
				function (err, res, fields) {
				  if (err) {
					console.log(err.message);
				  }
				  res.send(JSON.stringify({code:1,msg:"Zarezerwowano miejsce nr: "+rez.nr_miejsca}));
				}
			  );
			});
		  } catch (err) {
			console.log("ERROR " + err);
		  }
	  }else{
		  res.send(JSON.stringify({code:0,err:"Miejsce o tym numerze jest juz zajęte"}));
		  return;
	  }
    });
	
  

  //res.send("Dodano rezerwacje: " + rez);
});

app.get("/register/:data", (req, res) => {
  const user = JSON.parse(req.params.data);
  console.log(user);
	connection.query("SELECT * FROM `users` WHERE `email` = \""+user.email+"\" OR `login` = \""+user.login+"\"", function (err1, res1, fields1) {
		  if (err1) {
			throw "Linia 193 " + err1.message;
		  }
		  if (!res1|| res1.length == 0){
			connection.query(
				"INSERT INTO `users`( `login`, `password`,`email`) VALUES (\"" +
				  user.login +
				  "\",\"" +
				  sha256(user.password) +
				  "\",\"" +
				  user.email +
				  "\")",
				function (err2, res2, fields2) {
				  if (err2) {
					console.log(err2.message);
				  }
				  res.status(200);
				  res.send(JSON.stringify({code:1,msg:"Zarejestrowano konto. Przekierowanie nastąpi za 5 sekund. <a href='/login' style='font-size:13px'>(klik jeśli nie przeniosło)</a>"}));
				  return;
				}
			  );
		  }else{
			  res.status(200);
			  res.send(JSON.stringify({code:0,err:"Email lub login są już w użyciu"}));
			  return;
		  }
	});
});

app.post("/login/:data", (req, res) => {
  const user = JSON.parse(req.params.data);
  console.log(user);
	connection.query("SELECT * FROM `users` WHERE `login` = \""+user.login+"\"", function (err2, res2, fields2) {
		  if (err2) {
			throw "Linia 193 " + err2.message;
		  }
		  if (!res2 || res2.length == 0){
			res.send(JSON.stringify({code:0,err:"Nie ma konta o podanym loginie"}));
		  }else{
			  if(res2[0].password == sha256(user.password)){
				  
				  var token=generateToken();
				  console.log("wygenerowany token: "+token)
				  res.send(JSON.stringify({code:1,msg:"Pomyślnie zalogowano",token:token}));
				   connection.query(
						"UPDATE `users` SET `token`=\"" + token + "\" WHERE `id` = " + res2[0].id,
						function (err, res, fields) {
						  if (err) {
							console.log(err.message);
						  }
						}
					  );
			  }else{
				  res.send(JSON.stringify({code:0,err:"Podano błędne hasło"}));
			  }
		  }
	});
});


app.get("/getUserData/:token", (req, res) => {
  const token = req.params.token;
  console.log(token);
	connection.query("SELECT * FROM `users` WHERE `token` = \""+token+"\"", function (err2, res2, fields2) {
		  if (err2) {
			throw "Linia 193 " + err2.message;
		  }
		  if (!res2 || res2.length == 0){
			res.send(JSON.stringify({code:0,err:"Sesja wygasła. Zaloguj się ponownie"}));
		  }else{
			console.log("Znaleziono konto");
			var u=res2[0];                     /// usuwanie id ze wzgledow bezpieczenstwa i wyslanie loginu i emaila do klienta
			u.id=null;
			
			res.send(JSON.stringify({code:1,msg:"Pomyślnie zalogowano",user:u}));
		  }
	});
});
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}


















//UPDATE `seans` SET `id`=[value-1],`movieId`=[value-2],`data`=[value-3],`czas`=[value-4],`roomId`=[value-5] WHERE 1

app.post("/roomAdd/:data", (req, res) => {
  const room = JSON.parse(req.params.data);
  console.log(room);

  connection.query(
    "INSERT INTO `room`( `miejsca`) VALUES (" + room.miejsca + ")",
    function (err, res, fields) {
      if (err) {
        console.log(err.message);
      }
    }
  );

  res.send("Dodano room: " + room);
});
app.post("/roomEdit/:id/:data", (req, res) => {
  const id = req.params.id;
  const newRoom = JSON.parse(req.params.data);

  connection.query(
    "UPDATE `room` SET `miejsca`=" + newRoom.miejsca + " WHERE `id` = " + id,
    function (err, res, fields) {
      if (err) {
        console.log(err.message);
      }
    }
  );

  res.send("Room edytowany. Id: " + id + "\nDane: " + newRoom);
});
//usuwanie

app.post("/roomDelete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  connection.query(
    "DELETE FROM `room` WHERE `id` = " + id,
    function (err, res, fields) {
      if (err) {
        console.log(err.message);
      }
    }
  );
  res.send("Usunieto room: " + id);
});

app.post("/movieDelete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  connection.query(
    "DELETE FROM `movie` WHERE `id` = " + id,
    function (err, res, fields) {
      if (err) {
        console.log(err.message);
      }
    }
  );
  res.send("Usunieto film: " + id);
  //to-do: usuwanie tez seansow ktore zawieraly ten film
});

app.post("/seansDelete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  connection.query(
    "DELETE FROM `seans` WHERE `id` = " + id,
    function (err, res, fields) {
      if (err) {
        console.log(err.message);
      }
    }
  );
  res.send("Usunieto seans: " + id);
});

//zapytania sql async
let movieList = function () {
  return new Promise((reso, erro) => {
    connection.query("SELECT * FROM `movie`", function (err, res, fields) {
      if (err) {
        throw "Linia 37 " + err.message;
      }
      if (!res || res.length == 0) throw { err: "Brak filmów" };
      //return res;
      reso(JSON.stringify(res));
    });
  });
};
let seanse = function () {
  return new Promise((reso, erro) => {
    connection.query("SELECT * FROM `seans`", function (err, res, fields) {
      if (err) {
        throw "Linia 37 " + err.message;
      }
      if (!res || res.length == 0) throw { err: "Brak seansow" };
      //return res;
      reso(JSON.stringify(res));
    });
  });
};
let seansById = function (a) {
  return new Promise((reso, erro) => {
    connection.query(
      "SELECT * FROM `seans` WHERE `id` = " + a,
      function (err, res, fields) {
        if (err) {
          throw "Linia 37 " + err.message;
        }
        if (!res || res.length == 0) throw { err: "Brak seansow" };
        //return res;
        reso(JSON.stringify(res));
      }
    );
  });
};
let seansByIds = function (a) {
  return new Promise((reso, erro) => {
	var aa=a;
	var str="";
	aa.forEach((e,i)=>{
		str+="`id` = "+e+" ";
		if(i!=aa.length-1)str+="OR ";
	});
    connection.query(
      "SELECT * FROM `seans` WHERE "+a,
      function (err, res, fields) {
        if (err) {
          throw "Linia 37 " + err.message;
        }
        if (!res || res.length == 0) throw { err: "Brak seansow" };
        //return res;
        reso(JSON.stringify(res));
      }
    );
  });
};
let getMovieById = function (a) {
  return new Promise((reso, erro) => {
    connection.query(
      "SELECT * FROM `movie` WHERE `id` = " + a,
      function (err, res, fields) {
        if (err) {
          throw "Linia 37 " + err.message;
        }
        if (!res || res.length == 0) throw { err: "Brak filmów" };
        //return res;
        reso(JSON.stringify(res));
      }
    );
  });
};
let roomsList = function () {
  return new Promise((reso, erro) => {
    connection.query("SELECT * FROM `room`", function (err, res, fields) {
      if (err) {
        throw "Linia 37 " + err.message;
      }
      if (!res || res.length == 0) throw { err: "Brak pokoi" };
      //return res;
      reso(JSON.stringify(res));
    });
  });
};
let roomsById = function (a) {
  return new Promise((reso, erro) => {
    connection.query(
      "SELECT * FROM `room` WHERE `id`=" + a,
      function (err, res, fields) {
        if (err) {
          throw "Linia 37 " + err.message;
        }
        if (!res || res.length == 0) throw { err: "Brak pokoju" };
        //return res;
        reso(JSON.stringify(res));
      }
    );
  });
};

let userByToken = function (a) {
  return new Promise((reso, erro) => {
    connection.query(
      "SELECT * FROM `users` WHERE `token`=\""+a+"\"",
      function (err, res, fields) {
        if (err) {
          throw "Linia 37 " + err.message;
        }
        if (!res || res.length == 0){
			reso(JSON.stringify({err:"Brak takiej osoby lub sesja wygasła"}));
		}
        //return res;
        reso(JSON.stringify(res));
      }
    );
  });
};
/*


Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"

*/
