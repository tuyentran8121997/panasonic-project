import "../scss/style.scss";

// popup open / close
const btnOpen = document.querySelector(".btn-open");
const btnClose = document.querySelector(".btn-close");
const modal = document.querySelector(".modal");

btnOpen.addEventListener("click", function () {
  modal.style.display = "block";
});

btnClose.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});
