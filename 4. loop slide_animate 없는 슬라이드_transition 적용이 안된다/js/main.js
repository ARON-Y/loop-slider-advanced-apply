const ul = document.querySelector("ul");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const lis = ul.querySelectorAll("li");
let len = lis.length;
let enableClick = true;

init();
next.addEventListener("click", (e) => {
  e.preventDefault();
  if (enableClick) {
    enableClick = false;
    nextSlide();
    //순서 중요!!!
  }
});

prev.addEventListener("click", (e) => {
  e.preventDefault();
  if (enableClick) {
    enableClick = false;
    prevSlide();
  }
});

function prevSlide() {
  // new Anim(ul, {
  //   prop: "left",
  //   value: "0%",
  //   duration: 1000,
  //   callback: () => {
  //     ul.style.left = "-100%";
  //     ul.prepend(ul.lastElementChild);
  //   },
  // });

  const duration = 1000;
  const initialValue = parseInt(ul.style.left) || 0;
  const targetValue = 0;
  const unit = "%";
  const startTime = performance.now();
  //console.log(startTime);

  function animate(time) {
    //console.log(time);
    const timeElapsed = time - startTime;
    console.log(timeElapsed);
    const progress = timeElapsed / duration;

    const currentValue = initialValue + (targetValue - initialValue) * progress;
    ul.style.left = `${currentValue}${unit}`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      ul.style.left = "-100%";
      ul.prepend(ul.lastElementChild);
      if (typeof callback === "function") callback();
    }
  }
  requestAnimationFrame(animate);
  enableClick = true;
}

function nextSlide() {
  // const startTime = performance.now();

  /* 함수가 실행되는 시간. 이벤트 함수가 시작되는 시간이 중요한 이유? 첫 로딩이 되서 실행되는 시간과 실제 이벤트(버튼을 누르거나 해서) 발생 시간이 존재한다. 
  이벤트가 종료되는 시간도 존재하는데     (로딩이 되서 실행되는 시간 + 이벤트 종료시간) - (로딩이 되서 실행되는 시간 + 이벤트 함수 발생 시간) = 이벤트 지속시간
  프로세스(진행상황)을 알려면 시각이 매우 중요하다. */
  const duration = 1000; //nextslide라는 함수가 진행되는 시간을 1초로 지정했다.
  const intialValue = parseInt(ul.style.left) || 0;
  /* 초기화 값을 부여 해준것이다. parseInt : css에서 0.1px만 무너져도 레이아웃이 깨진다. 정수값으로 가지고 와야한다. (초기 값은 거의 0이긴 할테지만)
  ul.style.left 값을 가지고 오는데 실수일 경우 정수로 무조건 바꿔주세요. 값이 존재하지 않다면 0(디폴트값, undefined 방지용)으로 바꿔주세요. */
  const targetValue = -200;
  //코드 작성자(나!)가 목표로 하는 위치 값 -100 → -200
  const unit = "%";
  const startTime = performance.now();
  //초기 페이지 로딩부터 함수가 실행되는 시간을 의미한다.
  // console.log(startTime);

  function animate(time) {
    console.log(time);
    const timeElapsed = time - startTime;
    // timeElapsed(경과시간, 함수가 진행된 진짜 시간) = time : 전체시간 - startTime : 함수 발생 시작 시간
    console.log(timeElapsed); // 소수점이 되긴 하지만 1초로 귀결이 되는 값이다.

    const progress = timeElapsed / duration;
    // 얼마나 진행이 됐는지(프로세스, 진행상황) = 진짜 진행되는 시간(경과시간) : 분자 / 진행되는 시간 : 분모     진행상황을 0과 1사이의 값으로 반환.

    const currentValue = intialValue + (targetValue - intialValue) * progress;
    //함수로 호출해서 서서히 움직이고 있는 값을 구하자 = 현재 위치 해 있는 값 + (타겟의 값 : -200%로 움직인다고 했던 -(음수값으로 움직이니까 마이너스를 준 것.) 초기 값 ) * 프로세스(얼마나 진행됐는지);
    //수학적 공식이라 계산이 조금 어렵다.
    ul.style.left = `${currentValue} ${unit}`;
    //값을 구해서 ul에 심어주는 과정을 코딩해주었다.

    if (progress < 1) {
      //progress는 당연히 0과 1사이의 값이 나올것이다. 1보다 작다는것은 진행상황이 유지(animate를 계속 호출)되어여 한다는 것이다. → 종료지점까지 진행시키고 그 과정들도 볼 수 있도록 transition이 된것 처럼)
      requestAnimationFrame(animate);
      //animate를 반복호출 요청하는 코딩
    } else {
      ul.style.left = "-100%";
      // -100%로 당기고, append 가장 앞에 요소를 뒤에다 갖다 붙혀준다. 최종 1이 되었을때 기본로직처럼 초기화 하는 코드이다.
      ul.append(ul.firstElementChild);

      //처음으로 돌아가야 무한 loop가 돌아간다. 다시 되돌려서 animate함수(콜백함수)를 사용할 수 있도록 하는 되돌리는 코드.
      if (typeof callback === "function") callback();
    }
  }

  requestAnimationFrame(animate);
  //함수 자체 밖에서 한번, 함수 안에서 반복적으로 요청하는게 requestAnimationFrame가 하는 일이다.
  enableClick = true;

  // new Anim(ul, {
  //   prop: "left",
  //   value: "-200%",
  //   duration: 1000,
  //   callback: () => {
  //     ul.append(ul.firstElementChild);
  //     ul.style.left = "-100%";
  //     enableClick = true;
  //   },
  // });
}

function init() {
  ul.style.left = "-100%";
  ul.prepend(ul.lastElementChild);
  ul.style.width = `${100 * len}%`;
  lis.forEach((el) => {
    el.style.width = `${100 / len}%`;
  });
}
