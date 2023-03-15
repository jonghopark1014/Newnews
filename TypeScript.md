## TypeScript

### npm

npm i typescript -g

node_modules/.bin/tsc

tsc source.ts



## Three.js

- https://velog.io/@mael1657/React-Three.js%EB%A5%BC-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90





## JavaScript

- IntersectionObserver 찾아보기



- let 이랑 const는 {}(block) 단위로 사용 된다

- querySelector는 같은 것이 있어도 제일 첫번째것만 가져온다

- 만약에 모두 같이 가지고 오고 싶으면 qureySelctorAll을 사용해준다

- 함수는 재활용해야되기 때문에 세세하게 나눠 주는게 좋다 

  - ex) 활성화 비활성화 

- 이벤트는 위임해서 사용해줘야 좋다 

- 전역변수로 하면 다른데 사용할때 오류가 날 수도 있기 때문에 

  - (function() {

    }) 이런식으로 작성해 주자

- 애니메이션 하려면 keyframes 를 사용해준다

  - from to 로도 사용 가능하고 %로도 사용이 가능하다

- 구조는 같고 안에 내용은 다르게 사용할때 틀을 만들어서 사용한다 생성자 함수처럼 

  - 생성자 함수는 앞에 대문자로 사용해준다

- 스크롤을 할때 Y축으로 많이 사용한다 인터렉티브웹을 만들때는 스크롤을 많이 사용한다

- transitionend를 더 많이 사용 한다

-  setTimeout == 몇초 있다가 실행시키고 싶을 때 





sticky 일정부분 올라가면 거기서 고정하는 것

fixed 는 

caniuse.com



인터렉티브 하는 방법

1. 어떻게 진행될지에 대한 기획을 먼저한다
2. 기본적인 CSS (위치가 고정된 요소) 를 만든다
3. 스크롤 높이를 적용함



### vscode 코드 emmet

- 유용한 정보

- https://www.hanl.tech/blog/emmet-%EB%8B%A8%EC%B6%95%ED%82%A4-%EB%B0%8F-%ED%8A%B8%EB%A6%AD-9%EA%B0%80%EC%A7%80/





그리드로 잡고 flex로 잡는다 flex 



### SCSS를 CSS로 변환해주는 사이트

https://www.sassmeister.com/

### CSS SCSS로 변환해주는 사이트

- [beautifytools.com/css-to-scss-converter.php](https://beautifytools.com/css-to-scss-converter.php)

- https://bfotool.com/ko/css-to-scss





## React

```
npm create-react-app my-app

npm install recoil
```

recoil 상태를 사용하는 컴포넌트는 부모 트리 어딘가에 나타나는 `RecoilRoot` 가 필요하다. 루트 컴포넌트가 `RecoilRoot`를 넣기에 가장 좋은 장소다



react - 플립

https://www.npmjs.com/package/react-flip-toolkit

react-native에서 사용방법

react  --> react-natve

div    --> View

button --> TouchableOpacity

스크롤되는div --> ScrollView





### Figma

- UI/ UX 60 :30: 10 비율로 해야된다 
  - 60 배경 30 보조수단 10은 선택할 수 있도록 유도하기

- 컨포넌트를 잘사용해야된다
  - 자동 레이아웃 shift + A
  - 그룹화 ctrl + G

https://velog.io/@dbk03053/Sass-%EB%B0%98%EC%9D%91%ED%98%95-Grid





~~상태  - 리코일을 쓸지 리덕스를 쓸지 ?~~

~~테일윈드~~, emotion, CSS, SCSS, styled Components 뭘 쓸지?

