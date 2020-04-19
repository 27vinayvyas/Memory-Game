var count=0;
var flag=0,flag2=0;
var no_of_games=0;
var level=1;
var current_id="";
var best_time1=50000000,best_time2=50000000,best_time3=50000000;
var current_time;
var distance;

var div_body = document.getElementById('div');
//var body = document.getElementById('body');

var rows,cols;
var images=[];

function start(){
    div_body.innerHTML='';
    flag2=0;
    timer();
    console.log('nd');
    if(level==1){
        rows=4;cols=4;
    }else if(level==2){
        rows=4;cols=5;
    }else{
        rows=4;cols=6;
    }

    for(var i=1;i<=(rows*cols/2);i++){
        if(i<10){
            var path="0";
            path+=i;
            images.push(path+1);
            images.push(path+2);
        }else{
            var path="";
            path+=i;
            images.push(path+1);
            images.push(path+2);    
        }
    }

    var div1= document.createElement('div');
    

    for(var i=1;i<=rows;i++){
        div1.className='row';
        for(var j=1;j<=cols;j++){
            var y=images.length;
            var x=Math.floor(Math.random()*y);
            var img= 'img/'+images[x]+'.jpeg';
            var image = document.createElement('img');

            image.style.width='100px';
            image.style.height='100px';
            image.style.margin='5px';
            image.src=img;
            image.id=images[x];
            image.addEventListener("click", flipIt);

            div1.appendChild(image);
            images.splice(x, 1);
        }
        div_body.appendChild(div1);
        div1.appendChild(document.createElement('br'));
    }

    setTimeout("myFunction()", 1000);

}

function myFunction(){
    console.log("ncjc");
    for(var i=1;i<=(rows*cols/2);i++){
        if(i<10){
            var path="0";
            path+=i;
            var image = document.getElementById(path+1);
            image.src='img/black.jpeg';
            image = document.getElementById(path+2);
            image.src='img/black.jpeg';
        }else{
            var path="";
            path+=i;
            var image = document.getElementById(path+1);
            image.src='img/black.jpeg';    
            image = document.getElementById(path+2);
            image.src='img/black.jpeg';
        }
    }
}

function flipIt(){
    var str=event.target.id;
    console.log(str);
    var image = 'img/' + str + '.jpeg';
    var img=document.getElementById(str);
    img.src=image;

    if(flag==0){
        flag=1;
        current_id=str;
    }else{
        if(current_id.substr(0,2)==str.substr(0,2) && current_id[2]!=str[2]){
            count++;
            //var image = 'img/' + str + '.jpeg';
            //var img=document.getElementById(str);
            //img.src=image;
            flag=0;
            current_id="";
        }else{
            var image = 'img/black.jpeg';
            setTimeout(function(){
            document.getElementById(current_id).src=image;
            document.getElementById(str).src=image;
            flag=0;
            current_id="";
            }, 500);
        }

        if(count==rows*cols/2){
            current_time=distance;
            //console.log("complete");
            level_Complete();
            
            //setTimeout("window.alert('round colpleted');", 10000);
        }

    }
}

function level_Complete(){
    div_body.innerHTML="";
    flag2=1;
    console.log(flag2);
    clearInterval(x);
    var div1=document.createElement('div');
    var div2=document.createElement('div');
    var div3=document.createElement('div');
    var div4=document.createElement('div');
    var btn1=document.createElement('button');
    var btn2=document.createElement('button');
    
    if(level==1 && current_time<best_time1){
        best_time1=current_time;
    }else if(level==2 && current_time<best_time2){
        best_time2=current_time;
    }else if(level==3 && current_time<best_time3){
        best_time3=current_time;    
    }
    div1.innerHTML='<h4>Best Score-Level 1 : ' + best_time1/1000 + '</h4>';
    div2.innerHTML='<h4>Current Score : ' + current_time/1000 + '</h4>';
    div3.innerHTML='<h4>Best Score-Level 2 : ' + best_time2/1000 + '</h4>';
    div4.innerHTML='<h4>Current Score-Level 3 : ' + best_time3/1000 + '</h4>';
    btn1.innerHTML="Move To Next Level";
    btn1.addEventListener('click',function(){
        
        level++;
        count=0;
        start();
        })
    
    btn2.innerHTML="Play Again";
    btn2.addEventListener('click',function(){
        level;
        count=0;
        start();
    })

    if(level==1){
        div_body.appendChild(div1);
        div_body.appendChild(div2);
        div_body.appendChild(btn1);
        div_body.appendChild(btn2);
    }else if(level==2){
        div_body.appendChild(div3);
        div_body.appendChild(div2);
        div_body.appendChild(btn1);
        div_body.appendChild(btn2);
    }else if(level==3){
        div_body.appendChild(div1);
        div_body.appendChild(div3);
        div_body.appendChild(div4);
        div_body.appendChild(btn2);
    }
            
}

function endGame(){
    div_body.innerHTML="";

}
var x;
function timer(){
var time = document.createElement('span');
time.id='span';
div_body.appendChild(time);

var start = new Date().getTime();
            
// Update the count down every 1 second
x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  distance = now-start;
    
  // Time calculations for days, hours, minutes and seconds
  //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("span").innerHTML = hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (flag2==1) {
    console.log(flag2);
    clearInterval(x);
    //document.getElementById("span").innerHTML = "EXPIRED";
  }
}, 1000);
}

