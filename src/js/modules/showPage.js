import { btnNext, checkTerms, legal, readTerm } from "./constants";
function showPage(currentPage) {
  const page = document.querySelectorAll(".popup__body");
  legal.style.display = "block";
  if (currentPage === 0) {
    readTerm.forEach((item) => (item.style.display = "flex"));
    checkTerms.forEach((item) => {
      if (item.checked) {
        btnNext.classList.remove("btn--disabled");
        checkTerms.forEach((check) => {
          check.checked = true;
        });
      } else {
        btnNext.classList.add("btn--disabled");
        checkTerms.forEach((check) => {
          check.checked = false;
        });
      }
    });
  }
  page.forEach((item) => {
    item.classList.remove("active");
  });
  page[currentPage].classList.add("active");
}

export default showPage;
