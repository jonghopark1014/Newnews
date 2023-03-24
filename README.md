## 🪐 커밋컨벤션

```
[커밋종류]개발파트_수정내용

ex) 백엔드 자바에서 프로젝트 관련 새로운 기능이 추가되었을 때
git commit -m "FEAT: BE_새로운기능"
```

### 커밋 종류

- **`FEAT`** : 새로운 기능 추가
- **`FIX`** : 버그 수정
- **`DOCS`** : 문서 수정 및 추가
- **`REFACTOR`** : 코드 리팩토링
- **`TEST`** : 테스트 코드, 리팩토링 테스트 코드 추가
- **`CHORE`** : 빌드 task 수정, 패키지 매니저 수정(.gitignore 수정 같은 경우)

### 개발 파트

- **`BE`** : 백엔드 수정
- **`FE`** : 프론트엔드 수정
  dev_FE를 위한 init용 README 파일입니다.

## vite 설치

- [공식문서](https://vitejs-kr.github.io/guide/)
  
  ```
  npm create vite@latest my-vue-app --template vue
  ```
- 템플릿 react 선택
- variant는 TypeScript 선택



## ESLint, Prettier 설정

- ESlint 설치
  
  ```
  npm install eslint --save-dev
  ```

- Prettier 설치
  
  ```
  npm install prettier --save-dev --save-exact
  ```

- Prettier,ESlint 관련 설정 모듈들 설치
  
  ```
  npm install eslint-plugin-prettier eslint-config-prettier --save-dev
  ```
  
  - ESLint 와 Prettier이 충돌할 수 있는 설정들을 비활성화
  
  - ESLint 의 포맷 기능이 아닌 Prettier의 포맷 기능을 사용하게 만들어 줌