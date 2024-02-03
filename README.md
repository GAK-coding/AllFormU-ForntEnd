# <img src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/381be6e7-059c-4675-9b9d-961daf78d289" width="200"/>
누구나 다양한 목적으로 설문을 제작, 응답할 수 있는 대화형 챗봇 기반 설문조사 플랫폼
<br/>챗봇을 활용한 설문 생성 & Chat GPT 사용

<br/>

### 👥  참여인원
- 가천대학교 컴퓨터공학과 권오현 [Gitgub](https://github.com/5hyun) | qhslsl@gmail.com
        
- 가천대학교 소프트웨어학과 오채영 [Gitgub](https://github.com/CHCHAENG) | oco6029@naver.com

<br/>


## 🎯 기술 스택
<img src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/ba7b7f7c-fd13-424d-8037-0d48da104470" width="100%"/>


<br/>
<br/>

## 📝 Architecture 설계도
<img src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/96913056/3b0d07e1-c1b9-4288-9fec-0a529799ec03" width="100%"/>

## 💻 프로젝트 실행 방법

```shell
git clone https://github.com/GAK-coding/AllFormU-frontEnd.git
cd AllFormU-frontEnd

npm install
npm start
```

<br/>

## Demo 영상
[➡️ Demo 영상 보러가기](https://youtu.be/IxmdW8imXDw)   

<br/>
<br/>

## ❓ AllFormU 프로젝트 소개
1. [메인페이지](#메인페이지)   
   - [Float Button(GAK씨)](#Float-Button(GAK씨))
2. [회원가입](#회원가입)   
3. [로그인](#로그인)   
4. [마이페이지](#마이페이지)   
    - [회원정보 수정](#회원정보-수정)
5. [설문 생성](#설문-생성)   
    - [챗봇 생성](#챗봇-생성)  
    - [직접 생성](#직접-생성)    
    - [설문 만들기](#설문-만들기)
5. [설문 응답](#설문-응답) 
6. [설문 관리](#설문-관리)
   - [설문 수정 및 삭제](#설문-수정-및-삭제)
   - [설문 응답 조회](#설문-응답-조회)
<br/>
<br/>

## 메인페이지
<img width="1439" alt="스크린샷 2024-02-03 오후 8 27 52" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/5be5d51c-6871-4b3f-a1f5-abe4f9ced451">

### Float Button(GAK씨)
<img width="1440" alt="스크린샷 2024-02-03 오후 8 27 59" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/ebf7cbc1-3214-4bba-9b7f-671addb281a8">

- 오른쪽 하단에 있는 "GAK씨" 버튼을 클릭하면 빠른 메뉴가 나옵니다.
- 빠른 메뉴에는 생성하기, 응답하기, GPT가 있습니다.

-생성하기
<img width="1437" alt="스크린샷 2024-02-03 오후 8 28 18" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/6120e5f0-efdd-4fe4-9028-22ca238acf94">

- "생성하기"를 누르면 챗봇 생성 페이지로 이동하게 됩니다.

-응답하기
<img width="1440" alt="스크린샷 2024-02-03 오후 8 28 26" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/c9e874e0-f740-460d-b24e-34427e8435be">

- "응답하기"를 누르면 설문 응답 URL을 입력하는 모달이 뜨고, URL을 입력하면 해당 설문에 응답할 수 있습니다.

-GPT
<img width="1440" alt="스크린샷 2024-02-03 오후 8 28 41" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/e6ed2adb-77e3-4509-b120-61542fa49de0">
<video src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/c8729d08-f3a8-4692-8591-c963810c2a74">

- "GPT"를 누르면 Chat GPT를 이용하여 챗봇과 대화를 할 수 있습니다.


---

## 회원가입
<img width="1440" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/1f9b08f5-c73c-4277-8836-ecf7564fc2fe">

- 이름, 이메일, 비밀번호를 입력하면 회원가입이 완료됩니다.
- 이메일 인증을 해야 회원가입을 완료할 수 있습니다.

---

## 로그인
<img width="1435" alt="image" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/aa4ec852-bb31-4d1e-a0a1-de6e0f2f6c46">

- 회원가입을 완료한 회원은 로그인이 가능합니다.

---

## 마이페이지
-초기 마이페이지 화면
<img width="1440" alt="스크린샷 2024-02-03 오후 9 46 49" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/81972c14-baaa-4066-8f82-42dacced55d7">

-생성 폼과 응답 폼이 있을 때 화면
![스크린샷 2024-02-03 오후 9 50 04](https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/171a1227-27c4-411f-93d0-6d811babf987)

- 이 화면의 상세한 설명은 아래 설문 관리에 있습니다.

### 회원정보 수정
<img width="471" alt="스크린샷 2024-02-03 오후 9 47 14" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/074f4be8-e9cf-4bdc-aa94-282addfb75cc">

- "프로필 수정하기"를 누르면 비밀번호 입력 모달이 뜨고, 비밀번호를 입력하면 회원정보를 수정할 수 있습니다.

<img width="1440" alt="스크린샷 2024-02-03 오후 9 47 28" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/465ddd7e-baa4-4016-bf75-4f82c63e0e4b">

- 비밀번호를 입력하고 나면 회원정보를 수정 페이지로 이동합니다.
- 프로필 사진, 이름, 비밀번호를 수정할 수 있습니다.
- 휴면 계정 전환 혹은 탈퇴도 가능합니다.

---

## 설문 생성
<img width="1440" alt="스크린샷 2024-02-03 오후 9 54 17" src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/8b72e692-61c9-47dc-9cf8-a4b5aafd6286">

- 메인 페이지에서 "나만의 설문 만들기"를 누르면 위 화면으로 이동합니다.
- 챗봇 생성과 직접 생성이 있습니다.

### 챗봇 생성
<video src="https://github.com/GAK-coding/AllFormU-frontEnd/assets/86971770/468a86dc-7c70-4f10-8a76-df441022d811">

- 챗봇 생성을 누르면 챗봇과 대화하면서 설문의 기본 틀을 작성할 수 있습니다.
- 부가 기능으로 GPT 이용하기 버튼이 있습니다.
- 기본 틀 작성을 마치고 "폼 미리보기"를 누르면 설문의 질문을 작성할 수 있습니다.

### 직접 생성

### 설문 만들기

---

## 설문 응답

---

## 설문 관리

### 설문 수정 및 삭제

### 설문 응답 조회