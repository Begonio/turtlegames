function themeToggle(){var element=document.body;element.classList.toggle("dark-mode");}(function(){let onpageLoad=localStorage.getItem("theme")||"";let element=document.body;element.classList.add(onpageLoad);document.getElementById("theme").textContent=localStorage.getItem("theme")||"light";})();function themeToggle(){let element=document.body;element.classList.toggle("dark-mode");let theme=localStorage.getItem("theme");if(theme&&theme==="dark-mode"){localStorage.setItem("theme","");}else{localStorage.setItem("theme","dark-mode");}
document.getElementById("theme").textContent=localStorage.getItem("theme");}
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
var animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}
const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');

toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.background = 'white';
        body.style.color = 'black';
        body.style.transition = '2s';
    }else{
        body.style.background = 'black';
        body.style.color = 'white';
        body.style.transition = '2s';
    }
});

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
$(document).ready(function(){
    $(".mobile-nav i").click(function(){
        $(".site-nav-menu").toggleClass("mobile-menu");
    });
 });

let count = 1;
document.querySelector('#change-image').addEventListener('click', evt => {
  count += 1;
  let url = 'url("../img/bs/IMG_' + count + '.jpg")';
})
function changeBackground() {
  element.style.backgroundImage = url
}