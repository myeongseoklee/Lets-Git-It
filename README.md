# <p align="center"><b>let's GIT it</b></p>

<p align="center"> 📆 2023.01.11~ 2023.03.02

<br>
<br>
<!-- ## 📼 LET'S GIT IT -->
<h2> let's GIT it 바로가기 : <a href="https://let-s-git-it.vercel.app/">https://let-s-git-it.vercel.app/</a></h2>

<img src ="https://user-images.githubusercontent.com/100506719/223014450-d4b6f831-b312-482b-8797-8c80d6e649b8.gif" width="600" align="center">

<br />

## 📌 소개

- 개발 동기부여를 위한 깃허브 랭킹 서비스
- let's git it을 통해 자신의 깃허브 점수를 확인하고 친구, 유명인들과 비교해 보세요!
- 개발 관련 커뮤니티(개발 질문, 프로젝트 모집, 채용 정보 등 자유롭게 공유해주세요)

## 📌 Team let's GIT it

`FE` 김보윤, 박지영, 심동섭, 홍석현 <br>
`BE` 오현상, 이명석, 지송현

<br />

## 📌 담당기능

- `오현상` - Top 5, Top 100, 깃허브 유저의 랭킹 등록 및 검색 그리고 비교
- `이명석` - 깃허브 OAuth 인증/인가, 커뮤니티 게시판(댓글/대댓글 CRUD) 
- `지송현` - 커뮤니티 게시판(글 CRUD, 글 목록 정렬, 검색)

<br />

## **프로젝트를 진행하며 성장한 점(요약)**

### ✅ **[다양한 웹 취약점에 대해 알고 공격에 대한 보안 조치를 취할 수 있게 되었다.](https://growth-msleeffice.tistory.com/146)**

프로젝트 개선 과정에서 'accessToken이 로컬스토리지에 저장되는 것이 옳은가?' 생각해보게 되었다. accessToken은 JWT로 만들어졌는데, 페이로드에는 권한 인증을 위한 개인정보가 담긴다. 따라서 accessToken을 로컬스토리지에 저장하는 것은 접근, 탈취의 위험이 있어 좋은 방법같지 않았다.

그래서 accessToken이 로컬스토리지에 저장되었을 때, 그리고 탈취됐을 때 발생할 수 있는 문제에는 무엇이 있는지 알아보았고 XSS, CSRF 공격에 취약하다는 점을 알게되었다.

XSS, CSRF 공격을 대비하기 위해, accessToken을 브라우저에서 접근할 수 없도록 로컬스토리지에 저장하지 않고 frontend 브라우저 자바스크립트 코드 메모리에서 저장하여 사용하는 방법을 적용했다. 이 경우, 화면이 다시 랜더링되면 accessToken이 사라지는 것이 문제가 된다. 따라서, refreshToken을 발행하여 refreshToken으로 accessToken을 재발급 받을 수 있는 API를 개발했다.

refreshToken은 브라우저에 저장되어 있어야 하는데, 로컬 저장소에 저장하는 것은 accessToken처럼 XSS 공격에 취약하다는 문제를 갖게 된다. 따라서, refreshToken은 cookie에 담아 보내주기로 했다. cookie도 XSS 공격에 취약점이 있지만, httpOnly 옵션을 주어서 브라우저에서 쿠키에 접근할 수 없도록 했고, secure 옵션을 주어서 https 통신일 때만 쿠키를 사용할 수 있게 하여 XSS 취약점을 보완했다.

<br>

### ✅ **[CORS 정책의 기본을 다질 수 있었고, 이를 고려하여 올바르게 API를 개발할 수 있게 되었다.](https://growth-msleeffice.tistory.com/147)**

현재 진행하고 있는 프로젝트의 client server와 api server는 도메인이 다르기 때문에 서로 쿠키를 주고받기 위해서는 CORS 정책을 잘 지켜줘야 한다.

'CORS를 잘 모르면 삽질을 많이 하게 될 것이니 잘 공부해 두어야 한다.'고 누군가 내게 조언을 해주었었다. 그 조언을 깊이 새겨 들었어야했다. 그랬다면 client와 api 서버의 domain을 다르게 두는 짓은 하지 않았을 것이다.

