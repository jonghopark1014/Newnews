// 화살표 함수를 만들고 선언까지 동시에 함
// 지역변수로 처리해서 전역에서 건드리지 못하게 함
(() => {

    const actions = {
        birdFlies(key) {
            if (key) {
                // data-index가 2인 요소의 자식 중 bird를 가진 요소
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
            }
        },
        birdFlies2(key) {
            if (key) {
                // data-index가 2인 요소의 자식 중 bird를 가진 요소
                document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
            } else {
                document.querySelector('[data-index="5"] .bird').style.transform = `translate(-100%)`;
            }
        }
    }

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; 
    let ioIndex;
    
    // 다 체크하는게 아니라 현재 보는 index 전 후만 체크하도록
    // intersection observer : 여기선 target만 씀
    // -> 기능 마니마니 ( 참고 : https://heropy.blog/2019/10/27/intersection-observer/ )
    // observer는 관찰 메소드
    const io = new IntersectionObserver((entries, observer) => {
        // console.log(entries[0].target.dataset.index);
        ioIndex = entries[0].target.dataset.index * 1;
        // ioIndex 찍어보면 검은색으로 뜨는데 지금 문자열이라서, 그리서 숫자로 바꿔서 써야함 / 제일 쉬운 방법은 * 1
        // console.log(ioIndex); 
    })

    for (let i = 0; i < stepElems.length; i++) {
        // 모든 stepElems들을 관찰대상으로 등록
        io.observe(stepElems[i]);
        // 통상적인 방법
        // stepElems[i].setAttribute('data-index', i);
        // data- 이용
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    function activate(action) {
        currentItem.classList.add('visible');
        if (action) {
            actions[action](true);
        }
    }

    function inactivate(action) {
        currentItem.classList.remove('visible');
        if (action) {
            actions[action](false);
        }
    }

    // eventHandler는 간단하면 좋음 -> activate, inactivate 만들기
    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;
        // 몇번 for문이 도는지 확인용
        let temp = 0;

        // for (let i = 0; i < stepElems.length; i++ ) {
        // ioIndex를 사용하여 전후 3개만 검사하도록
        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
            step = stepElems[i];
            // ioIndex 가 0일 때 i 가 -1 인데 stepElems[-1]은 undefined
            if (!step) continue;
            // 각 요소의 위치 정보
            boundingRect = step.getBoundingClientRect();
            // console.log(i, boundingRect.top)

            temp++;

            if (boundingRect.top > window.innerHeight * 0.1 && 
                boundingRect.top < window.innerHeight * 0.8) {
                    // console.log(step.dataset.index);
                    // currentItem visible 제거
                    inactivate(currentItem.dataset.action);
                    // visible 클래스 추가
                    currentItem = graphicElems[step.dataset.index];
                    activate(currentItem.dataset.action);
                }
        }
        // console.log(temp);
    });

    // 이벤트 리스너 마지막 세번째 옵션(버블링 처리 -> 보통 생략) 참조 : https://chlolisher.tistory.com/22 
    window.addEventListener('load', () => {
        // scrollTo는 시간지연을 줘야 잘 작동함
        setTimeout(() => scrollTo(0, 0), 100);
    });

    // 첫 item도 보이도록
    activate();
})();