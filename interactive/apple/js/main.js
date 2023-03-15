(() =>{
    let yOffset = 0 //window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0 // 현재 스크롤 위치(yOffset1)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0 // 현재 활성화된 (눈 앞에 보고있는) 씬(scroll-section)
    let enterNewScene = false // 새로운 scene이 시작된 순간 true

    const sceneInfo = [
        // 객체를 4개 만든다 section 이 4개라
        // 스크롤 높이
        {
            //0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            // 바로 숫자를 안여는 이유 핸드폰이나 다른데에서 열수 도 있어서 기계마다 다르니까
            scrollHeight: 0,
            objs:{
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            //CSS값을 바꾸게 하기 위해
            values: {
                messageA_opacity_in: [0, 1, {start:0.1, end:0.2}],
                messageB_opacity_in: [0, 1, {start:0.3, end:0.4}],
                messageA_opacity_out: [1, 0, {start:0.25, end:0.3}],
            }
        },
        {
            //1
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs:{
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            //2 
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs:{
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            //3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs:{
                container: document.querySelector('#scroll-section-3')
            }
        }
    ]

    function setLayout(number) {
        //각 스크롤 섹션의 높이 세팅
        for (let i=0; i<sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
        }

        yOffset = window.pageYOffset
        let totalScrollHeight = 0
        for (let i =0; i < sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight
            if (totalScrollHeight >= yOffset) {
                currentScene = i
                break
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`)
    }

    /**
     * 계산을 해주려는 함수 
     * @param {number} values objs의 values 값
     * @param {number} currentYoffst 
     */
    function clacValuse(values, currentYOffst) {
        let rv 
        // 현재 씬 (스크롤섹션) 에서 스크롤된 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight
        const scrollRatio = currentYOffst / scrollHeight

        if (values.length === 3) {
            //start ~ end 사이에 애니메이션 실행 
            const partScrollStart = values[2].start * scrollHeight
            const partScrollEnd = values[2].end * scrollHeight
            const partscrollHeight = partScrollEnd - partScrollStart
            
            if (currentYOffst >= partScrollStart && currentYOffst <- partScrollEnd) {
                rv = (currentYOffst - partScrollStart) / partscrollHeight * (values[1]- values[0]) + values[0]
            } else if (currentYOffst < partScrollStart) {
                rv = values[0]
            } else if (currentYOffst > partScrollEnd) {
                rv = values[1]
            }
        } else {
            rv = scrollRatio * (values[1]- values[0]) + values[0]
        }

        return rv
    }

    /**
    * 애니메이션을 실행시켜주는 함수 
    * 점점 진해지는 것
    */
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs
        const values = sceneInfo[currentScene].values 
        const currentYOffst = yOffset - prevScrollHeight
        const scrollHeight = sceneInfo[currentScene].scrollHeight
        const scrollRatio = currentYOffst / scrollHeight
                        // yOffset/현재 씬의 scrollHeight

        // console.log(currentScene)
        switch (currentScene) {
            case 0:
                // console.log("0 play")
                // let messageA_opacity_0 = values.messageA_opacity[0]
                // let messageA_opacity_1 = values.messageA_opacity[1]
                // console.log(messageA_opacity_0, messageA_opacity_1)
                let messageA_opacity_in = clacValuse(values.messageA_opacity_in, currentYOffst)
                let messageA_opacity_out = clacValuse(values.messageA_opacity_out, currentYOffst)
                objs.messageA.style.opacity = messageA_opacity_in

                // if () {

                // }
                // console.log(messageA_opacity_in)
                // console.log(clacValuse(values.messageA_opacity, currentYOffst))
                break
            case 1:
                // console.log("1 play")
                break
            case 2:
                // console.log("2 play")
                break
            case 3:
                // console.log("3 play")
                break
        }
    }
    /**
     * 스크롤에 따라 값을 저장하고 그 값에 따라 id인 show-scene를 body에 붙여준다
     */
    function scrollLoop() {
        //새로운 씬이 시작될때 무시한다
        enterNewScene = false
        // console.log(window.pageYOffset)
        prevScrollHeight = 0 //값이 누적되지 않게 하기 위해
        for (let i =0 ; i < currentScene; i++){
            // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight
            prevScrollHeight += sceneInfo[i].scrollHeight
        }
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true
            currentScene++ // 씬이 바뀌는 순간
            document.body.setAttribute('id',`show-scene-${currentScene}`)
        }
        if (yOffset < prevScrollHeight) {
            enterNewScene = true
            if (currentScene === 0) return
            currentScene-- // 씬이 바뀌는 순간
            document.body.setAttribute('id',`show-scene-${currentScene}`)
        }
        if (enterNewScene) return
        // document.body.setAttribute('id',`show-scene-${currentScene}`)
        // console.log(currentScene)
        playAnimation()        
    }

    
    window.addEventListener('scroll', ()=>{
        yOffset = window.pageYOffset 
        scrollLoop()
    })

    // === window.addEventListener('DOMContentLoaded', setLayout)
    window.addEventListener('load', setLayout) 
    // 새롭게 사이즈가 바뀌면 스크롤 높이 다시 세팅
    window.addEventListener('resize', setLayout)
    
    playAnimation()
})()