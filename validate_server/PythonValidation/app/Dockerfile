# 베이스 이미지로 파이썬 3.11을 사용합니다.
FROM python:3.11

# 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# 호스트의 현재 디렉토리의 모든 파일을 컨테이너의 /app/ 디렉토리로 복사합니다.
COPY . /app/

# 필요한 의존성 패키지들을 설치합니다.
RUN pip install --no-cache-dir flask psutil

# 플라스크 앱이 5000번 포트에서 동작하도록 설정합니다.
EXPOSE 5000

# 컨테이너가 실행될 때 실행될 명령어를 설정합니다.
CMD ["python", "app.py"]