var mysql = require("mysql");
var express = require("express");
var app = express();
let connection = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "projekt",
});
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
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

//
//
//      Dodawanie do bazy /POST/
//
//
app.post("/movieAdd/:data", (req, res) => {

  const data=JSON.parse(req.params.data);

  connection.query(
    "INSERT INTO `movie`( `nazwa`, `img`, `czasTrwania`, `ocena`) VALUES (\"" +
    data.nazwa +
    "\",\"" +
    data.img +
    "\",\"" +
    data.czasTrwania +
    "\"," +
    data.ocena +
    ")",
    function (err, res, fields) {
      if (err) {
        console.log(err.message);
      }
    }
  );

  res.send("Dodano film: " + data.nazwa);
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
    "\"" +
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
    "UPDATE `seans` SET" +
    " `data`=\""+data.data+"\",`czas`=\"" +
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


  res.send("Seans edytowany. Id: " + id + "\n");
});
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
      //if (!res || res.length == 0) throw { err: "Brak filmów" };
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
let getMovieById = function (a) {
  return new Promise((reso, erro) => {
    connection.query(
      "SELECT * FROM `movie` WHERE `id` = " + a,
      function (err, res, fields) {
        if (err) {
          throw "Linia 37 " + err.message;
        }
        //if (!res || res.length == 0) throw { err: "Brak filmów" };
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
