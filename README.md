# README.md

## 카테고리

| Application | Domain | Language | Framework |
| --- | --- | --- | --- |
| ✅  Desktop Web | 🔲 AI | ✅JavaScript | 🔲 Vue.js |
| 🔲Mobile Web | 🔲 Big Data | 🔲TypeScript | ✅  React |
| 🔲Responsive Web | 🔲Blockchain | 🔲 C/C++ | 🔲 Angular |
| 🔲Android App | 🔲 IoT | 🔲 C# | ✅  Node.js |
| 🔲 iOS App | 🔲AR/VR/Metaverse | ✅ Python | ✅ Flask/Django |
| 🔲Desktop App | 🔲Game | ✅Java | ✅ Spring/Springboot |
|  | ✅  WebRTC | 🔲Kotlin |  |
|  |  |  |  |

## 프로젝트 소개

- 프로젝트명: 변수명ABC
- 서비스 특징: 페어 코딩 연습이 가능한 배틀 서비스
- 주요 기능
    - 알고리즘 풀이 온라인 저지 문제 통합 제공 서비스
    - 문제 풀이용 코드에디터 제공 서비스
    - 온라인 페어 코드 배틀 및 리뷰 서비스
    - 구글 / 카카오 oauth활용 로그인
- 주요 기술
    - WebRTC
    - WebSocket(socket.io)
    - React library
    - JWT Authentication
    - REST API
- 참조 리소스
    - Tailwind CSS: 디자인 전반 적용
    - Material UI: 디자인 전반 적용
    - OpenVidu: 오픈 소스 멀티 플랫폼 화상 회의 솔루션
    - JPA: 객체와 데이터베이스의 관계를 매핑
- 배포 환경
    - URL: [https://www.varabc.com/](https://www.varabc.com/)
    <!-- 웹 서비스, 랜딩 페이지, 프로젝트 소개 등의 배포 URL 기입 -->
    - 테스트 계정: 현재 없음(Oauth 사용 계정)
    <!-- 로그인이 필요한 경우, 사용 가능한 테스트 계정(ID/PW) 기입 -->

## 팀 소개

- 오준석: 팀장, 백엔드, 발표, Python 채점 서버
- 김영서: 백엔드, CI/CD, Java 채점 서버
- 김희조: 백엔드, DB, UCC
- 이예린: 프론트엔드, figma, [socket.io](http://socket.io) 게임서버
- 박재은: 프론트엔드, figma, webRTC voice chat
- 오정빈: 프론트엔드, figma, google, kakao oauth

## 프로젝트 상세 설명

<!-- 개발 환경, 기술 스택, 시스템 구성도, ERD, 기능 상세 설명 등 -->

### 개발 환경

| 분야 | 항목 | 버전 |
| --- | --- | --- |
| 백엔드 | Java | 17 |
| 백엔드 | Spring boot | 3.1.1 |
| 프론트엔드 | React | 18.2.0 |
| 프론트엔드 | Node.js | 18.16.1 |
| 데이터베이스 | MySql | 8.0.33 |
| 데이터베이스 | Firebase |  |
| 인프라 | Docker, Jenkins |  |

### 기술 스택

**프론트엔드**

```json
		"@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@fortawesome/fontawesome-svg-core": "^6.4.0",
    "@fortawesome/free-brands-svg-icons": "^6.4.0",
    "@fortawesome/free-regular-svg-icons": "^6.4.0",
    "@fortawesome/free-solid-svg-icons": "^6.4.2",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@mui/material": "^5.14.4",
    "@mui/system": "^5.14.4",
    "@react-oauth/google": "^0.11.1",
    "@reduxjs/toolkit": "^1.9.5",
    "@tanstack/react-query": "^4.32.6",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@uidotdev/usehooks": "^2.1.0",
    "axios": "^1.4.0",
    "babel-plugin-macros": "^3.1.0",
    "cors": "^2.8.5",
    "dompurify": "^3.0.5",
    "draft-js": "^0.11.7",
    "express": "^4.18.2",
    "firebase": "^10.1.0",
    "http-proxy-middleware": "^2.0.6",
    "moment": "^2.29.4",
    "nodemon": "^3.0.1",
    "quill-image-resize-module-react": "^3.0.0",
    "react": "^18.2.0",
    "react-ace": "^10.1.0",
    "react-dnd": "^16.0.1",
    "react-dom": "^18.2.0",
    "react-dropzone": "^14.2.3",
    "react-fontawesome": "^1.7.1",
    "react-helmet": "^6.1.0",
    "react-query": "^3.39.3",
    "react-quill": "^2.0.0",
    "react-redux": "^8.1.2",
    "react-resizable": "^3.0.5",
    "react-resizable-panels": "^0.0.54",
    "react-router-dom": "^6.14.2",
    "react-scripts": "5.0.1",
    "socket.io": "^4.7.2",
    "socket.io-client": "^4.7.2",
    "styled-components": "^6.0.5",
    "sweetalert": "^2.1.2",
    "web-vitals": "^2.1.4"
```

**백엔드**

- **Language**: [백엔드 언어, 예: Java, Python, Node.js 등]
    - Java 17을 사용함
- **Framework**: [백엔드 프레임워크, 예: Spring Boot, Django, Express.js 등]
    - Spring Boot 3.1.1을 사용함
- **Database**: [사용하는 데이터베이스 및 버전, 예: PostgreSQL, MongoDB, MySQL 등]
    - MySQL 8.0.33 사용함
- **ORM/ODM**: [ORM 또는 ODM 라이브러리, 예: Hibernate, Sequelize, Mongoose 등]
    - JPA를 사용함
- **API Documentation Tools**: [API 문서화 도구, 예: Swagger, Postman]
    - Postman을 사용해서 API를 테스트하고 Notion을 사용해서 API문서를 만듬
- **Environment Management**: [환경 변수 관리 도구, 예: Docker, dotenv]
    - Docker를 사용해서 일정한 환경에서 배포함

### 시스템 구성도

![System_A508](/uploads/f43c000dab0f73ed78652c541255ce71/System_A508.png)

### ERD

![ERD_A508](/uploads/84d37e7f3322ccdc1c99a7c0edcd89cb/ERD_A508.png)

### 기능 상세 설명

1. 채점 서버 : 기존의 온라인 저지의 구현방식과 다르게 인터프리터를 호출하는 오버헤드를 줄이기 위해 각 언어별 채점 서버를 같은 언어를 사용하는 프레임워크를 적용하여 성능을 높임
2. 코드 에디터 : 에이스 에디터 활용 자동 완성, 들여쓰기, 구문 강조 제공 및 동일 화면에서 코드 작성 및 편집 가능
3. 2대2 코드 배틀 : 리얼타임 noSQL 데이터베이스인 Firebase DB를 사용하고, nodejs express로 소켓 서버를 구현 실시간 코드 공유 및 작성 가능
4. 음성 통화 webRTC : socket.io를 활용한 서버 내 음성 통화 서비스 제공
