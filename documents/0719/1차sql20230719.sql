CREATE DATABASE  IF NOT EXISTS `varabc` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `varabc`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: varabc
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `algorithm_type`
--

DROP TABLE IF EXISTS `algorithm_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `algorithm_type` (
  `algorithm_type_no` bigint NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `problem_no` bigint NOT NULL COMMENT '문제 번호',
  `algorithm_name` varchar(45) NOT NULL COMMENT '알고리즘 분류',
  `algorithm_resign` tinyint DEFAULT '0' COMMENT '삭제 여부. 1은 삭제',
  PRIMARY KEY (`algorithm_type_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='알고리즘 문제 분류';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `algorithm_type`
--

LOCK TABLES `algorithm_type` WRITE;
/*!40000 ALTER TABLE `algorithm_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `algorithm_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competition_result`
--

DROP TABLE IF EXISTS `competition_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competition_result` (
  `competition_result_no` bigint NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `competition_result_t1_m1_no` bigint NOT NULL COMMENT '팀1 팀원1',
  `competition_result_t1_m2_no` bigint NOT NULL COMMENT '팀1 팀원2',
  `competition_result_t2_m1_no` bigint NOT NULL COMMENT '팀2 팀원1',
  `competition_result_t2_m2_no` bigint NOT NULL COMMENT '팀2 팀원2',
  `competition_result_record` int NOT NULL COMMENT '경기 결과. 0은 team1 우승, 1은 무승부(다만 누군가가 중도 퇴장한 경우에만), 2는 team2 우승',
  `competition_result_resign` tinyint DEFAULT '0' COMMENT '삭제 여부. 1은 기록 삭제',
  PRIMARY KEY (`competition_result_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='경기 결과';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competition_result`
--

LOCK TABLES `competition_result` WRITE;
/*!40000 ALTER TABLE `competition_result` DISABLE KEYS */;
/*!40000 ALTER TABLE `competition_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `friend_no` bigint NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `friend_member1_no` bigint NOT NULL COMMENT '친구1',
  `friend_member2_no` bigint NOT NULL COMMENT '친구2',
  `friend_resign` tinyint DEFAULT '0' COMMENT '삭제 여부. 1은 절교',
  PRIMARY KEY (`friend_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='친구';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_request`
--

DROP TABLE IF EXISTS `friend_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_request` (
  `friend_request_no` bigint NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `friend_request_member_to_no` bigint NOT NULL COMMENT '요청 보내는 멤버',
  `friend_request_member_from_no` bigint NOT NULL COMMENT '요청 받는 멤버',
  `friend_request_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '요청시간',
  `friend_request_resign` tinyint DEFAULT '0' COMMENT '삭제 여부. 1 요청 취소/요청 거절',
  PRIMARY KEY (`friend_request_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='친구 신청';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_request`
--

LOCK TABLES `friend_request` WRITE;
/*!40000 ALTER TABLE `friend_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_no` bigint NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `member_nickname` varchar(60) NOT NULL COMMENT '닉네임',
  `member_email` varchar(30) NOT NULL COMMENT '이메일',
  `member_exp` int DEFAULT '0' COMMENT '경험치',
  `member_admin` tinyint DEFAULT '0' COMMENT '관리 권한. 1은 관리자',
  `member_resign` tinyint DEFAULT '0' COMMENT '삭제 여부. 1은 탈퇴',
  `member_token` varchar(100) DEFAULT NULL COMMENT '토큰',
  `member_image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`member_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='회원';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problem`
--

DROP TABLE IF EXISTS `problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problem` (
  `problem_no` bigint NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `problem_title` varchar(60) NOT NULL COMMENT '문제 이름',
  `problem_content` text NOT NULL COMMENT '문제 내용',
  `problem_time_limit` double NOT NULL COMMENT '시간 제한',
  `problem_memory_limit` int NOT NULL COMMENT '메모리 제한',
  `problem_submit_count` int DEFAULT '0' COMMENT '제출 횟수',
  `problem_correct_count` int DEFAULT '0' COMMENT '정답 횟수',
  `problem_input_content` text NOT NULL COMMENT '입력 내용',
  `problem_output_content` text NOT NULL COMMENT '출력 내용',
  `problem_source` text COMMENT '출처',
  `problem_resign` tinyint DEFAULT '0' COMMENT '삭제 여부. 1은 삭제',
  PRIMARY KEY (`problem_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='문제';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem`
--

LOCK TABLES `problem` WRITE;
/*!40000 ALTER TABLE `problem` DISABLE KEYS */;
/*!40000 ALTER TABLE `problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problem_board`
--

DROP TABLE IF EXISTS `problem_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problem_board` (
  `problem_board_no` int NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `problem_no` int NOT NULL COMMENT '문제 번호',
  `problem_board_title` varchar(60) NOT NULL COMMENT '제목',
  `problem_board_content` text NOT NULL COMMENT '내용',
  `member_no` int NOT NULL COMMENT '작성자',
  `problem_board_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성 시간',
  `problem_board_resign` tinyint DEFAULT '0' COMMENT '삭제 여부. 1은 삭제',
  PRIMARY KEY (`problem_board_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='문제 질문 게시판';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_board`
--

LOCK TABLES `problem_board` WRITE;
/*!40000 ALTER TABLE `problem_board` DISABLE KEYS */;
/*!40000 ALTER TABLE `problem_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_no` int NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `competition_no` int NOT NULL COMMENT '경기 번호',
  `review_send_member_no` int NOT NULL COMMENT '리뷰 적은 멤버',
  `review_receive_member_no` int NOT NULL COMMENT '리뷰 받은 멤버',
  `review_content` varchar(100) NOT NULL COMMENT '리뷰 내용',
  `review_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성 시간',
  `review_tag` varchar(45) NOT NULL COMMENT '태그. 프론트단에서 입력값 한정해주면/ 또는 이건 테이블로 빼야할듯',
  `review_resign` tinyint DEFAULT '0' COMMENT '삭제 여부. 1은 삭제',
  PRIMARY KEY (`review_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='짝 리뷰';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_tag`
--

DROP TABLE IF EXISTS `review_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_tag` (
  `review_tag_no` bigint NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `review_no` bigint NOT NULL COMMENT '리뷰 번호',
  `review_tag_readability` tinyint DEFAULT '0' COMMENT '가독성. 리뷰 속성값들. 기본값 0.',
  `review_tag_naming` tinyint DEFAULT '0' COMMENT '변수명',
  `review_tag_speed` tinyint DEFAULT '0' COMMENT '작성 속도',
  `review_tag_communication` tinyint DEFAULT '0' COMMENT '소통',
  PRIMARY KEY (`review_tag_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='짝 리뷰 태그들. 추후 태그들 더 추가될 예정';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_tag`
--

LOCK TABLES `review_tag` WRITE;
/*!40000 ALTER TABLE `review_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submit`
--

DROP TABLE IF EXISTS `submit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submit` (
  `submit_no` bigint NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `problem_no` bigint NOT NULL COMMENT '문제 번호',
  `member_no` bigint NOT NULL COMMENT '멤버 번호',
  `submit_mode` int NOT NULL COMMENT '대결 모드. 모드별로 숫자 부여. 1대1, 2대2 등',
  `submit_status` tinyint NOT NULL COMMENT '채점 현황. 0은 틀림, 1은 에러, 2는 정답',
  `submit_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '채점 시간',
  `submit_code` text NOT NULL COMMENT '제출 코드. 제출 코드 전문 (틀린 코드도)',
  `competition_result_no` bigint DEFAULT NULL COMMENT '경기 결과 번호. 어떤 경기의 채점 결과인지.',
  `submit_used_memory` int DEFAULT NULL COMMENT '사용 메모리',
  `submit_used_time` double DEFAULT NULL COMMENT '소요 시간',
  PRIMARY KEY (`submit_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='채점결과';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submit`
--

LOCK TABLES `submit` WRITE;
/*!40000 ALTER TABLE `submit` DISABLE KEYS */;
/*!40000 ALTER TABLE `submit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testcase`
--

DROP TABLE IF EXISTS `testcase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testcase` (
  `testcase_no` bigint NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `problem_no` bigint NOT NULL COMMENT '문제 번호',
  `testcase_input` text NOT NULL COMMENT '문제 입력',
  `testcase_output` text NOT NULL COMMENT '문제 출력',
  `testcase_public` tinyint DEFAULT '0' COMMENT '문제 공개 여부. 1은 공개',
  `testcase_resign` tinyint DEFAULT '0' COMMENT '삭제 여부. 1은 삭제',
  PRIMARY KEY (`testcase_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='테스트케이스';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testcase`
--

LOCK TABLES `testcase` WRITE;
/*!40000 ALTER TABLE `testcase` DISABLE KEYS */;
/*!40000 ALTER TABLE `testcase` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-19 13:12:06
