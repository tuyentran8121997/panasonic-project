import { btnNext, typeItems, windowBtn, insulationBtn } from "./constants";
import { renderData } from "./renderData";

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
      const result = Array.from(typeItems).filter((e) =>
        e.classList.contains("active")
      );
      if (result.length != 0) {
        btnNext.classList.remove("btn--disabled");
      } else {
        btnNext.classList.add("btn--disabled");
      }
      break;
    }
    case 2: {
      steps[1].classList.add("active");
      tabsStep[1].classList.add("active");
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
      break;
    }
    case 3: {
      steps[2].classList.add("active");
      tabsStep[2].classList.add("active");
      renderData();
      document.querySelector(".btn-so-mobile").classList.add("show-for-mobile");
      break;
    }
  }
}
export default showStep;
