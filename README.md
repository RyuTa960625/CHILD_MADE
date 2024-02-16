# 우리 아이가 만들었어요

![Untitled](/uploads/6cbe5dabb73ba2059ce4bd12d5517e28/Untitled.png)

### 4세에서 10세 아이들이 함께 참여 가능한 화상 동화 서비스

## 소개 영상

- [https://www.youtube.com/watch?v=1bM2wbN2ajA](https://www.youtube.com/watch?v=1bM2wbN2ajA)

## 시연 영상

- [https://www.youtube.com/watch?v=xtrJIBw8ABU](https://www.youtube.com/watch?v=xtrJIBw8ABU)

## 배경

동화가 아이들에게 긍정적인 영향을 미친다는 것은 이미 대부분의 사람들이 알고 있다. 

- **언어 발달과 책 읽기 습관 형성**에 많은 도움을 준다.
- 다양한 상황과 캐릭터를 간접적으로 체험해보면서 **상상력과 창의력 발달에 많은 도움**이 된다.
- **이야기 속에 녹아 있는 교훈을 느낄 수 있다.**

하지만 이렇게 좋은 동화를 접할 기회가 점점 줄어들고 있다. 

- 맞벌이 가정이 늘어남에 따라 **부모님이 동화를 읽어줄 기회가 줄어들었다.**
- 스마트 기기의 발달로 **자극적이고 흥미 위주인 컨텐츠들이 자리잡으면서 아이들이 스스로 동화를 읽는 경우가 줄어들었다.**

이러한 상황에서 아이들에게 동화책을 읽을 수 있도록 도와주는 여러 교육 서비스들이 만들어졌다. 
하지만 기존 서비스들( 아이들나라, 밀크T, 밀리의 서재 등 )에서 몇 가지 아쉬운 부분을 발견했다.

- 동화책을 읽는 과정에서 **능동적인 참여가 불가능**하여 **흥미를 쉽게 잃을 수 있다.**
- 동화책을 읽는 활동에 대한 결과물이 남지 않아 **부모의 경우 아이들이 제대로 참여하는 지 알 수 없고**, 아이들의 경우 **성취감이 없어 오랫동안 활동을 지속하는 것이 어렵다.**
- **단순히 혼자서 동화를 읽도록 하기 때문에 어릴 때부터 길러주어야 할 다른 성향들을 기르는 데에는 아쉬움**이 있다.
- 기존 동화책들은 이미 결말이 정해져 있기 때문에 결말을 알고 있을 경우, **동화 내용 흐름에 대한 집중도가 떨어진다.**

## 목표

1. 동화책을 읽는 과정에서 실시간으로 **능동적인 참여가 가능 하도록** 서비스를 만든다.
2. 동화책을 읽는 활동에 대한 결과물을 생성하여 부모는 **아이들의 참여도를 체크** 할 수 있고, **아이들은 그 결과물을 통해 성취감**을 느낄 수 있도록 하여 **꾸준한 참여를 유도**하도록 한다.
3. 여러 친구들과 함께 동화책을 읽으면서 **아이들의 사회성 형성에도 도움**을 주도록 한다.
4. 간단한 선택지를 통해 **하나의 동화에서도 다양한 결말**이 나오도록 만들어 **흥미를 유지하도록 유도**한다.

## 주요 기능

1. 혼자 하기 / 함께 하기선택 기능
2. 원하는 역할 선택 기능
3. 원하는 역할 선택 후 자동으로 방 배정
4. 실시간 웹캠 공유 기능
5. 참여 도우미 캐릭터 시스템
6. 저장된 동화 영상 다시보기 / 다운로드 / 삭제

## 주요 기술

**Backend**

- java17
- springboot 3.2.2
- spring jpa
- spring security
- spring web
- oauth2
- intelliJ IDE
- ffmpeg

**Frontend**

- Node.js 20.11
- react18
- VSCode

**DataBase**

- mariaDB
- Redis

**Infra**

- aws ec2
- asw s3
- aws RDS
- openvidu
- docker & docker compose
- jenkins

## 협업 툴

- git
- notion
- gerrit
- jira
- mattermost

# 커밋 컨벤션
| Type         | 설명                                                                        |
| ------------ | --------------------------------------------------------------------------- |
| **Feat**     | 새로운 기능 추가                                                              |
| **Fix**      | 버그 수정                                                                    |
| **Refactor** | 리펙토링                                                                     |
| **Design**   | CSS등 사용자 UI 디자인 변경                                                   |
| **Comment**  | 주석 추가 / 변경                                                             |
| **Style**    | 코드 포맷팅, 세미콜론 누락, 코드 변경 없는 경우                                  |
| **Docs**     | 문서 추가, 수정, 삭제                                                         |
| **Test**     | 테스트 관련 코드 추가, 수정, 삭제과 비즈니스 로직 변경 없는 경우                   |
| **Chore**    | 위에 걸리지 않는 기타 변경사항(빌드 스크립트 수정, assets image, 패키지 매니저 등)  |
| **Init**     | 프로젝트 초기 생성                                                            |
| **Rename**   | 파일 혹은 폴더명 수정하거나 옮기는 경우                                          |
| **Remove**   | 파일을 삭제하는 작업만 수행하는 경우                                             |

## 팀원 역할 분배
|   **Name**   |                김대영                 |                박성진                |                  이준서                   |               김규리                |                 류태수                  |               박종혁                |
| :----------: | :-----------------------------------: | :----------------------------------: | :---------------------------------------: | :---------------------------------: | :-------------------------------------: | :---------------------------------: |
| **Position** |          Backend <br> Leader           |          Backend           |           Backend          |        Frontend <br> Leader         |            Frontend            |         Frontend          |


## 아키텍처

![Untitled_1](/uploads/f2a6aedd74399bdf32502a73fedd9dec/Untitled_1.png)

## ERD

![Untitled_2](/uploads/6963e37a70594ed318b7f8f432ac3f0f/Untitled_2.png)

## 프로젝트 산출물

- [기능명세서](https://www.notion.so/287226729deb4d6381a625983ac01f7f?pvs=21)
- [API 명세서](https://www.notion.so/API-a4763cc8c23a4a52a533925a1c9c96c6?pvs=21)
- [와이어프레임](https://www.figma.com/file/5q8NMpF6gTAb0tVW6MnV8g/D209?type=design&node-id=272-1672&mode=design)
- 커밋 [컨벤션](https://www.notion.so/0df7f1a472544bce8ad6fb136dde5225?pvs=21)
- [backend 코드 컨벤션](https://www.notion.so/10b0f128142f4b43b121d4992c8ecb1b?pvs=21)
- [frontend 코드 컨벤션](https://www.notion.so/c5b5da87eefd41c9b5caddf04ca0605f?pvs=21)
- 회의록

## 우리 아이가 만들었어요 서비스 화면

### 로그인

- 구글 로그인 / 카카오 로그인

![Untitled_3](/uploads/d287482dce62523a1abee12b58c3205c/Untitled_3.png)

![Untitled_4](/uploads/48c18f89538c7a98cf400513e683a775/Untitled_4.png)

### 회원 가입

- 닉네임을 기입한다.

![Untitled_5](/uploads/ef31d2c723093a89a2ed06169bc4df61/Untitled_5.png)

### 메인 화면

![Untitled_6](/uploads/e72dd4635beff7ee477601c4a10ad3f0/Untitled_6.png)

### 책 목록 리스트 화면

- 검색 기능

![Untitled_7](/uploads/1c9a6e195e45091304cf1f2faa6cdf19/Untitled_7.png)

### 책 상세 정보 및 역할 선택 화면

- 원하는 역할을 선택하여 플레이 할 수 있다.

![Untitled_8](/uploads/813d241f32b4002388b5b4005a019c99/Untitled_8.png)

![Untitled_9](/uploads/7e6c0c1ab855a68a9261a0807239807b/Untitled_9.png)

### 플레이 화면

![Untitled_10](/uploads/476724eabda5f42534a19f99fd9450fe/Untitled_10.png)

### 나의 동화책 목록 화면

- 검색 기능

![Untitled_11](/uploads/40669e3cae609fd0c6479d8525c3285d/Untitled_11.png)

### 나의 동화책 상세 정보

- 동화책 보기
- 동화책 저장하기
- 동화책 삭제하기

![Untitled_12](/uploads/43cf1c79370e76057aea2e7b6aceed60/Untitled_12.png)

### 동화책 보러가기 화면

![Untitled_13](/uploads/52ce1991731d9d0243adbf523d4accc2/Untitled_13.png)

### 마이페이지

- 이름, 닉네임, 프로필 사진 수정 기능
- 회원 탈퇴 기능

![Untitled_14](/uploads/ea3aa178a3d83f8e13e57aa9e8ddc010/Untitled_14.png)
