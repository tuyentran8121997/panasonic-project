import { typeItems, windowBtn, insulationBtn } from "./constants";

function renderData() {
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
        document.querySelector(".popup__product-content").style.display =
          "block";
        document.querySelector(".popup__product-desc").style.display = "block";
        document.querySelector(".error").style.display = "none";
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

export { renderData, getModelByName };
