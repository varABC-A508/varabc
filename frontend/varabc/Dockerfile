# Nginx 이미지를 베이스로 설정
FROM nginx:alpine

# build 폴더의 내용을 Nginx의 호스팅 경로에 복사
COPY build /usr/share/nginx/html

# HTTPS를 위한 인증서와 개인 키 복사
COPY ssl/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY ssl/privkey.pem /etc/nginx/certs/privkey.pem

# 커스텀 Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 80 (HTTP) 및 443 (HTTPS) 포트 노출
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]