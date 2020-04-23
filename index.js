var count = 0;
var flag = 0,
  flag2 = 0;
var no_of_games = 0;
var level = 1;
var current_id = "";
var best_time1 = Number.MAX_VALUE,
  best_time2 = Number.MAX_VALUE,
  best_time3 = Number.MAX_VALUE;
var current_time;
var distance;
var intervalId;

var level_1 = 1,
  level_2 = 0,
  level_3 = 0;
var complete_1 = 0,
  complete_2 = 0,
  complete_3 = 0;

var div_body = document.getElementById("div");
var rows, cols;
var images = [];

var state = {};

/*
    Starts the Game, creating the grid 
    according to the specified level.
*/

function start() {
  for (var i = 1; i <= 12; i++) {
    if (i < 10) {
      var path = "0";
      path += i;
      console.log(path);
      state[path + 1] = 0;
      state[path + 2] = 0;
    } else {
      var path = "";
      path += i;
      state[path + 1] = 0;
      state[path + 2] = 0;
    }
  }

  div_body.innerHTML = "";
  flag2 = 0;
  countCorona();
  setTimeout(timer(), 3000);

  console.log("nd");

  var div_row1;
  var div1 = document.createElement("div");
  if (level == 1) {
    rows = 4;
    cols = 4;
    div1.className = "col-md-6 col-md-offset-4";
  } else if (level == 2) {
    rows = 4;
    cols = 5;
    div1.className = "col-md-6 col-md-offset-4";
  } else {
    rows = 4;
    cols = 6;
    div1.className = "col-md-6 col-md-offset-3";
  }

  for (var i = 1; i <= (rows * cols) / 2; i++) {
    if (i < 10) {
      var path = "0";
      path += i;
      images.push(path + 1);
      images.push(path + 2);
    } else {
      var path = "";
      path += i;
      images.push(path + 1);
      images.push(path + 2);
    }
  }

  for (var i = 1; i <= rows; i++) {
    div_row1 = document.createElement("div");
    div_row1.className = "row";
    var dummy = document.createElement("div");
    if (level == 1) {
      dummy.className = "col-md-4";
    } else if (level == 2) {
      dummy.className = "col-md-3";
    } else {
      dummy.className = "col-md-3";
    }
    div_row1.appendChild(dummy);
    for (var j = 1; j <= cols; j++) {
      var y = images.length;
      var x = Math.floor(Math.random() * y);
      var img = "img/" + images[x] + ".jpeg";
      var image = document.createElement("img");

      image.style.width = "7vw";
      image.style.height = "5vw";
      image.style.margin = "5px";
      image.src = img;
      image.id = images[x];
      image.addEventListener("click", flipIt);
      image.className = "col-md-1";

      div_row1.appendChild(image);
      images.splice(x, 1);
    }
    div1.appendChild(document.createElement("br"));
    //div_row1.appendChild(div1);
    div_body.appendChild(div_row1);
  }

  div_row1 = document.createElement("div");
  div_row1.className = "row";

  let btn_level = document.createElement("button");
  if (level == 1) {
    btn_level.className = "col-md-2 col-md-offset-3 btn btn-success";
  } else if (level_1 == 1 && level != 1) {
    btn_level.className = "col-md-2 col-md-offset-3 btn btn-primary";
  } else {
    btn_level.className = "col-md-2 col-md-offset-3 btn btn-secondary";
  }
  btn_level.addEventListener("click", () => {
    if (level != 1 && level_1 == 1) {
      level = 1;
      flag2 = 1;
      clearInterval(intervalId);
      start();
    }
  });
  btn_level.innerHTML = "Level 1";

  div_row1.appendChild(btn_level);

  btn_level = document.createElement("button");
  if (level == 2) {
    btn_level.className = "col-md-2 btn btn-success";
  } else if (level_2 == 1 && level != 2) {
    btn_level.className = "col-md-2 btn btn-primary";
  } else {
    btn_level.className = "col-md-2 btn btn-secondary";
  }
  btn_level.addEventListener("click", () => {
    if (level != 2 && level_2 == 1) {
      level = 2;
      flag2 = 1;
      clearInterval(intervalId);
      start();
    }
  });

  btn_level.innerHTML = "Level 2";

  div_row1.appendChild(btn_level);

  btn_level = document.createElement("button");
  if (level == 3) {
    btn_level.className = "col-md-2 btn btn-success";
  } else if (level_3 == 1 && level != 3) {
    btn_level.className = "col-md-2 btn btn-primary";
  } else {
    btn_level.className = "col-md-2 btn btn-secondary";
  }
  btn_level.addEventListener("click", () => {
    if (level != 3 && level_3 == 1) {
      level = 3;
      flag2 = 1;
      clearInterval(intervalId);
      start();
    }
  });

  btn_level.innerHTML = "Level 3";
  div_row1.appendChild(btn_level);

  div_body.appendChild(div_row1);

  div_row1 = document.createElement("div");
  div_row1.className = "row";
  var div_col_1 = document.createElement("div");
  var div_col_2 = document.createElement("div");
  var div_col_3 = document.createElement("div");
  div_col_1.className = "col-md-2 col-md-offset-3 ";
  div_col_2.className = "col-md-2 ";
  div_col_3.className = "col-md-2 ";
  if (complete_1 == 1) {
    div_col_1.innerHTML = best_time1 / 1000;
  }
  if (complete_2 == 1) {
    div_col_2.innerHTML = best_time2 / 1000;
  }
  if (complete_3 == 1) {
    div_col_3.innerHTML = best_time3 / 1000;
  }

  div_row1.appendChild(div_col_1);
  div_row1.appendChild(div_col_2);
  div_row1.appendChild(div_col_3);

  div_body.appendChild(div_row1);

  setTimeout("myFunction()", 1000);
}

