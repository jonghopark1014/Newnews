# spring security

FE/BE/INFRA: BE
내용유무: No
생성날짜: 2023년 3월 3일 오후 4:53
작성자: 성복

Spring Security는 크게 인증, 인가 두 분야의 기능들을 제공한다.

## 초기화 과정

- **SecurityFilterChain**을 Bean으로 등록해준다.
    - filterChain에는 spring security에서 사용할 기능들이 명시되어있다.
    - 명시된 기능들에 따라 filter의 구성이 달라진다.
    - filter들을 **WebSecurity**에 전달하게 되고 WebSecurity에서 **FilterChainProxy**를 생성하면서 filter들을 전달(생성자)한다.
    
- **DelegatingFilterProxy**(Servlet filter)
    - 기본적으로 Servlet filter는 bean을 사용할 수 없는 문제가 있다.
    - 따라서 이 filter가 spring security filter를 찾아 사용자의 요청을 위임한다.
        - springSecurityFilterChain 으로 생성된 bean을 찾아 요청을 위임한다.
        - springSecurityFilterChain 으로 생성된 bean이 **FilterChainProxy**이다.
    
- **FilterChainProxy**
    - springSecurityFilterChain 이름으로 생성된다.
    - **DelegatingFilterProxy**로부터 요청을 위임받는다.
    - spring security 초기화 시 생성된 filter들을 관리한다.
    - 사용자의 요청을 filter 순서대로 호출하여 전달한다.
    

req → servlet filter → websecurityconfiguration → filterchainproxy → … → servlet filter → dispatcherservlet → 

## 인증 및 인가

### 인증(Authentication)

- 누구인지 증명하는 것

- principal : 사용자 아이디, User 객체 저장
- credentials : 비밀번호
- authorities : 인증된 사용자의 권한 목록
- details : 인증 부가 정보
- authenticated : 인증 여부

### 인가(Authorization)

- 권한을 증명하는 것

### 인증처리(사용자 인증 폼 요청)

- SecurityContextPersistenceFilter
    - HttpSessionSecurityContextRepository - 처음이라 없음
    - loadContext - 처음이라 없음
    - Create SecurityContext
    
    - 인증 완료 후 사용자에게 알려주기 전
        - Save Authentication in Session
        - Clear SecurityContext
- UsernamePasswordAuthenticationFilter
    - Authentication
    - AuthenticationManager
    - AuthenticationProvider
        - UserDetailsService
    - SecurityContextHolder, SecurityContext, Authentication
- SessionManagementFilter
    - ConcurrentSession - 세션 동시 정책 확인
        - SessionAutehticationException - 현재 사용자 인증 시도 차단
        - Session expireNow - 이전 사용자 세션 만료 설정

### 인증처리 (로그인 후 페이지 이동과 같은 작업들)

- SecurityContextPersistenceFilter
    - HttpSessionSecurityContextRepository
    - loadContext - 세션에 인증객체를 저장한 이력이 남아있다면 세션에서 인증객체를 꺼내어 SecurityContext에 저장한다.
    - 사용자에게 반환하기 전
        - Clear SecurityContext
- ConcurrentSessionFilter
    - 동일한 계정으로 접속을 했는지 판단하는 필터
    - 지금은 혼자이므로 패스
- FilterSecurityInterceptor
    - SecurityContext에 Authentication 객체가 인증된 객체인지 판단
    - 아니라면 인증예외발생
    - 인증이 된 객체이면 이후 인가권한 체크
    

![Untitled](spring%20security%20a69ca07af01341009e9a0a4ba7f480c9/Untitled.png)

![Untitled](spring%20security%20a69ca07af01341009e9a0a4ba7f480c9/Untitled%201.png)

![Untitled](spring%20security%20a69ca07af01341009e9a0a4ba7f480c9/Untitled%202.png)

![Untitled](spring%20security%20a69ca07af01341009e9a0a4ba7f480c9/Untitled%203.png)

![Untitled](spring%20security%20a69ca07af01341009e9a0a4ba7f480c9/Untitled%204.png)

![Untitled](spring%20security%20a69ca07af01341009e9a0a4ba7f480c9/Untitled%205.png)

![Untitled](spring%20security%20a69ca07af01341009e9a0a4ba7f480c9/Untitled%206.png)

![Untitled](spring%20security%20a69ca07af01341009e9a0a4ba7f480c9/Untitled%207.png)