const ul = document.querySelector("ul");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const lis = ul.querySelectorAll("li");
let len = lis.length;
let enableClick = true;
//이벤트 자체를 변수로 선언?

/* 함수패키징과 클릭 이벤트가 발생하는 동안 이벤트가 다시 발생되지 않도록 막는 코딩
번잡하고 양이 많았던 초기 설정 코딩을 조금 더 넓은 시야로 볼 수 있게 가독성을 올려준다. */
init();
next.addEventListener("click", (e) => {
  e.preventDefault();
  if (enableClick) {
    nextSlide();
    enableClick = false;
    // 클릭이 가능하지 않게 하겠다. {},() 안 (한 묶음)에서는 동기적으로 코드가 실행되는게 아닌지? 비동기적으로 발생?
  }
});

prev.addEventListener("click", (e) => {
  e.preventDefault();
  if (enableClick) {
    prevSlide();
    enableClick = false;
  }
});

function prevSlide() {
  new Anim(ul, {
    prop: "left",
    value: "0%",
    duration: 1000,
    callback: () => {
      ul.style.left = "-100%";
      ul.prepend(ul.lastElementChild);
    },
  });
}

function nextSlide() {
  new Anim(ul, {
    prop: "left",
    value: "-200%",
    duration: 1000,
    callback: () => {
      ul.append(ul.firstElementChild);
      ul.style.left = "-100%";
      enableClick = true;
      //이벤트가 종료된 후 클릭했을때 이벤트가 다시 발생 할 수 있도록 돌려주었다.
    },
  });
}

function init() {
  ul.style.left = "-100%";
  ul.prepend(ul.lastElementChild);
  ul.style.width = `${100 * len}%`;
  lis.forEach((el) => {
    el.style.width = `${100 / len}%`;
  });
}