/*
    For flipping all the objects with black portion up.
*/

function myFunction() {
  console.log("ncjc");
  for (var i = 1; i <= (rows * cols) / 2; i++) {
    if (i < 10) {
      var path = "0";
      path += i;
      var image = document.getElementById(path + 1);
      image.src = "img/black.jpeg";
      image = document.getElementById(path + 2);
      image.src = "img/black.jpeg";
    } else {
      var path = "";
      path += i;
      var image = document.getElementById(path + 1);
      image.src = "img/black.jpeg";
      image = document.getElementById(path + 2);
      image.src = "img/black.jpeg";
    }
  }
}

/*
    Onclick method of image
    If no image is flipped, the clicked image is flipped.
    If one image is already flipped, checks for similarity.
*/

function flipIt() {
  var str = event.target.id;
  console.log(str);
  console.log(state[str]);

  if (state[str] == 0) {
    var image = "img/" + str + ".jpeg";
    var img = document.getElementById(str);
    img.src = image;
    //img.style.transform = "rotateY(180deg)";
    //img.style.transition = "all 0.5s easy";
    if (flag == 0) {
      flag = 1;
      current_id = str;
      state[str] = 1;
    } else {
      if (
        current_id.substr(0, 2) == str.substr(0, 2) &&
        current_id[2] != str[2]
      ) {
        count++;
        //var image = 'img/' + str + '.jpeg';
        //var img=document.getElementById(str);
        //img.src=image;
        flag = 0;
        current_id = "";
        state[str] = 1;
      } else {
        var image = "img/black.jpeg";
        state[str] = 0;
        state[current_id] = 0;
        setTimeout(function () {
          document.getElementById(current_id).src = image;
          document.getElementById(str).src = image;
          flag = 0;
          current_id = "";
        }, 500);
      }

      if (count == (rows * cols) / 2) {
        current_time = distance;
        //console.log("complete");
        level_Complete();

        //setTimeout("window.alert('round colpleted');", 10000);
      }
    }
  }
}

/*
    Called when all the pairs are matched.
    Display current and best score.
    Asks for playing again or Next level.
*/
function level_Complete() {
  div_body.innerHTML = "";
  flag2 = 1;
  console.log(flag2);
  clearInterval(intervalId);
  var div1 = document.createElement("div");
  var div2 = document.createElement("div");
  var div3 = document.createElement("div");
  var div4 = document.createElement("div");
  var btn1 = document.createElement("button");
  var btn2 = document.createElement("button");

  if (level == 1) {
    complete_1 = 1;
    level_2 = 1;
  } else if (level == 2) {
    complete_2 = 1;
    level_3 = 1;
  } else {
    complete_3 = 1;
  }

  if (level == 1 && current_time < best_time1) {
    best_time1 = current_time;
  } else if (level == 2 && current_time < best_time2) {
    best_time2 = current_time;
  } else if (level == 3 && current_time < best_time3) {
    best_time3 = current_time;
  }
  div1.innerHTML = "<h4>Best Score-Level 1 : " + best_time1 / 1000 + "</h4>";
  div2.innerHTML = "<h4>Current Score : " + current_time / 1000 + "</h4>";
  div3.innerHTML = "<h4>Best Score-Level 2 : " + best_time2 / 1000 + "</h4>";
  div4.innerHTML = "<h4>Best Score-Level 3 : " + best_time3 / 1000 + "</h4>";
  btn1.innerHTML = "Move To Next Level";
  btn1.addEventListener("click", function () {
    level++;
    count = 0;
    start();
  });

  btn2.innerHTML = "Play Again";
  btn2.addEventListener("click", function () {
    level;
    count = 0;
    start();
  });

  if (level == 1) {
    div_body.appendChild(div1);
    div_body.appendChild(div2);
    div_body.appendChild(btn1);
    div_body.appendChild(btn2);
  } else if (level == 2) {
    div_body.appendChild(div3);
    div_body.appendChild(div2);
    div_body.appendChild(btn1);
    div_body.appendChild(btn2);
  } else if (level == 3) {
    div_body.appendChild(div1);
    div_body.appendChild(div3);
    div_body.appendChild(div4);
    div_body.appendChild(btn2);
  }
}

