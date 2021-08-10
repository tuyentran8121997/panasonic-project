import "../scss/style.scss";

// variables
let currentPage = 0;
let currentStep = 0;
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");

const logo = document.querySelector(".logo");

const readTerm = document.querySelectorAll(".read-term");
const pageTerm = document.querySelector(".popup__body-term");
const term = document.querySelector(".term");
const legal = document.querySelector(".legal");
const checkTerm = document.querySelectorAll(".checkbox-term");

const typeItems = document.querySelectorAll(".type__item");

const windowBtn = document.querySelectorAll(".window button");
const insulationBtn = document.querySelectorAll(".insulation button");

// Start
showPage(currentPage);

// Show Pages
function showPage(currentPage) {
  const page = document.querySelectorAll(".popup__body");
  page.forEach((item) => {
    item.classList.remove("active");
  });
  page[currentPage].classList.add("active");
  legal.style.display = "block";
  if (currentPage == 0) {
    readTerm.forEach((item) => {
      item.style.display = "flex";
    });
    isCheckBox();
  }
}

// show Steps
function showStep(currentStep) {
  const steps = document.querySelectorAll(".popup__tab-pane");
  const tabsStep = document.querySelectorAll(".popup__tab-item");
  steps.forEach((item) => {
    item.classList.remove("active");
  });
  tabsStep.forEach((item) => {
    item.classList.remove("active");
  });
  switch (currentStep) {
    case 1: {
      steps[0].classList.add("active");
      tabsStep[0].classList.add("active");
      isChooseType();
      break;
    }
    case 2: {
      steps[1].classList.add("active");
      tabsStep[1].classList.add("active");
      isChooseBtn();
      break;
    }
    case 3: {
      steps[2].classList.add("active");
      tabsStep[2].classList.add("active");
      getMatrix();
      document.querySelector(".btn-so-mobile").classList.add("show-for-mobile");

      break;
    }
  }
}

// event click btn next
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

// event click btn prev
btnPrev.addEventListener("click", function () {
  btnNext.style.display = "block";
  logo.style.display = "block";
  document.querySelector(".btn-so-mobile").classList.remove("show-for-mobile");
  if (pageTerm.classList.contains("active")) {
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

// term
term.addEventListener("click", function () {
  currentPage = 2;
  showPage(currentPage);
  logo.style.display = "none";
  btnPrev.style.display = "block";
  legal.style.display = "none";
});

// legal
legal.addEventListener("click", function () {
  if (currentPage === 0) {
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

// checkbox read term
checkTerm.forEach((item) => {
  item.onchange = function () {
    if (item.checked) {
      checkTerm.forEach((check) => {
        check.checked = true;
      });
      btnNext.classList.remove("btn--disabled");
    } else {
      checkTerm.forEach((check) => {
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
    isChooseType();
  });
});

// step 2 choose window / insulation
function btnClick(btnList) {
  btnList.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btnList.forEach(function (item) {
        item.classList.remove("active");
      });
      this.classList.add("active");
      isChooseBtn();
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

// matrix fetch
function getMatrix() {
  const matrixApi = "../data/matrix.json";
  let heat_cool = true;
  let purification = true;
  let insulation = true;
  let west = true;
  fetch(matrixApi)
    .then((response) => response.json())
    .then((data) => {
      let typeProduct = "";

      for (let i = 0; i < typeItems.length; i++) {
        if (typeItems[i].classList.contains("active")) {
          typeProduct = typeItems[i];
        }
      }
      if (typeProduct.getAttribute("data-type") === "cooling") {
        heat_cool = false;
        purification = false;
      } else if (typeProduct.getAttribute("data-type") === "purification") {
        heat_cool = true;
        purification = true;
      } else {
        heat_cool = true;
        purification = false;
      }
      let isInsulation = "";
      for (let i = 0; i < insulationBtn.length; i++) {
        if (insulationBtn[i].classList.contains("active")) {
          isInsulation = insulationBtn[i].getAttribute("data-answer");
        }
      }
      insulation = true ? isInsulation === "yes" : false;
      let isWest = "";
      for (let i = 0; i < windowBtn.length; i++) {
        if (windowBtn[i].classList.contains("active")) {
          isWest = windowBtn[i].getAttribute("data-answer");
        }
      }
      west = true ? isWest === "yes" : false;

      const totalDimension = parseInt(
        document.querySelector(".my-total").innerText
      );

      let modelName = "";
      for (let prop in data) {
        if (
          data[prop].heat_cool === heat_cool &&
          data[prop].purification === purification &&
          data[prop].insulation === insulation &&
          data[prop].west === west &&
          data[prop].area[0] <= totalDimension &&
          data[prop].area[1] >= totalDimension
        ) {
          modelName = data[prop].model;
        }
      }
      return getModelByName(modelName).then(function (modelDetail) {
        return {
          modelName: modelName,
          modelDetail: modelDetail,
        };
      });
    })
    .then(function (data) {
      if (data.modelName && data.modelDetail) {
        document.querySelector(".error").style.display = "none";
        document.querySelector(".popup__product-content").style.display =
          "block";
        document.querySelector(".popup__product-desc").style.display = "block";
        let productInfo = "";
        let productBenefit = "";
        const lengthData = data.modelDetail.benefit.length;
        productInfo += `
                <p class="popup__product-name">${data.modelDetail.market_name}</p>
                <p class="popup__product-sku">${data.modelName}</p>
                <img src="./images/products/${data.modelDetail.image}" alt="" class="popup__product-image">`;
        document.querySelector(".product-info").innerHTML = productInfo;

        for (let i = 0; i < lengthData; i++) {
          productBenefit += `<li>${data.modelDetail.benefit[i]}</li>`;
        }
        document.querySelector(".benefit-list").innerHTML = productBenefit;
      } else {
        document.querySelector(".popup__product-content").style.display =
          "none";
        document.querySelector(".popup__product-desc").style.display = "none";
        document.querySelector(".error").style.display = "block";
      }
    });
}

// get model by matrix
function getModelByName(modelName) {
  const modelsApi = "../data/models.json";
  return fetch(modelsApi)
    .then((response) => response.json())
    .then((data) => {
      for (let prop in data) {
        if (prop === modelName) {
          return data[prop];
        }
      }
    });
}

// product tab item
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

function isCheckBox() {
  checkTerm.forEach((item) => {
    if (item.checked) {
      checkTerm.forEach((check) => {
        check.checked = true;
      });
      btnNext.classList.remove("btn--disabled");
    } else {
      checkTerm.forEach((check) => {
        check.checked = false;
      });
      btnNext.classList.add("btn--disabled");
    }
  });
}

function isChooseType() {
  const result = Array.from(typeItems).filter((e) =>
    e.classList.contains("active")
  );
  if (result.length != 0) {
    btnNext.classList.remove("btn--disabled");
  } else {
    btnNext.classList.add("btn--disabled");
  }
}
function isChooseBtn() {
  const newArray1 = Array.from(windowBtn).filter((e) =>
    e.classList.contains("active")
  );
  const newArray2 = Array.from(insulationBtn).filter((e) =>
    e.classList.contains("active")
  );
  if (newArray1.length != 0 && newArray2.length != 0) {
    btnNext.classList.remove("btn--disabled");
  } else {
    btnNext.classList.add("btn--disabled");
  }
}
