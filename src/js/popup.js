import "../scss/style.scss";

import showPage from "./modules/showPage";
import showStep from "./modules/showStep";
import {
  btnNext,
  btnPrev,
  logo,
  term,
  readTerm,
  legal,
  checkTerms,
  typeItems,
  windowBtn,
  insulationBtn,
} from "./modules/constants";

// variables
let currentPage = 0;
let currentStep = 0;

// Start
showPage(currentPage);

// button prev/next change page
btnNext.addEventListener("click", function () {
  if (!btnNext.classList.contains("btn--disabled")) {
    logo.style.display = "block";
    btnNext.innerText = "Next";
    currentPage = 1;
    currentStep++;
    if (currentStep >= 3) {
      currentStep = 3;
      btnNext.style.display = "none";
    }
    btnPrev.style.display = "block";
    showPage(currentPage);
    showStep(currentStep);
  }
});

btnPrev.addEventListener("click", function () {
  btnNext.style.display = "block";
  logo.style.display = "block";
  document.querySelector(".btn-so-mobile").classList.remove("show-for-mobile");
  if (currentPage === 2) {
    if (currentStep === 0) {
      currentPage = 0;
      btnPrev.style.display = "none";
    } else {
      currentPage--;
      if (currentStep === 3) {
        btnNext.style.display = "none";
      }
    }
  } else {
    currentStep--;
    if (currentStep <= 0) {
      currentStep = 0;
      currentPage--;
    }
    if (currentPage <= 0) {
      currentPage = 0;
      btnPrev.style.display = "none";
      btnNext.innerText = "Start now";
    }
  }
  showStep(currentStep);
  showPage(currentPage);
});

// term click to open
term.addEventListener("click", function () {
  currentPage = 2;
  showPage(currentPage);
  logo.style.display = "none";
  btnPrev.style.display = "block";
  legal.style.display = "none";
});

// legal click to open
legal.addEventListener("click", function () {
  if (currentPage == 0) {
    btnNext.style.display = "block";
    readTerm.forEach((item) => {
      item.style.display = "flex";
    });
  } else {
    btnNext.style.display = "none";
    readTerm.forEach((item) => {
      item.style.display = "none";
    });
  }
  currentPage = 2;
  showPage(currentPage);
  logo.style.display = "none";
  btnPrev.style.display = "block";
  legal.style.display = "none";
});

// change checked checkbox read term
checkTerms.forEach((item) => {
  item.onchange = function () {
    if (item.checked) {
      checkTerms.forEach((check) => {
        check.checked = true;
      });
      btnNext.classList.remove("btn--disabled");
    } else {
      checkTerms.forEach((check) => {
        check.checked = false;
      });
      btnNext.classList.add("btn--disabled");
    }
  };
});

// step 1 choose type product
typeItems.forEach(function (item) {
  item.addEventListener("click", function () {
    typeItems.forEach(function (typeItem) {
      typeItem.classList.remove("active");
    });
    this.classList.add("active");
    btnNext.classList.remove("btn--disabled");
  });
});

// step 2 user - choose button yes/no  window / insulation
function btnClick(btnList) {
  btnList.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btnList.forEach(function (item) {
        item.classList.remove("active");
      });
      this.classList.add("active");
      const newArray1 = Array.from(windowBtn).filter((item) =>
        item.classList.contains("active")
      );
      const newArray2 = Array.from(insulationBtn).filter((item) =>
        item.classList.contains("active")
      );
      if (newArray1.length != 0 && newArray2.length != 0) {
        btnNext.classList.remove("btn--disabled");
      } else {
        btnNext.classList.add("btn--disabled");
      }
    });
  });
}
btnClick(windowBtn);
btnClick(insulationBtn);

// side Range
const widthRange = document.querySelector("#width-range");
const lengthRange = document.querySelector("#length-range");
const myWidth = document.querySelector(".my-width");
const myLength = document.querySelector(".my-length");
const total = document.querySelector(".my-total");
total.innerText = myWidth.innerText * myLength.innerText;
function sizeRange(element, number) {
  const min = element.min;
  const max = element.max;
  const value = element.value;
  number.innerText = value;
  element.style.background = `linear-gradient(to right, #69ac5c ${
    ((value - min) / (max - min)) * 100
  }%, rgba(0, 65, 192, 0.25) ${((value - min) / (max - min)) * 100}%)`;

  element.addEventListener("input", function () {
    number.innerText = this.value;
    this.style.background = `linear-gradient(to right, #69ac5c ${
      ((this.value - this.min) / (this.max - this.min)) * 100
    }%, rgba(0, 65, 192, 0.25) ${
      ((this.value - this.min) / (this.max - this.min)) * 100
    }%)`;
    total.innerText = myWidth.innerText * myLength.innerText;
  });
}
sizeRange(lengthRange, myLength);
sizeRange(widthRange, myWidth);

// Change item / pane active product tab
const productTabItems = document.querySelectorAll(".popup__product-tab-item");
const productTabPanes = document.querySelectorAll(".popup__product-tab-pane");
const line = document.querySelector(".popup__product-tabs .line");
const productTabItemActive = document.querySelector(
  ".popup__product-tab-item.active"
);

line.style.left = productTabItemActive.offsetLeft + "px";

productTabItems.forEach((tab, index) => {
  const pane = productTabPanes[index];
  tab.addEventListener("click", function () {
    document
      .querySelector(".popup__product-tab-item.active")
      .classList.remove("active");
    document
      .querySelector(".popup__product-tab-pane.active")
      .classList.remove("active");
    this.classList.add("active");
    pane.classList.add("active");
    line.style.left = this.offsetLeft + "px";
  });
});

// btn start over
const btnStartOver = document.querySelectorAll(".btn-start-over");
btnStartOver.forEach((item) => {
  item.addEventListener("click", function () {
    document
      .querySelector(".btn-so-mobile")
      .classList.remove("show-for-mobile");
    currentPage = 1;
    currentStep = 1;
    showPage(currentPage);
    showStep(currentStep);
    btnNext.style.display = "block";
    btnNext.classList.remove("btn--disabled");
  });
});
