const ul = document.querySelector("ul");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const lis = ul.querySelectorAll("li");
let len = lis.length; //추가가되도 자동 li의 갯수를 세어줌

ul.style.marginLeft = "-100%"; //ul의 초기 위치값을 정해주는 코드
ul.prepend(ul.lastElementChild); // 로딩 후 첫번쨰 li가 frame에 보이도록 초기화하는 코드

//ul의 너비값을 li의 갯수에 맞춰서 자동계산코드
ul.style.width = `${100 * len}%`;
//각 li의 너비값을 자동계산해주는 코드
lis.forEach((el) => {
  el.style.width = `${100 / len}%`;
});

//next 슬라이드 이동 코드
next.addEventListener("click", (e) => {
  e.preventDefault();

  ul.style.marginLeft = "-200%";
  ul.style.transitionDuration = "1s";
  setTimeout(() => {
    ul.append(ul.firstElementChild); // 첫번째 li를  뒤쪽으로 보내는 코드
    ul.style.marginLeft = "-100%"; //-200%에서 초기 위치 값으로 복귀하도록 하는 코드
    ul.style.transitionDuration = "1s";
  }, 0);
  /* setTimeout(몇초 뒤에 실행해주세요 하는 콜백상황)를 사용할 경우 callback을 사용할 수 있는 환경만 조성해준다. 모션이 부드럽게 움직이진 않음 (transition X) 적용이 안되는 상태.
  callback 상황이 이루어졌을때 transition으로 이동이 되지 않는다. transform은 가능 하다. 
  sstinterval(반복적인 작업을 해준다.) 반복적으로 움직이게 해서 transition이 되는것처럼 보이게 할 수 있다.
  clearinterval로 멈출 수 있지만 너무 많은 트래픽을 잡아먹는다. 사용을 잘 하지 않는 코드가 되었다.  */

  // new Anim(ul, {
  //   prop: 'left',
  //   value: "-200%",
  //   duration: 1000,
  //   callback: () => {

  //     ul.append(ul.firstElementChild); // 첫번째 li를  뒤쪽으로 보내는 코드
  //     ul.style.left = "-100%"; //-200%에서 초기 위치 값으로 복귀하도록 하는 코드
  //   }
  // })
});

//prev 슬라이드 이동 코드
prev.addEventListener("click", (e) => {
  e.preventDefault();

  ul.style.marginLeft = "0%";
  ul.style.transition = "1s";
  setTimeout(() => {
    ul.style.marginLeft = "-100%"; //0%에서 초기 위치 값으로 복귀하는 코드
    ul.prepend(ul.lastElementChild); //마지막 li를 맨앞으로 보내는 코드
    ul.style.transition = "1s";
  }, 0);

  // new Anim(ul, {
  //   prop: 'left',
  //   value: "0%",
  //   duration: 1000,
  //   callback: () => {
  //     ul.style.left = "-100%"; //0%에서 초기 위치 값으로 복귀하는 코드
  //     ul.prepend(ul.lastElementChild);//마지막 li를 맨앞으로 보내는 코드
  //   }
  // })
});

/*

DOM구조 변경
부모요소명.append(자식요소)
=> 부모요소 안쪽의 가장 뒤쪽에 자식요소를 삽입

부모요소명.prepend(자식요소)
=> 부모요소 안쪽 가장 앞쪽에 자식요소를 삽입


loop slider의 경우
프레임을 기준으로 양쪽에 적어도 한개 이상의 패널 li가 있어야한다
따라서 패널 li는 적어도 3개 이상이어야지만 loop가 가능함


1. 초기 ul의 위치값을 left또는 margin-left가 -100%로 설정한다

2. 슬라이드 기본 모션
prev 버튼 클릭시 ul left -100% -> 0%
next 버튼 클릭시 ul left -100% -> -200%

3. 이동이 끝난 뒤
앞이나 뒤에 쌓인 패널 li를 다시 앞이나 뒤로 재배치시켜야함
=> -,+ 200%상태이므로 다시 되돌려야 한다

4. ul의 초기 위치 left값을 -100%로 초기화 한다

*/
