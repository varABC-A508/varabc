use varabc;
-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- member Table Create SQL
-- 테이블 생성 SQL - member
CREATE TABLE member
(
    `member_no`        BIGINT          NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `member_nickname`  VARCHAR(60)     NOT NULL    COMMENT '닉네임', 
    `member_email`     VARCHAR(30)     NOT NULL    COMMENT '이메일', 
    `member_exp`       INT             NULL        DEFAULT 0 COMMENT '경험치', 
    `member_image`     VARCHAR(100)    NULL        COMMENT '이미지', 
    `member_admin`     TINYINT         NULL        DEFAULT 0 COMMENT '관리 권한. 1은 관리자', 
    `member_resign`    TINYINT         NULL        DEFAULT 0 COMMENT '삭제 여부. 1은 탈퇴', 
    `member_token`     VARCHAR(100)    NULL        COMMENT '토큰', 
     PRIMARY KEY (member_no)
);

-- 테이블 Comment 설정 SQL - member
ALTER TABLE member COMMENT '회원';


-- competition_result Table Create SQL
-- 테이블 생성 SQL - competition_result
CREATE TABLE competition_result
(
    `competition_result_no`        BIGINT     NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `competition_result_t1_m1_no`  BIGINT     NOT NULL    COMMENT '팀1 팀원1', 
    `competition_result_t1_m2_no`  BIGINT     NOT NULL    COMMENT '팀1 팀원2', 
    `competition_result_t2_m1_no`  BIGINT     NOT NULL    COMMENT '팀2 팀원1', 
    `competition_result_t2_m2_no`  BIGINT     NOT NULL    COMMENT '팀2 팀원2', 
    `competition_result_record`    INT        NOT NULL    COMMENT '경기 결과. 0은 team1 우승, 1은 무승부(다만 누군가가 중도 퇴장한 경우에만), 2는 team2 우승', 
    `competition_result_resign`    TINYINT    NULL        DEFAULT 0 COMMENT '삭제 여부. 1은 기록 삭제', 
     PRIMARY KEY (competition_result_no)
);

-- 테이블 Comment 설정 SQL - competition_result
ALTER TABLE competition_result COMMENT '경기 결과';

