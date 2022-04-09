![sobok_s](https://user-images.githubusercontent.com/60650518/162565130-47d661a8-9d32-4e9d-a160-f49bbf0b3087.png)

## 👀 웹 서비스 소개

자신의 연령대, 가구상황 등의 조건을 입력하면 굳이 여러 사이트를 찾아서 알아볼 필요 없이 자신이 받을 수 있는 복지 혜택 정보를 제공받을 수 있어요.

또한, 현재 인기있는 복지 혜택이 무엇인지, 추천받은 복지와 유사한 다른복지에는 무엇이 있는지 한눈에 알아볼 수 있는 서비스, **소복소복**입니다.

* 카카오 소셜 로그인 후 사용하실 수 있습니다.

[💙 소복소복 배포사이트](http://j6c205.p.ssafy.io/)

[📘 소복소복 팀 노션](https://www.notion.so/eunjii/98cfec07fa0643318856387b525b1d98)

[⛄ 소복소복 사용 시나리오](https://github.com/seongbiny/soboksobok/tree/master/exec/4.%20%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4)

## 📅 프로젝트 기간

* 2022.02.28 - 2022.04.08 (6주) 

## 🐱 개발 팀 소개

* 백엔드 3명, 프론트엔드 3명 총 6인

| 이름   | 역할      | 개발 내용                                                    |
| ------ | --------- | ------------------------------------------------------------ |
| 윤성빈 | Front-end | - UI/UX 디자인, 와이어프레임과 navbar, footer, 전체 layout<br />- 'Redux' 를 이용한 상태관리<br />&nbsp;&nbsp;- 검색키워드, 복지 상세 정보, 찜과 사용중인 복지데이터<br />-'Styled-components'와 'MUI'를 이용한 CSS-in-JS 스타일링 구현<br />- Axios를 이용한 서버와 데이터 통신<br />- 검색페이지 <br />&nbsp;&nbsp;- 인기검색어, 검색데이터 표시, 페이지네이션 구현<br />- 추천서비스페이지<br />&nbsp;- 원그래프, 선그래프로 추천 내용 구현<br /> &nbsp;- 추천 복지들 카드 슬라이드 구현<br />- 복지 상세페이지<br /> &nbsp;- 해당 복지와 유사 복지 랜덤으로 3개씩 불러오기 <br /> &nbsp;- 찜하기, 사용중 기능 개발<br /> &nbsp;- 해당 복지의 상세 내용 데이터 표시<br />- 내 정보<br /> &nbsp;- 찜하기, 사용중 복지 표시, 페이지네이션 구현<br />- 404 Not Found 페이지 개발 |

## 🛠️ 기술 스택

* frontend

| <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> | <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> | <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |

| <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> | <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/> |
| :----------------------------------------------------------: | :----------------------------------------------------------: |

| <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=Bootstrap&logoColor=white"/> | <img src="https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=MUI&logoColor=white"/> | <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |

* backend

| <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white"/> | <img src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=Django&logoColor=white"/> |
| :----------------------------------------------------------: | :----------------------------------------------------------: |

* DB

| <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/> |
| :----------------------------------------------------------: |

* CI/CD

| <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/> | <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/> |
| :----------------------------------------------------------: | :----------------------------------------------------------: |

* 협업 툴

| <img src="https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=Jira&logoColor=white"/> | <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"/> | <img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white"/> | gather town |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :---------: |

## ✨ 주요 기능

|   페이지   | 내용                                                         |
| :--------: | ------------------------------------------------------------ |
|     홈     | 인기검색어 기능, 로그인 전 / 후 탭 내용 다름<br />검색창에 검색어 입력하면 검색페이지에 검색결과 나타남 |
| 복지 검색  | 인기검색어 실시간 반영, 검색 결과 데이터 페이지네이션 구현<br />해당 복지 누르면 복지 상세페이지로 이동 |
| 추천서비스 | 원 그래프는 유저가 지원받을 수 있는 유형 표시<br />선 그래프는 유저와 비슷한 다른 유저들의 조회순으로 나타낸 인기 복지들<br />추천 알고리즘으로 유저에게 맞춤 추천된 복지들을 카드슬라이드로 구현<br />선 그래프의 인기 복지들을 카드 슬라이드로 구현<br />각 해당 복지들은 클릭 시 상세페이지로 이동 |
|  고객센터  | 게시글, 댓글 CRUD 구현                                       |
|  이용안내  | 소복소복 홈페이지 이용 가이드 안내                           |
|  내 정보   | 맞춤 필터로 유저의 가구 특성, 대상 특성, 연령 등 저장 기능<br />찜한 복지, 사용 중인 복지 페이지네이션 기능<br />카카오 소셜 로그인 기능 |

## 💻 실행 방법

#### Client 실행

1. 원격 저장소 복제

```bash
$ git clone https://github.com/seongbiny/soboksobok.git
```

2. 프로젝트 폴더로 이동 후 frontend 폴더로 이동

```bash
$ cd frontend
```

3. 필요한 node_modules 설치

```bash
$ yarn install
```

4. 리액트 앱 실행

```bash
$ yarn start
```

![soboksobok](https://user-images.githubusercontent.com/60650518/162564933-b1ba0018-0999-4e21-ba28-324b9ec4801e.gif)