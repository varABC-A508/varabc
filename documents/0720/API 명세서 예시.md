# /app/users/logIn (예시)

Description: 로그인
메서드: POST
백엔드 담당자: 김영서
프론트 구현여부: Yes

# 명세

## API 설명

로그인을 합니다

## URI

| /app/users/logIn |
| --- |

## Method

| POST |
| --- |

## Header

| 컬럼명 | 타입 | 필수 | 기본값 | 설명 | 예시 |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Query String

| 컬럼명 | 타입 | 필수 | 기본값 | 설명 | 예시 |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Body

| 컬럼명 | 타입 | 필수 | 기본값 | 설명 | 예시 |
| --- | --- | --- | --- | --- | --- |
| userId | String | Y |  | 아이디 | admin |
| userPw | String | Y |  | 비밀번호 | admin123! |

## Body Sample

```json
{
    "userId" : "admin",
		"userPw" : "1111"
}
```

## Result Code

| code | message |
| --- | --- |
| 1000 | 요청에 성공하였습니다. |
| 2010 | 일치하는 아이디 없음 |
| 2011 | 일치하는 비밀번호 없음 |

## Response Parameters

| 컬럼명 | 타입 | 필수 | 기본값 | 설명 | 예시 |
| --- | --- | --- | --- | --- | --- |
| isSuccess | boolean | Y |  | 요청 성공 여부 | TRUE |
| code | int | Y |  | 응답 코드 | 1000 |
| message | String | Y |  | 응답 메시지 | 요청에 성공하였습니다. |
| result | Array |  |  |  |  |
| ㄴuserName | String | Y |  | 유저 닉네임 | 관리자 |
| ㄴuserId | String | Y |  | 유저 아이디 | admin |
| ㄴIdx | Int | Y |  | 유저 Idx | 1 |

## Response Sample

```json
{
    "isSuccess": true,
    "code": 1000,
    "message": "요청에 성공하였습니다.",
    "result": {
        "userName": "관리자",
        "userId": "admin",
        "idx": 1
    }
}
```