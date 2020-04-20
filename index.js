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
var x;

var level_1 = 0,
  level_2 = 0,
  level_3 = 0;

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
  timer();
  console.log("nd");

  var div_row1 = document.createElement("div");
  div_row1.className = "row";

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
    //div1.innerHTML = "";
    for (var j = 1; j <= cols; j++) {
      var y = images.length;
      var x = Math.floor(Math.random() * y);
      var img = "img/" + images[x] + ".jpeg";
      var image = document.createElement("img");

      image.style.width = "100px";
      image.style.height = "100px";
      image.style.margin = "5px";
      image.src = img;
      image.id = images[x];
      image.addEventListener("click", flipIt);

      div1.appendChild(image);
      images.splice(x, 1);
    }
    div1.appendChild(document.createElement("br"));
    //div_row1.appendChild(div1);
    div_body.appendChild(div1);
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
      clearInterval(x);
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
      clearInterval(x);
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
      clearInterval(x);
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
  if (level_1 == 1) {
    div_col_1.innerHTML = best_time1 / 1000;
  }
  if (level_2 == 1) {
    div_col_2.innerHTML = best_time2 / 1000;
  }
  if (level_3 == 1) {
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
  clearInterval(x);
  var div1 = document.createElement("div");
  var div2 = document.createElement("div");
  var div3 = document.createElement("div");
  var div4 = document.createElement("div");
  var btn1 = document.createElement("button");
  var btn2 = document.createElement("button");

  if (level == 1) {
    level_1 = 1;
  } else if (level == 2) {
    level_2 = 1;
  } else {
    level_3 = 1;
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
  var time = document.createElement("span");
  time.id = "span";
  div_body.appendChild(time);

  var start = new Date().getTime();

  x = setInterval(function () {
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
      clearInterval(x);
    }
  }, 1000);
}
