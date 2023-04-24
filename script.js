const cards=document.querySelectorAll(".card")
let moveCount=0
let matchedCard=0;
let cardOne,cardTwo;
let disableDeck=false;
var timer=60;
checkbox.checked=true
win=false
 var sound = document.getElementById("music");
 let myTimer=setTimeout(checkTime(),1000)
// autoplay music ends
animationBegins1()
animationBegins2()
// animtaion initialisation
function animationBegins1(){
  animation = bodymovin.loadAnimation(
  {
      container: document.getElementById('animation'),
     
      path: `https://assets9.lottiefiles.com/packages/lf20_daZky5.json`,
      render: 'svg',
      
      autoplay: true,
      name: 'developer skills animation'
  }
);
}
function animationBegins2(){
  animation = bodymovin.loadAnimation(
  {
      container: document.getElementById('animation1'),
     
      path: 'https://assets9.lottiefiles.com/packages/lf20_dcmlqwqx.json',
      render: 'svg',
      
      autoplay: true,
      name: 'developer skills animation'
  }
);
}

function flipcard(e){
    // console.log(e.target);
    let clickedCard=e.target ;
    // to get user clicked card
    
   if (clickedCard!==cardOne && (!disableDeck)) {
    let touch = new Audio('sound-effects/touch.mp3');
    touch.play();
    moveCount++

  
    console.log(moveCount);
    clickedCard.classList.add("flip")
    

    if(!cardOne){
        return cardOne=clickedCard
        
    }
    cardTwo=clickedCard
    disableDeck=true
        // console.log(cardOne,cardTwo);
    let cardOneImg=cardOne.querySelector("img").src,
    cardTwoImg=cardTwo.querySelector("img").src
    matchCards(cardOneImg,cardTwoImg)
    }
}

function matchCards(img1, img2){
    // console.log(img1,img2);
    if(img1 == img2){
        let correct = new Audio('sound-effects/correct.wav');
	    correct.play();
        matchedCard++
        if(matchedCard == 8){
            let completed = new Audio('sound-effects/completed.wav');
            completed.play();
            // setTimeout(()=>{
            //     return shuffleCard()
            // },1000)
            
            win=true
            gameWin()
            clearInterval(x)


        }
       
        // return console.log("cards are matched");
        cardOne.removeEventListener("click",flipcard)
        cardTwo.removeEventListener("click",flipcard)
        cardOne = cardTwo =""
        return disableDeck=false
    }
    else{
        setTimeout(()=>{
            
            let wrong = new Audio('sound-effects/wrong.mp3');
            wrong.play();
           
        },300)
        setTimeout(()=>{
            window.navigator.vibrate([200, 50, 200]);
        },650)
     
    }
    setTimeout(()=>{
        cardOne.classList.add("shake")
        cardTwo.classList.add("shake")

    },400)
    setTimeout(()=>{
        cardOne.classList.remove("shake","flip")
        cardTwo.classList.remove("shake","flip")
        cardOne = cardTwo =""
        disableDeck=false
    },1200)

}

function shuffleCard(){

 matchedCard=0;
 cardOne = cardTwo="";
 disableDeck=false
 let arr=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
 arr.sort(()=>Math.random() > 0.5 ?  1 : -1)
 cards.forEach((card, index) =>{
    card.classList.remove("flip")
    let imgTag=card.querySelector("img")
    imgTag.src= `images/img-${arr[index]}.png `
    card.addEventListener("click",flipcard)

})
}

shuffleCard()
cards.forEach(card =>{

    card.addEventListener("click",flipcard)

})


// timer section begins
function checkTime(){
    // setTimeout(()=>{
      
    //     timerTxt.innerHTML=timer<10?`00:0${timer}`:`00:${timer}`
    //     timer--
    //     if(timer==-1){
    //       clearTimeout(myTimer);
       
    //         if(win==false){
    //           loss()
    //           clearTimeout(myTimer);
    //         }
           
            
    //     }
    //     else{
    //         checkTime()
    //     }
       
    // },1000)


    var x=setInterval(function(){  //To stop this timer we have 							to put the fn into a variable.
          timerTxt.innerHTML=timer<10?`00:0${timer}`:`00:${timer}`
            if(timer==0){
            clearInterval(x)  //The count get stopped.
            if(win==false){
                        loss()
                        clearInterval(x)
                      }
                      
         }
           else{
          timer--
         }
       
        
      },1000)  //for every 1sec




}

// timer section ends

// sound button begins

// =============================
// The toggle button function
// =============================
var soundOn = true;

function toggleSoundOnOff()  {

  if (soundOn == true) {
    soundOn = false
    sound.pause();
    console.log("soundOn: ", soundOn)
  } else if (soundOn == false) {
    soundOn = true
    loop=true
    sound.play();
    console.log("soundOn: ", soundOn)
  }
}

 
// =============================
// The sound button function
// =============================
  function playSound() {
    if (soundOn !== false) {
      let sound = document.getElementById("audio");
      // sound.play();      
    }
  }



// sound button ends

// replay button pressed begins
function replay(){
  let touch = new Audio('sound-effects/touch.mp3');
  touch.play();
  resultBox.style.display="none"
  timer=60;
  checkTime()
  setTimeout(()=>{
        return shuffleCard()
    },800)
    win=false
    if(checkbox.checked){
      sound.play();
    }

    moveCount=0
    clearTimeout(myTimer);
}

// reply button ends

// game win

function gameWin(animPath){
  document.getElementById('animation1').style.display="none"
  document.getElementById('animation').style.display="block"

  sound.pause();

  resultBox.style.display="flex"
  const star1 = document.getElementById("star1");
  const star2 = document.getElementById("star2");
  const star3 = document.getElementById("star3");
  resultTxt.innerHTML="Congratulations"
  moveTxt=document.getElementById("moveCountTx")
  moveTxt.innerHTML=moveCount
  clearTimeout(myTimer);
  if(moveCount<=30){
    star1.style.color= "orange";
    star2.style.color= "orange";
    star3.style.color= "orange";
  }
  else if(moveCount<35){
    star1.style.color= "orange";
    star2.style.color= "orange";
  }
  else{
    star1.style.color= "orange";
  }
}

function loss(){
  sound.pause();
  document.getElementById('animation').style.display="none"
  document.getElementById('animation1').style.display="block"
  let gameOver = new Audio('sound-effects/gameover.wav');
  gameOver.play();

  clearTimeout(myTimer);
  resultBox.style.display="flex"
  const star1 = document.getElementById("star1");
  const star2 = document.getElementById("star2");
  const star3 = document.getElementById("star3");
  moveTxt=document.getElementById("moveCountTx")
  moveTxt.innerHTML=moveCount
   star1.style.color= "black";
    star2.style.color= "black";
    star3.style.color= "black";
    resultTxt.innerHTML="You Loss!"
  }