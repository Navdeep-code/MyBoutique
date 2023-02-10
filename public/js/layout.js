window.onload = pageload;

function pageload() {
  var btn = document.getElementById("menu-btn");
  btn.onclick = togglemenu;

  function togglemenu() {
    var menu = document.querySelector(".header-content ul");
    menu.classList.toggle("show");
  }
}