-- Foreign Key 설정 SQL - competition_result(competition_result_t1_m1_no) -> member(member_no)
ALTER TABLE competition_result
    ADD CONSTRAINT FK_competition_result_competition_result_t1_m1_no_member_member_ FOREIGN KEY (competition_result_t1_m1_no)
        REFERENCES member (member_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - competition_result(competition_result_t1_m1_no)
-- ALTER TABLE competition_result
-- DROP FOREIGN KEY FK_competition_result_competition_result_t1_m1_no_member_member_;

-- Foreign Key 설정 SQL - competition_result(competition_result_t1_m2_no) -> member(member_no)
ALTER TABLE competition_result
    ADD CONSTRAINT FK_competition_result_competition_result_t1_m2_no_member_member_ FOREIGN KEY (competition_result_t1_m2_no)
        REFERENCES member (member_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - competition_result(competition_result_t1_m2_no)
-- ALTER TABLE competition_result
-- DROP FOREIGN KEY FK_competition_result_competition_result_t1_m2_no_member_member_;

-- Foreign Key 설정 SQL - competition_result(competition_result_t2_m1_no) -> member(member_no)
ALTER TABLE competition_result
    ADD CONSTRAINT FK_competition_result_competition_result_t2_m1_no_member_member_ FOREIGN KEY (competition_result_t2_m1_no)
        REFERENCES member (member_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - competition_result(competition_result_t2_m1_no)
-- ALTER TABLE competition_result
-- DROP FOREIGN KEY FK_competition_result_competition_result_t2_m1_no_member_member_;

-- Foreign Key 설정 SQL - competition_result(competition_result_t2_m2_no) -> member(member_no)
ALTER TABLE competition_result
    ADD CONSTRAINT FK_competition_result_competition_result_t2_m2_no_member_member_ FOREIGN KEY (competition_result_t2_m2_no)
        REFERENCES member (member_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - competition_result(competition_result_t2_m2_no)
-- ALTER TABLE competition_result
-- DROP FOREIGN KEY FK_competition_result_competition_result_t2_m2_no_member_member_;


-- review Table Create SQL
-- 테이블 생성 SQL - review
CREATE TABLE review
(
    `review_no`                 BIGINT          NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `competition_result_no`     BIGINT          NOT NULL    COMMENT '경기 번호', 
    `review_send_member_no`     BIGINT          NOT NULL    COMMENT '리뷰 적은 멤버', 
    `review_receive_member_no`  BIGINT          NOT NULL    COMMENT '리뷰 받은 멤버', 
    `review_content`            VARCHAR(100)    NOT NULL    COMMENT '리뷰 내용', 
    `review_time`               TIMESTAMP       NULL        DEFAULT current_timestamp COMMENT '작성 시간', 
    `review_resign`             TINYINT         NULL        DEFAULT 0 COMMENT '삭제 여부. 1은 삭제', 
     PRIMARY KEY (review_no)
);

-- 테이블 Comment 설정 SQL - review
ALTER TABLE review COMMENT '짝 리뷰';

-- Foreign Key 설정 SQL - review(competition_result_no) -> competition_result(competition_result_no)
ALTER TABLE review
    ADD CONSTRAINT FK_review_competition_result_no_competition_result_competition_r FOREIGN KEY (competition_result_no)
        REFERENCES competition_result (competition_result_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - review(competition_result_no)
-- ALTER TABLE review
-- DROP FOREIGN KEY FK_review_competition_result_no_competition_result_competition_r;

-- Foreign Key 설정 SQL - review(review_send_member_no) -> member(member_no)
ALTER TABLE review
    ADD CONSTRAINT FK_review_review_send_member_no_member_member_no FOREIGN KEY (review_send_member_no)
        REFERENCES member (member_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - review(review_send_member_no)
-- ALTER TABLE review
-- DROP FOREIGN KEY FK_review_review_send_member_no_member_member_no;

-- Foreign Key 설정 SQL - review(review_receive_member_no) -> member(member_no)
ALTER TABLE review
    ADD CONSTRAINT FK_review_review_receive_member_no_member_member_no FOREIGN KEY (review_receive_member_no)
        REFERENCES member (member_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - review(review_receive_member_no)
-- ALTER TABLE review
-- DROP FOREIGN KEY FK_review_review_receive_member_no_member_member_no;


-- problem Table Create SQL
-- 테이블 생성 SQL - problem
CREATE TABLE problem
(
    `problem_no`              BIGINT         NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `problem_title`           VARCHAR(60)    NOT NULL    COMMENT '문제 이름', 
    `problem_content`         TEXT           NOT NULL    COMMENT '문제 내용', 
    `problem_time_limit`      DOUBLE         NOT NULL    COMMENT '시간 제한', 
    `problem_memory_limit`    INT            NOT NULL    COMMENT '메모리 제한', 
    `problem_submit_count`    INT            NULL        DEFAULT 0 COMMENT '제출 횟수', 
    `problem_correct_count`   INT            NULL        DEFAULT 0 COMMENT '정답 횟수', 
    `problem_input_content`   TEXT           NOT NULL    COMMENT '입력 내용', 
    `problem_output_content`  TEXT           NOT NULL    COMMENT '출력 내용', 
    `problem_source`          TEXT           NULL        COMMENT '출처', 
    `problem_resign`          TINYINT        NULL        DEFAULT 0 COMMENT '삭제 여부. 1은 삭제', 
     PRIMARY KEY (problem_no)
);

-- 테이블 Comment 설정 SQL - problem
ALTER TABLE problem COMMENT '문제';


-- algorithm_type Table Create SQL
-- 테이블 생성 SQL - algorithm_type
CREATE TABLE algorithm_type
(
    `algorithm_type_no`  BIGINT         NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `problem_no`         BIGINT         NOT NULL    COMMENT '문제 번호', 
    `algorithm_name`     VARCHAR(45)    NOT NULL    COMMENT '알고리즘 분류', 
    `algorithm_resign`   TINYINT        NULL        DEFAULT 0 COMMENT '삭제 여부. 1은 삭제', 
     PRIMARY KEY (algorithm_type_no)
);

-- 테이블 Comment 설정 SQL - algorithm_type
ALTER TABLE algorithm_type COMMENT '알고리즘 문제 분류';

-- Foreign Key 설정 SQL - algorithm_type(problem_no) -> problem(problem_no)
ALTER TABLE algorithm_type
    ADD CONSTRAINT FK_algorithm_type_problem_no_problem_problem_no FOREIGN KEY (problem_no)
        REFERENCES problem (problem_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - algorithm_type(problem_no)
-- ALTER TABLE algorithm_type
-- DROP FOREIGN KEY FK_algorithm_type_problem_no_problem_problem_no;


-- submit Table Create SQL
-- 테이블 생성 SQL - submit
CREATE TABLE submit
(
    `submit_no`              BIGINT       NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `problem_no`             BIGINT       NOT NULL    COMMENT '문제 번호', 
    `member_no`              BIGINT       NOT NULL    COMMENT '멤버 번호', 
    `competition_result_no`  BIGINT       NULL        COMMENT '경기 결과 번호. 어떤 경기의 채점 결과인지.', 
    `submit_mode`            INT          NOT NULL    COMMENT '대결 모드. 모드별로 숫자 부여. 1인 연습, 2대2 등', 
    `submit_status`          INT          NOT NULL    COMMENT '채점 현황. 0은 틀림, 1은 에러, 2는 정답', 
    `submit_code`            TEXT         NOT NULL    COMMENT '제출 코드. 제출 코드 전문 (틀린 코드도)', 
    `submit_time`            TIMESTAMP    NULL        DEFAULT current_timestamp COMMENT '채점 시간', 
    `submit_used_memory`     INT          NULL        COMMENT '사용 메모리', 
    `submit_used_time`       DOUBLE       NULL        COMMENT '소요 시간', 
     PRIMARY KEY (submit_no)
);

-- 테이블 Comment 설정 SQL - submit
ALTER TABLE submit COMMENT '채점결과';

-- Foreign Key 설정 SQL - submit(problem_no) -> problem(problem_no)
ALTER TABLE submit
    ADD CONSTRAINT FK_submit_problem_no_problem_problem_no FOREIGN KEY (problem_no)
        REFERENCES problem (problem_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - submit(problem_no)
-- ALTER TABLE submit
-- DROP FOREIGN KEY FK_submit_problem_no_problem_problem_no;

-- Foreign Key 설정 SQL - submit(member_no) -> member(member_no)
ALTER TABLE submit
    ADD CONSTRAINT FK_submit_member_no_member_member_no FOREIGN KEY (member_no)
        REFERENCES member (member_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - submit(member_no)
-- ALTER TABLE submit
-- DROP FOREIGN KEY FK_submit_member_no_member_member_no;

-- Foreign Key 설정 SQL - submit(competition_result_no) -> competition_result(competition_result_no)
ALTER TABLE submit
    ADD CONSTRAINT FK_submit_competition_result_no_competition_result_competition_r FOREIGN KEY (competition_result_no)
        REFERENCES competition_result (competition_result_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - submit(competition_result_no)
-- ALTER TABLE submit
-- DROP FOREIGN KEY FK_submit_competition_result_no_competition_result_competition_r;


-- friend Table Create SQL
-- 테이블 생성 SQL - friend
CREATE TABLE friend
(
    `friend_no`          BIGINT     NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `friend_member1_no`  BIGINT     NOT NULL    COMMENT '친구1', 
    `friend_member2_no`  BIGINT     NOT NULL    COMMENT '친구2', 
    `friend_resign`      TINYINT    NULL        DEFAULT 0 COMMENT '삭제 여부. 1은 절교', 
     PRIMARY KEY (friend_no)
);

-- 테이블 Comment 설정 SQL - friend
ALTER TABLE friend COMMENT '친구';

-- Foreign Key 설정 SQL - friend(friend_member1_no) -> member(member_no)
ALTER TABLE friend
    ADD CONSTRAINT FK_friend_friend_member1_no_member_member_no FOREIGN KEY (friend_member1_no)
        REFERENCES member (member_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - friend(friend_member1_no)
-- ALTER TABLE friend
-- DROP FOREIGN KEY FK_friend_friend_member1_no_member_member_no;

-- Foreign Key 설정 SQL - friend(friend_member2_no) -> member(member_no)
ALTER TABLE friend
    ADD CONSTRAINT FK_friend_friend_member2_no_member_member_no FOREIGN KEY (friend_member2_no)
        REFERENCES member (member_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - friend(friend_member2_no)
-- ALTER TABLE friend
-- DROP FOREIGN KEY FK_friend_friend_member2_no_member_member_no;


-- friend_request Table Create SQL
-- 테이블 생성 SQL - friend_request
CREATE TABLE friend_request
(
    `friend_request_no`              BIGINT       NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `friend_request_member_from_no`  BIGINT       NOT NULL    COMMENT '요청 보내는 멤버', 
    `friend_request_member_to_no`    BIGINT       NOT NULL    COMMENT '요청 받는 멤버', 
    `friend_request_time`            TIMESTAMP    NULL        DEFAULT current_timestamp COMMENT '요청시간', 
    `friend_request_resign`          TINYINT      NULL        DEFAULT 0 COMMENT '삭제 여부. 1: 요청 취소/요청 거절', 
     PRIMARY KEY (friend_request_no)
);

-- 테이블 Comment 설정 SQL - friend_request
ALTER TABLE friend_request COMMENT '친구 신청';

-- Foreign Key 설정 SQL - friend_request(friend_request_member_from_no) -> member(member_no)
ALTER TABLE friend_request
    ADD CONSTRAINT FK_friend_request_friend_request_member_from_no_member_member_no FOREIGN KEY (friend_request_member_from_no)
        REFERENCES member (member_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - friend_request(friend_request_member_from_no)
-- ALTER TABLE friend_request
-- DROP FOREIGN KEY FK_friend_request_friend_request_member_from_no_member_member_no;

-- Foreign Key 설정 SQL - friend_request(friend_request_member_to_no) -> member(member_no)
ALTER TABLE friend_request
    ADD CONSTRAINT FK_friend_request_friend_request_member_to_no_member_member_no FOREIGN KEY (friend_request_member_to_no)
        REFERENCES member (member_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - friend_request(friend_request_member_to_no)
-- ALTER TABLE friend_request
-- DROP FOREIGN KEY FK_friend_request_friend_request_member_to_no_member_member_no;


-- testcase Table Create SQL
-- 테이블 생성 SQL - testcase
CREATE TABLE testcase
(
    `testcase_no`      BIGINT     NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `problem_no`       BIGINT     NOT NULL    COMMENT '문제 번호', 
    `testcase_input`   TEXT       NOT NULL    COMMENT '문제 입력', 
    `testcase_output`  TEXT       NOT NULL    COMMENT '문제 출력', 
    `testcase_public`  TINYINT    NULL        DEFAULT 0 COMMENT '문제 공개. 1은 공개', 
    `testcase_resign`  TINYINT    NULL        DEFAULT 0 COMMENT '삭제 여부. 1은 삭제', 
     PRIMARY KEY (testcase_no)
);

-- 테이블 Comment 설정 SQL - testcase
ALTER TABLE testcase COMMENT '테스트케이스';

-- Foreign Key 설정 SQL - testcase(problem_no) -> problem(problem_no)
ALTER TABLE testcase
    ADD CONSTRAINT FK_testcase_problem_no_problem_problem_no FOREIGN KEY (problem_no)
        REFERENCES problem (problem_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - testcase(problem_no)
-- ALTER TABLE testcase
-- DROP FOREIGN KEY FK_testcase_problem_no_problem_problem_no;


-- problem_board Table Create SQL
-- 테이블 생성 SQL - problem_board
CREATE TABLE problem_board
(
    `problem_board_no`       INT            NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `problem_no`             BIGINT         NOT NULL    COMMENT '문제 번호', 
    `member_no`              BIGINT         NOT NULL    COMMENT '작성자', 
    `problem_board_title`    VARCHAR(60)    NOT NULL    COMMENT '제목', 
    `problem_board_content`  TEXT           NOT NULL    COMMENT '내용', 
    `problem_board_time`     TIMESTAMP      NULL        DEFAULT current_timestamp COMMENT '작성 시간', 
    `problem_board_resign`   TINYINT        NULL        DEFAULT 0 COMMENT '삭제 여부. 1은 삭제', 
     PRIMARY KEY (problem_board_no)
);

-- 테이블 Comment 설정 SQL - problem_board
ALTER TABLE problem_board COMMENT '문제 질문 게시판';

-- Foreign Key 설정 SQL - problem_board(problem_no) -> problem(problem_no)
ALTER TABLE problem_board
    ADD CONSTRAINT FK_problem_board_problem_no_problem_problem_no FOREIGN KEY (problem_no)
        REFERENCES problem (problem_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - problem_board(problem_no)
-- ALTER TABLE problem_board
-- DROP FOREIGN KEY FK_problem_board_problem_no_problem_problem_no;

-- Foreign Key 설정 SQL - problem_board(member_no) -> member(member_no)
ALTER TABLE problem_board
    ADD CONSTRAINT FK_problem_board_member_no_member_member_no FOREIGN KEY (member_no)
        REFERENCES member (member_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - problem_board(member_no)
-- ALTER TABLE problem_board
-- DROP FOREIGN KEY FK_problem_board_member_no_member_member_no;


-- review_tag Table Create SQL
-- 테이블 생성 SQL - review_tag
CREATE TABLE review_tag
(
    `review_tag_no`             BIGINT     NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `review_no`                 BIGINT     NOT NULL    COMMENT '리뷰 번호', 
    `review_tag_readability`    TINYINT    NULL        DEFAULT 0 COMMENT '가독성. 리뷰 속성값들. 기본값 0.', 
    `review_tag_naming`         TINYINT    NULL        DEFAULT 0 COMMENT '변수명', 
    `review_tag_speed`          TINYINT    NULL        DEFAULT 0 COMMENT '작성 속도', 
    `review_tag_communication`  TINYINT    NULL        DEFAULT 0 COMMENT '소통', 
     PRIMARY KEY (review_tag_no)
);

-- 테이블 Comment 설정 SQL - review_tag
ALTER TABLE review_tag COMMENT '짝 리뷰 태그들. 추후 태그들 더 추가될 예정';

-- Foreign Key 설정 SQL - review_tag(review_no) -> review(review_no)
ALTER TABLE review_tag
    ADD CONSTRAINT FK_review_tag_review_no_review_review_no FOREIGN KEY (review_no)
        REFERENCES review (review_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - review_tag(review_no)
-- ALTER TABLE review_tag
-- DROP FOREIGN KEY FK_review_tag_review_no_review_review_no;


-- problem_restriction Table Create SQL
-- 테이블 생성 SQL - problem_restriction
CREATE TABLE problem_restriction
(
    `problem_restriction_no`      BIGINT    NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `problem_restriction_python`  DOUBLE    NULL        COMMENT '파이썬 시간 제한', 
    `problem_restriction_java`    DOUBLE    NULL        COMMENT '자바 시간 제한', 
    `problem_no`                  BIGINT    NOT NULL    COMMENT '문제 번호', 
     PRIMARY KEY (problem_restriction_no)
);

-- 테이블 Comment 설정 SQL - problem_restriction
ALTER TABLE problem_restriction COMMENT '문제 언어별 제약사항(';

-- Foreign Key 설정 SQL - problem_restriction(problem_no) -> problem(problem_no)
ALTER TABLE problem_restriction
    ADD CONSTRAINT FK_problem_restriction_problem_no_problem_problem_no FOREIGN KEY (problem_no)
        REFERENCES problem (problem_no) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - problem_restriction(problem_no)
-- ALTER TABLE problem_restriction
-- DROP FOREIGN KEY FK_problem_restriction_problem_no_problem_problem_no;