그 조언을 가볍게 여긴 벌로 CORS 에러를 디버깅하는데 어려움이 있었다.

특히, **Cross-site 간 cookie 전송**이 가능하도록 세팅하는 것이었는데 올바르게 cloudfront 설정을 하지 않아서, 브라우저에 cookie가 저장이 되지 않았고 디버깅하는 것에 시간이 많이 걸렸다.

그래서 request와 response header의 의미를 정확히 학습하고 cloudfront 설정을 cors 정책에 맞게 설정해주었다.

> 그러나, cors 정책에 맞게 올바르게 설정해주었음에도 문제를 해결할 수 없었는데 문제는 다른 곳에 있었다.(froxy)

<br>

### ✅ **소프트웨어 아키텍처와 디자인 패턴, OOP에 대해 알게 되었고, 유지보수와 재사용성을 고려한 아키텍쳐 설계 및 코드 구현을 할 수 있는 기초를 닦고 있는 중이다.**

프로젝트를 시작 할 당시, 객체지향적으로 코드를 작성하거나 아키텍쳐에 대해 잘 몰랐기 때문에 처음부터 객체지향적인 설계는 엄두도 못냈었다.

프로젝트 배포를 끝내고 나서야 기능을 변경하거나 코드를 리펙토링 하는 과정에서 고쳐야 할 것들이 눈에 너무 띄었다. 그때까지도 객체지향의 개념이 무엇인지 몰랐기 때문에, 그냥 느낌적으로 '기능 별로 묶어 놔야겠다.', '이 함수 기능이 너무 복잡한데 기능을 좀 나눠야겠다. 이 기능만 다른 누군가 쓸 수도 있잖아?' 이런 생각으로 리펙토링을 했었다.

