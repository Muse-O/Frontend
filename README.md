# 국내 전시 커뮤니티 - Muse-O

![MUSE-O브로셔](https://user-images.githubusercontent.com/51357635/236382171-b6eff0b3-c993-4243-876e-b8ac096f507b.png)
## 🏠 [Home Page](https://museoh.shop/)
### 🏘 [팀 노션 페이지](https://www.notion.so/seungho-white/9-MUSE-O-SA-f7e236258c4f4eb7aa8acff482357f60)
---
## 🗂️ 목차

### 1. [프로젝트 소개](#-프로젝트-소개)

### 2. [주요 기능](#-주요-기능)

### 3. [기술 스텍](#-기술-스택)

### 4. [기술적 의사결정](#-기술적-의사결정선택이유)

### 5. [트러블슈팅](#️-트러블슈팅)

### 6. [팀원 소개](#-팀원-소개)

---
## 🎨  MUSE-O 프로젝트 소개
#### 국내 유명 전시부터 찾기 힘든 개인전까지 볼 수 있는 전시 커뮤니티!
 

전시 홍보와 전시회 정보 제공, 그리고 관람 후기 작성까지 가능한 전시회 커뮤니티 서비스 MUSE-O입니다.

MUSE-O는 전시회를 즐기는, 그리고 멋진 작품을 전시하는 빛나는 사람들을 위해 전시회 기반 플랫폼 서비스를 제공합니다.요즘 핫한 전시회부터 찾아보기 힘들었던 개인전까지 모든 정보를 간편하게 조회할 수 있을 뿐 아니라, 전시를 알리기 어려웠던 작가 분들이 쉽고 빠르고 간편하게 자신의 전시를 알릴 수 있습니다. 나아가 관람한 전시에 대한 감동을 기록하여, 다른 뮤즈들과 소통할 수 있는 대화의 공간을 마련했습니다.

<br/>

- MUSE-O는 전시회를 즐기는 사람들을 위해 전시회 기반 커뮤니티 서비스를 제공합니다.
- 개인전을 홍보하기 힘든 작가들을 위해 개인전을 적극적으로 홍보해줍니다.
- 전시에 방문했던 경험을 사람들과 공유할 수 있고 전시에 대한 리뷰를 공유할 수 있습니다.
- 내 전시에 대한 반응, 내 게시글에 대한 반응을 알람을 통해 확인할 수 있습니다.
- 특정 작가와 대화를 나눌 수 있도록 1:1 메시지를 남길 수 있습니다.
<br/>
<br/>

---
##  🕓 프로젝트 기간

- 2023년 03월 31일 ~ 2023년 05월 12일 
<br/>
<br/>

---
## 📣 주요 기능

- 요즘 핫-한 전시부터 찾기 힘든 개인전까지! 모든 정보를 **배너**와 **검색**을 통해 한눈에 볼 수 있어요!
- 전시 마케팅? 걱정 노노! MUSE-O에서 **전시 작성**을 통해 자신의 전시를 홍보하세요!
- 관람한 전시는 어떠셨나요? **아트그램**에서 나의 감상을 남겨보고 다른사람들과 소통해요!
- **마이페이지**에서 내가 찜해놓았던 **전시.** 
내가 좋아요한 **아트그램.** 
나의 글에 누가 좋아요를 눌렀다면 **알림**을 통해 확인하세요!
- 이 작가 혹은 유저와 대화해보고 싶나요? **메시지**를 통해 1:1로 대화를 나눠보세요!

### 페이지별 기능

<details>
<summary>메인 페이지와 헤더</summary>

<br/>

- 5개의 아티글에 대한 소개
    - 4개는 전시데이터에 대한 카테고리별 조회
        - 개인전홍보-6개, 최신전시-10개, Top10-10개, 예상전시-10개
    - 1개의 아트그램 데이터에 대한 1주일 간의 인기별 조회(6개)
    - 슬라이더를 다양하게 활용하였음
- 헤더(좌측 네비게이션바)
    - 라우터의 위치에 따른 위치변경에 따른 상황별 CSS 적용

</details>

<details>
<summary>통합검색</summary>

<br/>

- 헤더(좌측 네비게이션)에 있는 input 태그를 통한 검색기능 구현
- input태그 진입 시, 인기 게시글과 최근 검색을 통해 검색한 게시글에 대한 사용자별 정보 조회 제공
    - 모든 유저가 검색후 클릭한 게시글을 db에 저장하여 인기게시글로 10개 정렬해서 전달
    - 현재 로그인한 유저가 검색후 최근 본 게시글 기준으로 10개를 정렬해서 전달
- 검색 단어검색, 초성검색(정규식)
- 전시검색 : 전시제목, 내용, 시작일, 지역 조회
- 아트그램 : 게시글제목, 게시글 내용 조회
- 사용자 :  email, nickname 조회
- 통합검색 탭에서의 전시/아트그램/유저 탭 설정
    - 전시는 전시 상세보기로 이동
    - 아트그램은 통합검색에서 상세모달로 연결 및 검색탭에서 좋아요/스크랩 설정 가능
    - 유저는 현재 검색만 가능

</details>

<details>
<summary>전시</summary>

<br/>

- 전시 리스트
    - 전시회 where를 이용해서 장소 상세 시군구 별 검색 가능
    - 전시회 category를 이용해서 카테고리별 검색가능
    - 전시회 검색을 이용해서 전시회 제목 검색 가능
    - 전시회 top10 hashtag를 불러와서 검색 가능
    - 전시회 페이지네이션으로 무한스크롤 구현
- 전시회 작성,수정
    - S3 이미지 업로드를 활용하였으며, 최대 10장까지로 제한하였음
    - 전시회 관련 정보를 online,offline을 따로 입력값을 받음
    - drag&drop 형태로 이미지 업로드 가능
    - 작성자는 기존에 작성한 전시회 정보 수정가능
- 전시회 상세
    - 전시회 상세정보 조회 가능
    - 전시회 스크립 으로 저장하기 가능
    - 전시회 좋아요 기능
    - 전시회 리뷰,헤시테그, 별점 작성 가능
    - 전시회 리뷰 삭제 가능

</details>

<details>
<summary>아트그램</summary>

<br/>

- 아트그램 조회
    - DB에 저장된 아트그램에 대한 간략한 조회
    - 아트그램에서의 좋아요, 찜하기 및 요소의 유저반응을 숫자로 보여주기
    - 사용자별 접근에 따라 좋아요/찜하기 노출설정
    - 오프셋기반 페이지네이션으로 무한스크롤을 구현
- 아트그램 상세 조회
    - 아트그램 클릭 시 상세모달에서의 댓글(CRUD), 답글(CRD), 좋아요, 찜하기 기능
    - 댓글과 답글의 삭제는 softDelete를 사용해 논리삭제를 해줌
    - 이미지에 대한 슬라이더 구현
    - 기록한 날짜에 대한 노출설정(현재기준 방금전, 2분후부터 분 단위/시간 단위/월 단위/연 단위)
    - 사용자별 접근에 따라 좋아요/찜하기/삭제/수정/신고 기능에 대한 노출설정.
- 아트그램 작성
    - S3 이미지 업로드를 활용하였으며, 최대 6장까지로 제한하였음
    - 유효성검사와 참조(Ref) 설정 및 해쉬태그 입력

</details>

<details>
<summary>마이페이지</summary>

<br/>

- 프로필 사진, 닉네임, 소개글 조회 및 수정 기능
- 좋아요, 스크랩한 전시/아트그램 게시물을 좋아요와 스크랩한 순으로, 작성한 게시글은 최신순으로 조회
- 전시/아트그램 탭 메뉴에서 각각 조회 가능 및 페이지네이션 기능
- 작가 권한 신청 기능
- 알림목록 조회
  - 내가 작성한 아트그램에 좋아요와 댓글이 작성 되었을 때
  - 내가 작성한 아트그램 댓글에 답글이 달릴 때
  - 내가 작성한 전시 게시글에 후기가 작성될 때<br/>
    → 회원가입 시 id별로 stream key 생성<br/>
    → 알림 저장 시 알림 받을 회원의 스트림에 생성시간 타임스탬프가 id인 엔트리를 추가하고 XREADGROUP 호출하여 consumer(알림받을 회원)에게 할당<br/>
    → 알림 조회시 XACK 처리하고 알림 목록 제공 시 XPENDING으로 읽지 않은 알림과 읽은 알림을 구분한 데이터를 제공

</details>

---

## 💻 기술 스택 
<img width="850" alt="KakaoTalk_20230506_195531355" src="https://user-images.githubusercontent.com/105100315/236620098-ca30c44f-fd9c-439d-bbe1-1a021232d053.png">

### Front End


![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
![ReactQuery](https://img.shields.io/badge/react--querty-ff4154.svg?style=for-the-badge&logo=react-query&logoColor=white) ![Recoil](https://img.shields.io/badge/Recoil-007af4.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1NS4yMSA2MjMuOTEiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDp3aGl0ZX08L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im03NC42MiAyNzcuNDYgMS4yNC0uMTMgMzQuNzgtMy4yOC01My40Ny01OC42NkE5Ni40NyA5Ni40NyAwIDAgMSAzMiAxNTAuM0gzYTEyNS4zIDEyNS4zIDAgMCAwIDMyLjggODQuNTdaTTE3Ny4xMyAzNDdsLTM2IDMuNCA1My4zMiA1OC41MUE5Ni40MSA5Ni40MSAwIDAgMSAyMTkuNjMgNDc0aDI4LjkyYTEyNS4yOCAxMjUuMjggMCAwIDAtMzIuNzYtODQuNTdaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjUzLjY5IDIzMS42OGMtNi4zMy0zMS4zLTMwLjg5LTU0LjA5LTYyLjU3LTU4LjA3bC02LjM1LS43OWE0OS42MSA0OS42MSAwIDAgMS00My4zNS00OS4xM3YtMjBhNTIuNzUgNTIuNzUgMCAxIDAtMjguOTEtLjM2djIwLjM4YTc4LjU2IDc4LjU2IDAgMCAwIDY4LjY1IDc3LjgybDYuMzYuOGMyMy4yNCAyLjkyIDM0Ljc4IDIwIDM3LjgzIDM1LjFzLS45MyAzNS4zMi0yMS4yMiA0N2E3My44MSA3My44MSAwIDAgMS0zMC4wNiA5LjYybC05NS42NiA5YTEwMi40NSAxMDIuNDUgMCAwIDAtNDEuOCAxMy4zOEM5IDMzMi40NS00LjgxIDM2MyAxLjUyIDM5NC4yOXMzMC44OSA1NC4wOCA2Mi41NyA1OC4wNmw2LjM1LjhhNDkuNiA0OS42IDAgMCAxIDQzLjM1IDQ5LjEydjE4YTUyLjc1IDUyLjc1IDAgMSAwIDI4LjkxLjI2di0xOC4yNmE3OC41NSA3OC41NSAwIDAgMC02OC42NS03Ny44MWwtNi4zNi0uOGMtMjMuMjQtMi45Mi0zNC43OC0yMC4wNS0zNy44My0zNS4xMXMuOTMtMzUuMzIgMjEuMjItNDdhNzMuNjggNzMuNjggMCAwIDEgMzAuMDYtOS42M2w5NS42Ni05YTEwMi40NSAxMDIuNDUgMCAwIDAgNDEuOC0xMy4zOGMyNy42NS0xNi4wMiA0MS40LTQ2LjU0IDM1LjA5LTc3Ljg2WiIvPjwvc3ZnPg==&logoColor=white) 
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![AWS S3 badge](https://img.shields.io/badge/AWS-S3-orange?style=for-the-badge&logo=amazon-aws&logoColor=white)
[![Vercel](https://img.shields.io/badge/-Vercel-black?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![axios](https://img.shields.io/badge/-axios-1572B6?style=flat-square&logo=axios&logoColor=white)](https://axios-http.com/)
![React Router DOM badge](https://img.shields.io/badge/-React%20Router%20DOM-CA4245?style=flat-square&logo=react-router&logoColor=white)
![Socket.IO badge](https://img.shields.io/badge/-Socket.IO-010101?style=flat-square&logo=socket.io&logoColor=white)

<br />

### Dev tools
<div>
  <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=GITHUB&logoColor=white"> 
  <img src="https://img.shields.io/badge/VISUAL STUDIO CODE-007ACC?style=for-the-badge&logo=VISUAL STUDIO CODE&logoColor=white"> 
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> 
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> 
   <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=FIGMA&logoColor=white">
   <img alt="Slack" src="https://img.shields.io/badge/Slack-4A154B.svg?logo=slack&logoColor=white"/>

</div>


<br/>
<br/>

---
## 🛠 기술적 의사결정([선택이유](https://www.notion.so/seungho-white/MUSE-O-FE-84058a388bad4e44b375e7b3d0cdc41a?pvs=4))

| 사용기술 | 사용이유 |
| --- | --- |
| ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  | Facebook에서 개발되어 안정성과 신뢰도가 높으며, 많은 개발자들이 사용하고 있어 자료 접근이 용이합니다. 또한 React는 가상 DOM을 사용하여 UI를 효율적으로 렌더링하므로, 사용자 경험과 성능이 뛰어납니다. |
|[![Vercel](https://img.shields.io/badge/-Vercel-black?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/) | 최근의 동향은 통신에 있어서 데이터를 보호해야 한다는 측면이 우세합니다. 이에 있어서 저희는 HTTP보다 보안성이 강화된 HTTPS로 프로젝트를 호스팅하기로 결정했고, 비용적인 측면과 환경설정에 있어서 안정성이 우수한 Vercel을 통해서 배포하기로 하였습니다. 나아가 Vercel은 Github과의 연결성으로 인해서 Git관리 체계에서 원격 레포지토리에 병합하면 자동 배포를 지원한다는 측면이 있기에 채택하였습니다. |
| ![AWS S3 badge](https://img.shields.io/badge/AWS-S3-orange?style=for-the-badge&logo=amazon-aws&logoColor=white)| 클라이언트에서 S3에 이미지를 저장하게 되면 서버 부담이 줄어듭니다. 이미지 파일을 업로드하기 위한 네트워크 요청 또한 줄어들기에 이미지 업로드 속도가 빨라지는 장점이 있습니다. |

## 🛠 라이브러리([선택이유](https://www.notion.so/seungho-white/MUSE-O-FE-778e1d26d1d34c5185641ae62ef727f8?pvs=4))

라이브러리 | 설명
---|:---:
![@tanstack/react-query badge](https://img.shields.io/badge/@tanstack/react--query-v4.28.0-00B0FF?style=flat-square&logo=react&logoColor=white) | 전역 상태 관리 부분에서, 비동기 처리에 최적화 된 라이브러리 
![@aws-sdk/client-s3 badge](https://img.shields.io/badge/@aws--sdk/client--s3-v3.306.0-232F3E?style=flat-square&logo=amazon-aws&logoColor=white) | S3로 이미지를 업로드 하기 위한 라이브러리
![socket.io-client badge](https://img.shields.io/badge/socket.io--client-v4.6.1-010101?style=flat-square&logo=socket.io&logoColor=white) | 뭐지
[![axios](https://img.shields.io/badge/axios-1.3.4-blue)](https://www.npmjs.com/package/axios) | HTTP 요청을 간편하게 처리하고, Promise 기반 비동기 처리가 용이하며 interceptors를 통해 통신 전후의 설정의 간편성을 제공하는 통신 라이브러리 
![styled-components badge](https://img.shields.io/badge/styled--components-v5.3.9-DB7093?style=flat-square) | 대표적인 CSS-in-JS 라이브러리로, 많은 사용자가 선택한 안정적인 스타일 라이브러리
![styled-reset badge](https://img.shields.io/badge/styled--reset-v4.4.5-282c34?style=flat-square) | 브라우저마다 상이한 스타일에 대하여 대응하기 위한 크로스 브라우징 라이브러리
![universal-cookie badge](https://img.shields.io/badge/universal--cookie-v4.0.4-F6BD60?style=flat-square) | 쿠키 값 설정을 쉽게 관리하도록 도와주는 라이브러리
![jwt-decode badge](https://img.shields.io/badge/jwt--decode-v3.1.2-000000?style=flat-square) | 암호화 되어있는 JWT를 해독하는 라이브러리
![Day.js badge](https://img.shields.io/badge/Day.js-v1.11.7-DA5C3F?style=flat-square&logo=javascript&logoColor=white)| JS에 내장된 Date 객체를 보다 직관적으로 format 할 수 있어, 날짜에 대한 관리가 간편한 라이브러리
![react-daum-postcode badge](https://img.shields.io/badge/react--daum--postcode-v3.1.1-ffcc02?style=flat-square&logo=react&logoColor=white)  | 카카오 주소검색 api를 사용하기 위한 라이브러리
![react-dropzone badge](https://img.shields.io/badge/react--dropzone-v14.2.3-6c757d?style=flat-square&logo=react&logoColor=white) | 파일 입력에 있어서 마우스를 활용한 입력을 간편하게 지원하고, 미리보기에 대한 설정도 쉽게 설정할 수 있는 라이브러리
![react-icons badge](https://img.shields.io/badge/react--icons-v4.8.0-00bfff?style=flat-square&logo=react&logoColor=white)  | 리액트에서 아이콘을 사용할 때 호환성 부분에서 가장 적합한 라이브러리
![react-router-dom badge](https://img.shields.io/badge/react--router--dom-v6.9.0-CA4245?style=flat-square&logo=react-router&logoColor=white) | SPA 기반인 React에서 원활한 라우팅을 위한 라이브러리 
![react-slick badge](https://img.shields.io/badge/react--slick-v0.29.0-FF4088?style=flat-square&logo=react&logoColor=white) | 슬라이더를 위한 라이브러리 
![slick-carousel badge](https://img.shields.io/badge/slick--carousel-v1.8.1-FF4088?style=flat-square) | react-slick의 스타일을 위한 라이브러리 
![recoil badge](https://img.shields.io/badge/recoil-v0.7.7-2088FF?style=flat-square&logo=react&logoColor=white) | 전역 상태 관리 부분에서, 비교적 소규모 프로젝트에서 사용하기애 간단하며 리액트환경에 친숙한 Hook과 유사한 조작을 통해 쉽게 데이터의 상태를 관리할 수 있는 라이브러리  
![sweetalert2 badge](https://img.shields.io/badge/sweetalert2-v11.7.3-32a852?style=flat-square) | 경고 또는 확인같은 모달 대화 상자를 생성해주는 팝업 라이브러리
<br/>
<br/>

---

## 🎯 트러블슈팅

**[FE] 전체 트러블슈팅**
<details>
<summary>이미지에 대한 고민</summary>

- formData 객체를 활용한 서버전달, 서버에서의 이미지처리 탈피

- S3bucket 으로 클라이언트에서 직접 이미지 업로드, 이로인한 이미지처리속도 향상 → 서버의 데이터처리의 빠른 실행

- S3bucket 에 대한 환경변수를 프론트엔드에서 보관하고 있고, 빌드파일에 노출된다는 잠재적 위험성이 있음

- CloudFlare가 비용적인 측면과 환경변수적 측면에서 고려되었지만, formData를 수에 대한 url을 할당받고, 할당url에 formData를 전달하고, 업로드된 url을 전달받아서, 이를 서버로 보낸다는 4번의 과정이 수반됨, 처리속도적인 측면에서 프론트엔드에서 이미지를 업로드하는 이점이 없음.

- 현재 S3bucket 로 이미지를 프론트엔드 개발에서 업로드 하는 방향을 유지하고 있음.
</details>

<br/>
<br/>

**[FE] 김재란**
<details>
<summary>유효성검사 로직 개선</summary>

<br/>

**`주제`**

회원가입 페이지나 로그인 페이지에서 input 아래에 유효성검사 내용(경고 메시지)를 어떻게 보여주는 것이 효율적인가

<br/>

**`문제 인지(처음 작성한 방식)`**

div 태그 안에 함수를 넣어서 결과를 출력해주는 방식

```jsx
const emailRegExp = /^[a-zA-Z0-9+\-\\_.]+@[a-zA-Z0-9\\-]+\.[a-zA-Z0-9\-.]+$/;

  //이메일 입력값에 따른 검사값 출력
  const emailValidation = () => {
    if (registerInfo.email === "") {
      return "";
    } else if (!emailRegExp.test(registerInfo.email)) {
      return "이메일 형식이 올바르지 않습니다.";
    } else {
      return "";
    }
  };

return
 <div>{emailValidation()}</div>
```

→ 이렇게 작성하면 `emailValidation` 함수가 제대로 작동하지 않거나, 값이 변경되지 않을 경우 함수가 다시 호출되지 않게되어 div 안의 경고 메시지가 변경되지 않거나 잘못 보일 가능성이 높다.

<br/>

**`해결(이전보다 나아진 방식)`**

찾아보니 유효성검사 라이브러리가 있었으나, 직접 구현해보고자 하는 열망이 들었다.

그래서 다른 사람들이 작성한 코드를 살펴보고 React에서 제공하는 주요 Hook중 useState에 보여줄 메시지 값을 상태에 따라 다양하게 담아 div태그에 넣는 방식을 사용했다.

그리고 useEffect를 사용하여 변화가 일어날때마다 렌더링해주었다.

아래는 이메일 검사 작성 일부다.

```jsx
const [emailMsg, setEmailMsg] = useState("");

const loginHandler = e => {
    e.preventDefault();
    if (!loginInfo.email) {
      setEmailMsg("이메일을 입력해주세요.");
    } else if (!loginInfo.password) {
      setPwMsg("비밀번호를 입력해주세요.");
    } else {
      login(loginInfo);
    }
  };

//마운트, 빈 값이 아닐경우, 정규식
  useEffect(() => {
    if (registerInfo.email === "") {
      setEmailMsg("");
    } else if (!emailRegExp.test(registerInfo.email)) {
      setEmailMsg("이메일 형식이 맞지 않습니다.");
    } else {
      setEmailMsg("");
    }
  }, [registerInfo.email]);

//return
<div>{emailMsg}</div>
```

이렇게 변경하여 React의 주요 Hook을 사용함으로, React에서 상태를 관리하고 이를 활용해서 동적으로 화면을 업데이트할 수 있게 변경하였다.

<br/>

**`그 이후`**

이전보다 나아진 방식이라고 생각하긴 하나, useEffect를 사용하여 변화를 감지하여 보여주는것이 최선인지에 대해 다시 고민하고있다. useEffect 역시 React의 주요 Hook으로 좋은 기능이지만, 좁은 레이아웃 내에서 많은 정보를 입력하고 확인받는 회원가입 페이지에서 사용자가 입력하거나 특정 버튼을 누를때마다 감지되는것은 불필요한 렌더링이 있을 수 있으며 이는 곧 성능 저하로 이어지기 때문이다.

유효성검사 라이브러리를 자세히 살펴보며 어떤 방식으로 구현된 것인지, 혹시 지금 구현한 useEffect보다 좋은 방법이 있는지 보고 또다시 개선해보려 한다.

</details>

<details>
<summary>로그인 후 마이페이지 접속시 프로필 미출력</summary>

<br/>

**`문제`**

로그인 후 마이페이지에 접속하면 유저 프로필이 출력되지 않는 현상

<br/>

**`원인`**

마이페이지로 가면 GET 요청을 함 → Network의 headers를 확인한 결과  `Authorization Bearer undefined`로 요청중인 것을 확인

<br/>

**`해결`**

1. 로그인 하기 전, 메인페이지 띄웠을 때 = undefined

2. 로그인 후 쿠키에는 토큰이 저장되어있음

3. 로그인 후 쿠키에 저장시킨 토큰을 get해오는 로직이 없음

⇒ undefined일 경우 interceptors를 사용하여 Cookie에 있는 Token을 다시 get하여 headers에 담아 요청하며 해결

```jsx
// 토큰없이 보낼때
export const apis = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// 토큰 넣어서 보낼때
export const apis_token = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// 해결 *Bearer undefined 처리*
apis_token.interceptors.request.use(config => {
  if (config.headers.Authorization === "Bearer undefined") {
    const token = cookies.get("access_token");
    config.headers.Authorization = `Bearer ${token}`;
		}
    return config;
});
```


</details>

<br/>
<br/>

**[FE] 박영찬**
<details>
<summary>검색어의 상태를 다루는 부분(전역상태관리의 필요성과 리액트쿼리의 쿼리키)</summary>

<br/>

- 프로젝트환경 : 검색어가 입력되는 환경(각각의 **라우터의 헤더컴포넌트**에서 입력 → **검색페이지**로 이동)

- 검색어통신방법 : RESTfulAPI 통신 가운데 GET 방식으로 전달하되, queryString으로 해당요소의 값을 전달

<br/>
<br/>

- 문제(1) 검색어의 상태유지
    - 검색어를 전달할 GET메서드의 호출위치(커스텀 훅으로 제작)
        - **GET메서드에 대한 커스텀훅**
            
            ```jsx
            export const useUnifiedSearch = () => {
              const searchWord = useRecoilValue(searchWordState);
              const queryClient = useQueryClient();
              
              const [, setData] = useRecoilState(searchDataState);
              useHeaderState()
              useEffect(() => {
                queryClient.invalidateQueries([keys.GET_UNIFIEDSEARCH, searchWord]);
              }, [searchWord]);
            
              const { isLoading, isError } = useQuery({
                queryKey: [keys.GET_UNIFIEDSEARCH, searchWord],
                queryFn: async () => {
                  const response = await apis_token.get(`/search?searchText=${searchWord}`);
                  return response.data.search;
                },
                refetchOnWindowFocus: false,
                retry: 1,
                onSuccess: (data) => {
                  setData(data);
                },
                onError: (e) => {
                  console.log(e.message);
                },
              });
            
              return { isLoading, isError };
            };
            ```
            
    - 상하위구분이 없는 각각의 컴포넌트(라우터)의 검색어에 대한 상태관리
    - 새로운 검색어가 입력되었을 때의  GET메서드의 호출
    
    해당 문제는 전역에서 관리할 검색어 상태에 대한 이슈를 발생시켰다. React-query를 통해서 비동기적 데이터 상태관리를 하고 있었던 프로젝트의 환경에서는 전역상태관리에 대응하지 못했다.  그 결과 전역에서 관리해야할 코드를 작성해야 했다. 이 부분에 있어서 (상태관리관련 의사결정 - contextAPI, Redux, Recoil) 고민을 했고, Recoil를 도입하였다. 검색어를 입력하고 엔터를 입력하면 form태그의 onSubmit 이 실행되는데, 이때 공백을 제거한 값을 생성한 atoms에 대입시켰다. 그후 라우팅을 통해 검색페이지로 넘어가, GET 메서드가 실행되도록 설정하였다.

<br/>
<br/>

- 문제(2) 변경된 검색어에 대한 useQuery의 고유키에 대한 설정 부분의 이슈
    
    해당 이슈는 이전에 대댓글에 대한 조회와 invalidateQueries()를 실행하면서 겪었던 동일한 문제이다. useQuery의 고유키는 고유해야 한다. 이전 사례에서는 고유한쿼리키+게시글id+댓글id로 조합한 키값으로 각각의 대댓글에 대한 입력과 무효화가 가능하도록 접근했다. 이번에도 동일했다.  `keys.GET_UNIFIEDSEARCH` 휴먼에러를 방지하고자 사전에 입력한 설정을 새롭게 생성한 검색어의 쿼리키로 사용하는 것은 불가한 일이기 때문이다. [1] 이에 대해서 먼저 useQuery를 선언할 때 사전에 입력한 설정값+입력된 검색어의 조합으로 된 쿼리키를 생성했다. [2] 그리고 신규입력이야 되겠지만, 새롭게 입력된 검색어에 대해서 대응하기 위해서 useEffect를 통해서 중앙에서 관리중인 검색어의 상태가 변경될 때마다 무효화를 선언함으로 해당 GET이 동작하도록 설정하여 문제에 접근했다. 이 과정에서 React-query가 다루는 상태의 관리(데이터 캐싱)와 이를 가능하게 하는 쿼리키의 중요성에 대해서 깊은 공감과 경험을 할 수 있었다.

<br/>
<br/>

- 문제(3) - GET요청에 있어 조건부 비동기 통신 설정
    
    **컴포넌트 마운트와 함께 실행되는 GET메서드에 대한 부분**, 프로젝트에서 데이터의 상태를 관리하는 기술결정으로 리액트쿼리를 채택하였다. 문제는 데이터를 패칭해오는 과정에서 GET요청은 컴포넌트가 마운트될 때 무조건 실행된다는 점이었다. 그러나 이러한 통신은 불필요한 API 호출을 야기한다. 이번 프로젝트에서는 3개의 경우에서 조건부 GET메서드의 실행이 요구되었다. [1] 헤더의 프로필상태이고, [2] 검색어의 인기 게시글 정보 받아오기, [3] 사용자별 최근에 검색어를 통해 검색한 게시글 정보 받아오기 였다. 컴포넌트가 마운트되었을 때 실행되면 안되었고 특정한 조건이 있을 때에만 실행시키고 싶었다. 
    문제 해결 과정은 ChatGPT였다. 물론 공식문서([https://tanstack.com/query/v4/docs/react/reference/useQuery](https://tanstack.com/query/v4/docs/react/reference/useQuery))에서 config에 대한 설정을 읽어보았다면 되었겠지만, 오랜 시간이 걸렸을 것이다.  config 가운데 enabled 라는 설정값이 있다. 이를 통해서 조건에 부합되면 GET메서드를 실행시킬 수 있는 상황을 제어할 수 있었다. 여기서 비동기통신 전용의 데이터 상태관리를 표망한 리액트쿼리의 우수성을 공감할 수 있었다. 이를 활용해서 아래와 같이 전역에서 관리 중인 상태의 값을 구독했고 해당 상태의 값이 존재할 때에만 GET메서드가 실행되도록 코드를 설정함으로 목적에 따른 개발을 실시 할 수 있었다. 이번에 배운 것은 역시 공식문서를 꼼꼼히 읽어보라는 권면은 언제나 옳다는 것이다. 물론 모든 라이브러리들에 원하는 기능이 존재하는 것은 아니지만, 불가능한지와 가능한지의 여부는 살펴볼 수 있게 되는 경험을 가질 수 있기 때문이다. 
    
    ```jsx
    export const useSearchRecent = (searchWindow) => {
      const { isLoading, isError, data } = useQuery({
        queryKey: keys.GET_UNIFIEDSEARCHRECENT,
        queryFn: async () => {
          const response = await apis_token.get("/search/recent");
          return response.data.recentHistory;
        },
        enabled: searchWindow,
        retry: 1,
        refetchOnWindowFocus: false,
        onError: (e) => {
          console.log("error", e.message);
        },
      });
      return { isLoading, isError, data };
    };
    ```
</details>

<details>
<summary>뷰파트에 대한 이해의 측면(InterserctionObserver, 이전라우터의 스크롤 위치 기억)</summary>

<br/>

**문제발생(1) InterserctionObserver에 대한 이해부족에서 발생된 무한스크롤 기능장애**
- 문제를 이해하기 위한 공부(**MDN문서**)
    
    MDN문서에 따르면 **Intersection Observer API**는 감시하고자 하는 요소가 다른 요소(viewport)에 들어가거나 나갈때 또는 요청한 부분만큼 두 요소의 교차부분이 변경될 때 마다 실행될 콜백 함수를 등록할 수 있게 한다. 비록 정확히 몇 픽셀이 겹쳐졌고 어떠한 픽셀이 겹쳐졌는지 Intersection Observer API 가 알려줄 수 없지만 N% 정도 교차할 때를 기점으로 동작하는 원리이다. 
    
    ```jsx
    const observer = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            // 수행할 동작을 기록하는 공간
          }
        }, { threshold: 1 });
    ```
    
    **IntersectionObserver** 의 기능을 결정하는 것은 `threshold: 1`설정한 설정값이다. 0-1에 따라서 교차범위를 지정할 수 있다. 정확한 이해가 아닐 수도 있지만. 0-100%를 0-1 단계로 값을 축소했다는 느낌을 받았다. 즉 보여지는 뷰파트에 이전에 있었던 요소가 위로 올라가고, 그 다음으로 등장하는 태그에 해당 기능이 설정되어 있으면, 기능이 동작하는 원리이다. 
    
    ```jsx
    function Test() {
      const ref = useRef(null);
    
      useEffect(() => {
        const observer = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            alert('안녕');
          }
        }, { threshold: 1 });
    
        if (ref.current) {
          observer.observe(ref.current);
        }
    
        return () => {
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        };
      }, []);
    
      return (
    	<div>
    		<div style={{ height: "100vh" }}>위는 빈 화면입니다.</div>
     		<div ref={ref} style={{ height: "100vh" }}>
       			 여기에 스크롤을 내리면 "안녕"이라는 알림이 뜹니다.
            </div>
      </div>
      );
    }
    
    export default Test;
    ```
    
    **useRef(null)** 는 **IntersectionObserver**가 동작할 태그를 참조하기 위해 선언된다. **useEffect**는 컴포넌트가 마운드될 때 관찰을 시작하기 위한 선언과, 언마운트 되었을 때 관찰을 중지하기 위한 선언의 기능을 수행한다. 참조와 관찰의 기능이 동작될 때,  **IntersectionObserver**는 동작을 실행한다.

<br/>
<br/>

- **문제(1) - "threshold: 값에 대한 이해부족"**

  "threshold: 값에 대한 이해부족"으로 인해 무한 스크롤 기능이 개발목적에 대응하여 동작하지 않는 이슈가 있었다. 이를 해결하기 위해 MDN 공식문서를 참조하였고, 적정한  threshold 값을 설정해야 한다는 이해를 할 수 있었습니다. 

<br/>
<br/>

- **문제(2) - "같은컴포넌트에서 새로고침시 동작하지 않는 이슈"**

  **라우팅변경시에는 동작, 하지만 같은컴포넌트에서 새로고침시 동작하지 않는 이슈**로 참조(useRef)를 걸었던 대상에 대한 관찰과 관찰해제가 동작하지 않는 이유가 발생했다. 이를 해결하기 위해 **MDN 공식문서**를 기반으로 작성한 **IntersectionObserver**에 대한 코드를 살펴보았지만 특별한 이상은 발견할 수 없었다. 그래서 동일한 컴포넌트를 재작성하면서 혹시라도 내가 놓친 부분이 있는지 살펴보고자 하였고, 재작성을 완료하고(동일한 코드) yarn start를 했을 때 문제가 해결되었다. 추후의 공부에서 혹시 모를 이유를 생각해보았다. 이는 새로고침시 useEffect의 cleanUp 에 문제가 생겼던 것으로 판단된다. **IntersectionObserver**는 새롭게 생성되었지만, useRef가 참고하는 대상에 대한 문제가 발생했던 것은 아닌가이다. 이를 해결하는 방법으로는 useEffect의 의존성 배열을 견고하게 설정하는 것이 될 수도 있을 것이다. [ref]를 추가하여, ref가 변경된 경우에도 대응하도록 한다면 보다 견고한 로직을 구현할 수 있었을 것이다. 이후에 같은 문제가 발생된다면 이러한 접근 방법도 고려해보려 한다. 
    
  이 문제를 해결하며, 해결과정은 공부한 기간에 비해서 단촐하였다. 그렇지만 이 과정에서 **IntersectionObserver**에 대한 이해를 높일 수 있었으며, 이를 통해 동적으로 화면을 구성하는 이점을 발생시킬 수 있다는 것을 깨달았다. 또한, 상시 관찰을 하는 window.addEventListener()와 getBoundingClientRect()로 구현한 이벤트의 문제점(관찰의 피로도 등)과 비교하여, IntersectionObserver의 상대적인 이점을 확인할 수 있었다.

<br/>
<br/>

**문제발생(2) SPA에 있어서 이전 라우터의 스크롤 위치를 기억하고 있는 부분의 문제 발생**

- 문제 - "**SPA로 구현된 리액트에서의 라우팅 시 발생되는 스크롤 이슈**"
    
    SPA(Single Page Application)을 구현하는 리액트는 페이지 전체를 새로 로드하지 않고, 가상DOM으로 변경된 부분만 컴포넌트를 갈아끼운다. 이런 SPA가 주는 이점은 새로고침이 없어 화면 깜박임이 없다는 것과, CSR을 구현하기에 초기로딩은 느릴 수 있지만, 로딩 후에는 빠른 화면구성이 가능하다는 점이다. 그러나, 이러한 SPA는 일반적으로 이전 페이지의 상태를 유지한다는 점이며, 그 결과 이전 페이지의 스크롤 위치를 기억하고 이를 유지한다는 것이다. 이 문제의 해결을 위해서는 라우터가 변경되었을 때 스크롤의 위치를 초기화 되어야 한다. 
    
    ```jsx
    useEffect(() => {
        window.scrollTo(0, 0); // SPA문제의 한계, 이전 라우터의 스크롤을 기억하고 있는 문제를 해결하고자 함
    }, [])
    ```
    
    문제해결은 새로운 라우터에 대한 컴포넌트가 마운트 되었을 때, 윈도우 객체의 scrollTo 메서드를 통해서 초기화함으로 문제를 해결하였다. 이 과정에서 CSR과 SPA 방식으로 동작하는 리액트 라이브러리에 대한 이해를 조금 심층시킬 수 있었다. react-router-dom 라이브러리의 한계점에 대해서 살펴볼 수 있었다. 해당 라이브러리는 스크롤 위치 초기화와 같은 동작은 제어하지 못한다는 점이다. 물론 useLocation()를 사용해서, pathname 을 획득하고, 이 때마다 useEffect를 동작시켜 문제를 해결할 수 있기하다. 아래의 코드가 바로 이를 적용한 코드이다.이를 Router.js에서 import 함으로 문제를 해결했다. 
    
    ```jsx
    import { useEffect } from "react";
    import { useLocation } from "react-router-dom";
    
    export default function ScrollToTop() {
      const { pathname } = useLocation();
    
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
    
      return null;
    }
    ```

</details>

<br/>
<br/>

**[FE] 백승호**
<details>
<summary>useInfiniteQuery 사용전 무한스크롤 구현하기</summary>

<br/>


<br/>

`상황`

useInfiniteyQuery를 알아보기전 무한스크롤 구현.

`useInfiniteQuery  사용전` 

1.state

```jsx
	const [list, setList] = useState([]); //받아온 데이터를 list에 저장
  const [page, setPage] = useState(10); //데이터를 불러올 페이지, 즉 순번을 저장
  const [load, setLoad] = useState(1);  //loading중인지 아닌지 설정하는 state
  const preventRef = useRef(true);//이전값이 있는지 판단
  const obsRef = useRef(null);//관찰을 위한 옵져버
  const endRef = useRef(true);//마지막 값이 있을때 사용
```

2.첫 랜더링

옵저버를 생성

```jsx
  //*컴포넌트가 마운트 될 때  옵저버를 생성하고 언마운트될 경우 옵저버를 해제
  useEffect(() => {
    getFirstItem();//처음 데이터를 불러오는 api통신
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, [])
```

초반에 값을 받아옴

```jsx
  //*처음 받아오는값
  const getFirstItem = useCallback(async () => {
    const res = await apis.get("/exhibition"); //이런 param 값없이 요청할 시 BE에서 10개를 보내준다.
    endRef.current = res.data.paginationInfo.hasNextPage;
    if (res.data) {
      setList((prev) => [...prev, ...res.data.exhibitionList.rows]);
      preventRef.current = true;
    } else {
      console.log(res);
    }
  }, []);
```

3.element 확인 시사용되는 함수, 
element를 확인될때 page를 올림 isIntersecting, preventRef,endRef 가 사용된다. 즉 처음값을 받아왔고 받은 값들중 마지막 페이지가 아니면 실행한다.

```jsx
  //*element를 확인될때 page를 올림
  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && preventRef.current && endRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);// 1개씩 요청
    }
  };
```

페이지가 올라갈때마다 `getItem`실행.

```jsx
  //*페이지가 변경될때마다 실행
  useEffect(() => {
    getItem();
  }, [page]);

```

4.page변경시 사용되는 함수
getItem 함수 

```jsx
  const getItem = useCallback(async () => {
		//로딩중이다
    setLoad(true);
    const res = await apis.get(`/exhibition?limit=1&offset=${page}`);
    endRef.current = res.data.paginationInfo.hasNextPage;//서버에서 마지막페이지를 알려줌
    if (res.data) {
      setList((prev) => [...prev, { ...res.data.exhibitionList.rows[0] }]);
			//값을 추가 시킨다.
      preventRef.current = true;
    } else {
      console.log(res);
    }
		//로딩이 끝났다.
    setLoad(false);
  }, [page]);
```

데이터를 받아와서 list파일에 넣어준다. 

순서

처음값을 받아온다→값을 list에 넣는다 받아온 상태다→그다음부터 obs가 관찰되면 page를 변경→page가 변경 될 때마다 getItem 함수 실행→list에다가 값 저장,

---

`문제`

페이지를 가지고 오는 순서 문제로  처음 받아오는 값과 무한스크롤 전용 데이터가 꼬여버려 순서에 맞지 않는 상황. 

인지
처음 랜더링 되는 순간 옵저버도 1번 실행 되어 버렸기 때문에 처음 순서가 잘못 되게 나옴.

랜더링 순서를 정해줄 필요가 있다고 판단.

api통신을 순서를 정해줄 필요가 없고 초받값을 따로 받는 작업이 필요없는 리액트 쿼리 훅  useInfiniteQuery 도입.
 

`useInfiniteQuery  사용후` 

```jsx
const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useGetExhibitioninfinity(10, applyTags);

let merged = data?.pages.length > 0 ? [].concat(...data?.pages) : [];

  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0); // SPA문제의 한계, 이전 라우터의 스크롤을 기억하고 있는 문제를 해결하고자 함
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchNextPage()//
      }
    }, { threshold: 0.01 });

    if (ref.current) {
      observer.observe(ref.current);//옵저버 생성
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);//언마운트시 해제
      }
    };
  }, []);
```

이제는 elements가 확인된다면 fetchNextPage()가 실행 된다.

```jsx
export const useGetExhibitioninfinity = (pageSize, applyTags) => {
	.
	.
	.
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [keys.GET_EXHIBITION, applyTags],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await apis_token.get(
          `/exhibition?limit=${pageSize}&offset=${pageParam}${serchWhere}${searchCategory}${searchHashTag}${searchTitle}`
        );
        return res.data.exhibitionList.rows;
      },
			//fetchNextPage를 설정.
      getNextPageParam: (lastPage, allPages) => {
				 // lastPage는 useInfiniteQuery를 이용해 호출된 가장 마지막에 있는 페이지 데이터
        // allPages는 useInfiniteQuery를 이용해 호출된 모든 페이지 데이터
        if (lastPage.length < pageSize) {
          return undefined;
        }
				//다음 가지고 올 페이지의 위치를 설정해줌
        return allPages.length * pageSize;
      },
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (e) => {
        console.log(e.message);
      },
    });
  return { data, isLoading, isError, fetchNextPage, hasNextPage };
};
```

코드가 간결해 졌다.

useInfiniteQuery 내부에서 isloading, page,hasNextPage  등등 값을 지원해서 로딩중인지, 마지막페이지가 있는지,  다음페이지를 어디서 불러올지 page 번호를 지정 가능하다.

```jsx
 let merged = data?.pages.length > 0 ? [].concat(...data?.pages) : [];
```

가지고 오는 값들을 합처서 배열을 만든다.

</details>

<details>
<summary> state가 변동사항이 있는지 감지하기</summary>

<br/>

**`상황`**

작성, 수정 페이지에서  templete과 data가 달라졌다면 작성이 되었다고 인지하여 confrim()메서드를 띄워주고 싶다.

<br/>

**`문제`**

```jsx
const templete = {
startDate: "",
},
};
const [exhibition, setExhibition] = useState(templete );
```

여기서 templete과 exhibition을 비교해서 exhibition 값이 달라졌다면 confrim()메서드를 띄워주고 싶었다

templete이 초기값 ,exhibition은 나중에 사용자가 입력하면 달라지는값이고

하지만 아무것도 입력 안했을때도 templete과 exhibition이 다르다고 나온다 

<br/>

**`해결`**

`JSON.Stringify()` 메서드를 사용하여 **`templete`**과 **`exhibition`**을 각각 문자열로 변환한 후, 문자열을 비교하여 두 객체의 내용이 같은지를 확인

**templete**과 **exhibition**이 초기값으로 같은 객체를 참조하고 있기 때문에, **exhibition**
의 상태가 변경되면 **templete**과는 별개의 객체로 새로운 상태가 생성됩니다. 즉 깊은 복사를 실행 했다.

그렇기 때문에 **templete** & **exhibition**은 서로 다른 객체로 인식되고, 값이 같더라도 JavaScript에서 객체 간의 비교는 참조(Reference)에 의한 비교가 이루어지기 때문에, 두 객체가 다르다고 판단된다.

이를 해결하려면 객체의 내용을 비교하는 로직을 추가하여 객체의 내용이 동일한지 비교한다.

```jsx
const changeOnOff = (event) => {
    const { name } = event.target;
    if (
      exhibitionKind !== name &&
      JSON.stringify(templete) !== JSON.stringify(exhibition)
    ) {
      if (window.confirm("기존데이터가 삭제 됩니다.정말로 진행하시겠습니까?")) {
        setExhibitionKind(name);
        setExhibition(templete);
      }
    } else {
      setExhibitionKind(name);
    }
  };
```

값이 작성이 안될때 그냥 confirm() 없이 화면이 전환 되는 로직.

</details>

---

## 👨‍👨‍👧‍👧 팀원 소개


| 역할 | 이름 | GitHub | 분담 |
| --- | --- | --- | --- |
| FE 👑 | 백승호 | https://github.com/seunghowhite | 전시페이지, 전시회 작성페이지, 전시회 수정페이지, 전시회 상세페이지  |
| FE | 김재란 | https://github.com/gitjaeran | 로그인 페이지, 회원가입 페이지, 마이페이지 |
| FE | 박영찬 | https://github.com/19Edwin92 | 메인(헤더포함) 페이지, 아트그램 페이지, 통합검색 페이지 |
| BE 👑 | 임건 | https://github.com/WoogLim | |
| BE | 문서아 | https://github.com/mseoa |   |
| BE | 김다빈 | https://github.com/dabeenkim |  |
| DE | 강혜린 |  | 디자인 |


<br/>
<br/>
