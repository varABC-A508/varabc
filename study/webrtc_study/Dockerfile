FROM ubuntu:20.04

# 1. Node.js 설치
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs npm

# 2. 소스 코드 복사
WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN npm install

# 3. 소스 코드 복사 (캐싱을 최적화하기 위해 변경이 빈번한 파일을 뒤로 배치)
COPY . /usr/src/app

# 4. WEB 서버 실행 (Listen 포트 정의)
EXPOSE 3000
CMD ["node", "server.js"]