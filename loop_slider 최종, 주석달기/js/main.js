const ul = document.querySelector("ul");
//ul이라는 변수명에 HTML의 ul 태그를 담았다.
const prev = document.querySelector(".prev");
//prev라는 변수명에 class prev를 담았다.
const next = document.querySelector(".next");
const lis = ul.querySelectorAll("li");
let len = lis.length;
//lis라는 변수명엔 li태그가 담겨 있는데 li태그의 길이만큼 len이라는 변수명에 담겠다.
let enableClick = true;
//이벤트가 아니라 그냥 변수, 불린 값을 사용해서 on, off가 가능하게 해준다. 그래서 if로 접근이 가능여부가 결정된다.

init(); // 함수선언
next.addEventListener("click", (e) => {
  //next 변수에 클릭했을때 이벤트를 발생되게 해주겠다. 이벤트 객체(next).
  e.preventDefault();
  //next에 부여된 기본 이벤트를 없애주세요.
  if (enableClick) {
    //만약 클릭이 된다면
    nextSlide();
    //nextSlide라는 함수를 실행해주세요.
    enableClick = false;
    //이벤트가 진행되는 동안 클릭은 되지 않게 해주세요.
  }
});

prev.addEventListener("click", (e) => {
  //상동
  e.preventDefault();
  if (enableClick) {
    prevSlide();
    enableClick = false;
  }
});

function prevSlide() {
  //prevSlide 라는 함수 선언
  new Anim(ul, {
    //new Anim = anime.js에 class Anim이라고 선언되어 있다.
    //ul 태그에다가 anme라는 js 플러그인을 연결해서 중괄호 안에 있는 값을 넘겼다.
    prop: "left",
    //객체의 내부 속성(프로퍼티) : 좌측으로
    value: "0%",
    // 값 = 0%, 0%는 1의 좌측 선이 기준.
    duration: 1000,
    //진행되는 시간 1초
    callback: () => {
      //콜백 함수 = 다른 코드의 인수로서 넘겨주는 실행 가능한 코드, 넘겨 받는 코드에 따라 즉시 실행하거나 나중에 실행하거나 가능
      ul.style.left = "-100%";
      //ul 변수에 좌측으로 -100%만큼 css 스타일을 입혀주세요. (기존 0%인 1에서 -100%인 2의 자리로 이동.)
      ul.prepend(ul.lastElementChild);
      //ul의 가장 뒤에 있는 요소를 앞에 붙여주세요.

      enableClick = true;
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
      //ul의 가장 앞에 있는 요소를 뒤에다 붙여주세요.
      ul.style.left = "-100%";
      enableClick = true;
      //이벤트가 종료된 후 클릭했을때 이벤트가 다시 발생 할 수 있도록 돌려주었다.
    },
  });
}

function init() {
  //init이라는 함수를 만들자.
  ul.style.left = "-100%";
  ul.prepend(ul.lastElementChild);
  ul.style.width = `${100 * len}%`;
  //요소가 추가될때마다 css에서 일일이 width 값을 수정해 줄수 없으므로 js에서 요소(li)의 길이만큼 자동계산 되게끔 코딩. ul
  lis.forEach((el) => {
    //forEach 메서드는 다음 매개변수(parameter)와 함께 배열의 각 요소에 적용하게 될 콜백 함수를 전달한다.
    el.style.width = `${100 / len}%`;
    //요소에 넓이 값을 100 / 요소의 길이만큼 계산되게끔 코딩. li
  });
}
