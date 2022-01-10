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