/*
    For displaying the timer clock.
    Resets at start of each level.
*/

function timer() {
  var rows = document.createElement("div");
  rows.className = "row";
  var col1 = document.createElement("h1");
  col1.className = "col-md-3 col-md-offset-5";
  col1.innerHTML = "Memory Game";
  var time = document.createElement("h3");
  time.id = "span";
  time.className = "col-md-4";
  time.innerHTML = "0h 0m 0s";
  rows.appendChild(col1);
  //rows.appendChild(document.createElement("br"));
  rows.appendChild(time);

  div_body.appendChild(rows);
  //div_body.appendChild(document.createElement("br"));
  var start = new Date().getTime();

  intervalId = setInterval(function () {
    var now = new Date().getTime();

    distance = now - start;

    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("span").innerHTML =
      hours + "h " + minutes + "m " + seconds + "s ";

    if (flag2 == 1) {
      console.log(flag2);
      clearInterval(intervalId);
    }
  }, 1000);
}

let url = "https://api.covid19api.com/summary";

function countCorona() {
  var details = [],
    details2 = [];

  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      //console.log(data["Global"]);
      //console.log(data["Countries"][101]);
      details[0] = data["Global"]["NewConfirmed"];
      details[1] = data["Global"]["TotalConfirmed"];
      details[2] = data["Global"]["NewDeaths"];
      details[3] = data["Global"]["TotalDeaths"];
      details[4] = data["Global"]["NewRecovered"];
      details[5] = data["Global"]["TotalConfirmed"];

      details2[0] = data["Countries"][101]["NewConfirmed"];
      details2[1] = data["Countries"][101]["TotalConfirmed"];
      details2[2] = data["Countries"][101]["NewDeaths"];
      details2[3] = data["Countries"][101]["TotalDeaths"];
      details2[4] = data["Countries"][101]["NewRecovered"];
      details2[5] = data["Countries"][101]["TotalConfirmed"];

      //console.log(typeof details);
      var table = document.createElement("table");
      table.className = "table table-dark";

      var thead = document.createElement("thead");
      thead.className = "thead-dark";

      var tr = document.createElement("tr");
      var cnts = [
        "New Confirmed",
        "Total Confirmd",
        "New Death",
        "Total Death",
        "New recovered",
        "Total recovered",
      ];
      var th = document.createElement("th");
      th.className = "col";
      th.innerHTML = "#";
      tr.appendChild(th);
      for (var i in cnts) {
        var th = document.createElement("th");
        th.className = "col";
        th.innerHTML = cnts[i];
        tr.appendChild(th);
      }

      thead.appendChild(tr);
      table.appendChild(thead);

      //welwknwlkwflk43rd

      var thead = document.createElement("tbody");

      var tr = document.createElement("tr");
      var cnts = details; // data["Global"];
      console.log("global", details);
      var th = document.createElement("td");
      th.className = "col";
      th.innerHTML = "Global Stats";
      tr.appendChild(th);
      for (var i in details) {
        var th = document.createElement("td");
        th.className = "col";
        th.innerHTML = details[i];
        tr.appendChild(th);
      }

      thead.appendChild(tr);
      table.appendChild(thead);

      //kjdvks c

      var thead = document.createElement("tbody");

      var tr = document.createElement("tr");
      var cnts = details2; // data["Countries"][101];
      //console.log("india", details2);
      var th = document.createElement("td");
      th.className = "col";
      th.innerHTML = "India Stats";
      tr.appendChild(th);
      for (var i = 0; i < details2.length; i++) {
        var th = document.createElement("td");
        th.className = "col";
        th.innerHTML = details2[i];
        tr.appendChild(th);
      }

      thead.appendChild(tr);
      table.appendChild(thead);

      div_body.appendChild(table);

      //console.log(details);
    })
    .catch((error) => console.log("Error"));
}
/*
<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>*/