그런데 아는 만큼 보인다고 했던가. [객체지향의 4가지 특징과 SOLID](https://growth-msleeffice.tistory.com/144)에 대해 반복 학습하고 나니 이제는 내가 작성한 코드가 뭐가 잘못 되었는지 보이기 시작했다.(어쩌면 대부분 스파게티 코드 일지도...?) 그래서 좋은 아키텍쳐를 설계하고 좋은 코드를 작성할 수 있는 개발자가 되기 위해 아키텍처, 디자인 패턴, OOP에 대해 학습 중이고 5월 중에 대대적인 리펙토링이 예정되어 있다.

<br>

### ✅ **나만의 학습 방향에 대해 고민하고, 확신을 갖게 되었다.**

프로젝트를 배포하기 전까지는 빠른 output에 몰두한 나머지, 새롭게 알게 된 것들을 정리하지 못했다. 그래서 개발을 완료하고 나서도 무언가 내 안에 남아있는 느낌이 들지 않았다. 프로젝트 중간 개인적인 이슈로 약 2주간 프로젝트에 참여하지 못하는 상황이 생겼기 때문에 정리하지 않으면 금방 휘발될 줄 알면서도 기능을 만들어내는데 급급할 수 밖에 없었다.

그래서 뒤늦게 그때 살펴봤던 것들을 뒤적이면서 학습한 내용을 정리하고 있다. 프로젝트 동안의 학습량이 꽤 쌓여있고 현재도 새롭게 학습하는 것들이 있기 때문에 언제 다 정리하나 막막하지만 조금씩 정리해가면서 어렴풋한 개념들이 그려지기 시작했다.

<br>

### ✅ **실제로 서비스를 운영하면서 사용자들의 피드백을 기반으로 프로젝트를 개선해볼 수 있는 경험이었다.**

UI/UX 관련 피드백이 주를 이루었기 때문에 담당한 기능에 대한 피드백을 받아보지는 못했지만 팀원들의 버그 수정, UI/UX와 핵심 도메인 로직을 개선 등의 과정에서 겪는 어려움을 해결할 수 있도록 아이디어와 의견들을 적극적으로 제시했고 스크럼 회의를 주도했다.

또한 피드백이 없더라도 지속적으로 개선할 점들을 찾기 위해 노력했다. 그래서 보안 관련 설정이나, API 문서화, 코드의 아키텍쳐와 디자인 패턴에도 관심을 갖게 되었다. 현재도 개선해야 할 점이 한 두 가지가 아닌 것 같아서 고군분투 중이다.

<br>

### ✅ **간단한 AWS infrastructure 기반의 CI/CD 파이프라인을 구축할 수 있게 되었다.**

api를 개발하는 경험에 비해 DevOps 경험이 비교적 적었기 때문에, 실제 서비스를 운영할 AWS Cloud Infra 구축 방법을 빠르게 학습하여 output을 내는 것을 프로젝트 동안 최우선점으로 두었다.

그 과정에서 network 관련 학습이 필요하다고 느껴 꾸준히 [Network 관련 CS 지식을 학습, 정리하여 포스팅](https://growth-msleeffice.tistory.com/category/Network) 하는 것을 시작했다.

<br>

### ✅ **Nest.js, Typescript Skill이 향상되었다.**

<br>

---

## **📌 담당 역할 소개 및 상세**

### **1. Auth API 개발**

✅ Github oauth 2.0 기반 인증 API, JWT를 이용한 인가 API 개발

> 🛠️ [인증/인가 과정에서 XSS, CSRF 보안 개선 사례](https://growth-msleeffice.tistory.com/146)
>
> 🔜 Cross-Site 간 cookie를 주고 받기 위한 CloudFront 설정 방법(포스팅 예정)

✅ 유저의 활동 정보(post, comment 관련)를 담은 user 객체 반환하는 권한 부여 로직 개발(guard, strategy)

✅ accessToken 재발급, 로그아웃 API 개발

<br>

### **2. Comment API 개발**

✅ 대댓글 엔티티를 따로 만들지 않고, Comment Entity에 내부적으로 대댓글 기능을 구현하여 게시판 댓글/대댓글 CRUD API 개발

✅ 게시판 댓글/대댓글 좋아요 생성/삭제 API 개발

<br>

### **3. User API 개발**

✅ 마이페이지 조회/수정 API 개발

<br>

### **4. Database schema 설계**

![](./images/ERD.png)

<br>

### **5. DevOps**

✅ **브라우저와 서버 통신 간 보안 향상을 위해 API 서버에 HTTPS 적용**

> 🔜 Certificate Manager와 Route 53을 활용한 https 설정 (포스팅 예정)

✅ AWS infrastructure 구축

> 🔜 (회고 포스팅 예정)

![](./images/infrastructure.png)

✅ CI/CD 파이프라인 구축

> 🔜 (회고 포스팅 예정)

![](./images/cicd.png)

<br>

### **6. 기타**

✅ 컨트롤러, 서비스, 레포지토리 레이어의 Unit test 작성

✅ [효율적인 API 문서 관리를 위한 Swagger 도입](https://growth-msleeffice.tistory.com/108)

![](./images/swagger.png)

✅ httpExceptionFilter 작성

<br>

---

## **💻 Stack**

✅ TypeScript([NestJS](https://growth-msleeffice.tistory.com/101)), TypeORM, MySQL

✅ AWS EC2, RDS, VPC, S3, Route 53, CloudFront, Certificate Manager, System Manager

✅ Docker, GitHub Actions, Jest

<br>

---

## **📝 필요 개선 사항(As Is To Learn! 😁)**

**1. (학습 중) 코드의 유지보수성, 재사용성, 확장성 개선을 위한 리펙토링**

✅ DB 중심의 아키텍쳐를 도메인 중심 구조로 전환하여 유지보수성 개선(layered pattern -> hexagonal architecture) (학습중)

✅ OOP를 적용하여 코드의 재사용성과 유지보수성 개선(학습중)

✅ [SOLID 원칙](https://growth-msleeffice.tistory.com/144), 클린코드 적용하여 리펙토링 예정

✅ 순환 참조 문제, 불필요한 공급자 주입 등 구조 개선

**2. (예정) DB 성능 최적화**

✅ query 성능 최적화

✅ CQRS 적용

**3. (예정) 에러 로깅 시스템 구축**

**4. (예정) CloudFront 엣지 로케이션 캐싱 적용**

**5. (예정) API SERVER 로드밸런싱 적용**

<br>
