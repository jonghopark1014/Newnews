(() => {

    const actions = {
        birdFlies(key) {
            if (key){
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`
            }
            // 부모의 인덱스를 이용하면된다
        },
        birdFlies2(key) {
            if (key){
                document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`
            } else {
                document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`
            }
            // 부모의 인덱스를 이용하면된다
        }
    }

    const stepElems = document.querySelectorAll('.step')
    const graphicElems = document.querySelectorAll('.graphic-item')
    // 현재 활성화된 (visible 클래스가 붙은) .graphic-item을 지정
    let currentItem = graphicElems[0]

    // 현재 그림을 확인 
    const io =new IntersectionObserver((entries, observer) => {
        // 문자로 들어감 (검은색이면 문자)
        ioindex = entries[0].target.dataset.index * 1

    })

    for (let i = 0; i < stepElems.length; i++){
        io.observe(stepElems[i]) 
        // stepElems[i].setAttribute('data-index', i)
        stepElems[i].dataset.index = i
        graphicElems[i].dataset.index = i
    }
    // 활성화 할때
    function activate(action) {
        currentItem.classList.add('visible')
        // 액션이 들어오면 호출을 하기위해
        if (action){
            actions[action](true)
        }
    }
    // 비활성화 될때
    function inactivate(action) {
        currentItem.classList.remove('visible')
        if (action) {
            actions[action](false)
        }
    }



    window.addEventListener('scroll', () =>{
        let step
        let boundinRect

        // for문을 많이 든다 그래서 현재 보이는 눈의 개수로 한다
        for (let i = ioindex - 1; i < ioindex + 2; i++){
            // 현재꺼 전 현재꺼 다음까지 
            step = stepElems[i]
            if (!step) continue
            // 스탭에 값이 없으면 밑에로 가주세요 
            boundinRect = step.getBoundingClientRect()
            // console.log(boundinRect.top)

            if (boundinRect.top > window.innerHeight * 0.1 && 
                boundinRect.top < window.innerHeight * 0.8) {
                    // console.log(step.dataset.index)
                    inactivate(currentItem.dataset.action)
                    currentItem = graphicElems[step.dataset.index]
                    activate(currentItem.dataset.action)
                }
            }
        }
    )
    //새로 고침할시 제일 위로 가게 하기
    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0), 100)
    })
    activate()
})();
