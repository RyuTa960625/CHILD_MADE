-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: s10p12d209.czsuy60koxmn.ap-northeast-2.rds.amazonaws.com    Database: CHILDMADE
-- ------------------------------------------------------
-- Server version	5.5.5-10.6.14-MariaDB

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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `max_num` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `summary` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,3,'2024-02-15 14:43:01.000000','2024-02-15 14:43:01.000000','https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/1.png','서른이 넘도록 혼인을 못 하고 있던 어느 한 나무꾼이 나무를 하다가 숲 속에서 도망치는 사슴을 만났는데, 이 사슴이 사냥꾼이 쫓아오고 있으니 자신을 좀 숨겨달라고 애타게 말했다. 말하는 사슴을 신기하게 여긴 나무꾼은 사슴을 숨겨줬고, 뒤쫓아 온 사냥꾼을 다른 방향으로 보내서 구해주었다','선녀와 나무꾼'),(2,3,'2024-02-15 14:43:01.000000','2024-02-15 14:43:01.000000','https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/2.png','한 나무꾼이 산으로 가 나무를 찍다가 잘못하여 도끼를 연못 속에 빠뜨려 버렸다. 할 수 없이 울고 있자니 연못 속으로부터 백발노인이 나타나 금도끼·은도끼를 차례로 보여 주며, “이것이 네 것이냐?”고 물었다. 정직한 나무꾼은, “아닙니다. 제 도끼는 오래된 쇠도끼입니다.”라고 대답하였다. 이에 노인은 나무꾼의 정직함을 칭찬하며 세 도끼 모두를 주었다','금도끼 은도끼'),(3,4,'2024-02-15 14:43:01.000000','2024-02-15 14:43:01.000000','https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/3.png','Book summary','아기돼지 삼형제'),(4,3,'2024-02-15 14:43:01.000000','2024-02-15 14:43:01.000000','https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/4.png','Book summary','해님과 달님'),(5,2,'2024-02-15 14:43:01.000000','2024-02-15 14:43:01.000000','https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/5.png','Book summary','토끼와 거북이'),(6,3,'2024-02-15 14:43:01.000000','2024-02-15 14:43:01.000000','https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/6.png','Book summary','혹부리 영감'),(7,4,'2024-02-15 14:43:01.000000','2024-02-15 14:43:01.000000','https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/7.png','Book summary','흥부와 놀부'),(8,4,'2024-02-15 14:43:01.000000','2024-02-15 14:43:01.000000','https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/8.png','Book summary','별주부전'),(9,4,'2024-02-15 14:43:01.000000','2024-02-15 14:43:01.000000','https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/9.png','Book summary','견우와 직녀'),(10,4,'2024-02-15 14:43:01.000000','2024-02-15 14:43:01.000000','https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/10.png','Book summary','백설공주'),(11,4,'2024-02-15 14:43:01.000000','2024-02-15 14:43:01.000000','https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/11.png','Book summary','미운오리새끼'),(12,4,'2024-02-15 14:43:01.000000','2024-02-15 14:43:01.000000','https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/12.png','Book summary','도깨비 방망이');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cut_video`
--

DROP TABLE IF EXISTS `cut_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cut_video` (
  `video_num` int(11) NOT NULL,
  `cut_video_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `room_id` bigint(20) NOT NULL,
  PRIMARY KEY (`cut_video_id`),
  KEY `FKths8vjm0pkacgnxoraxr9uayy` (`room_id`),
  CONSTRAINT `FKths8vjm0pkacgnxoraxr9uayy` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cut_video`
--

LOCK TABLES `cut_video` WRITE;
/*!40000 ALTER TABLE `cut_video` DISABLE KEYS */;
/*!40000 ALTER TABLE `cut_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helper`
--

DROP TABLE IF EXISTS `helper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `helper` (
  `role_id` int(11) NOT NULL,
  `situation_num` int(11) NOT NULL,
  `helper_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `audio_url` varchar(255) NOT NULL,
  `helper_line` varchar(255) NOT NULL,
  `motion_url` varchar(255) NOT NULL,
  PRIMARY KEY (`helper_id`),
  KEY `FKbhng9ex5n44c9o9r0ipw9fph5` (`role_id`),
  CONSTRAINT `FKbhng9ex5n44c9o9r0ipw9fph5` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helper`
--

LOCK TABLES `helper` WRITE;
/*!40000 ALTER TABLE `helper` DISABLE KEYS */;
INSERT INTO `helper` VALUES (1,1,52,'사슴_audio_url1','사슴 역할이 대사를 해야 해요.','사슴_motion_url'),(1,1,53,'나무꾼_audio_url1','나무꾼 역할이 대사를 해야 해요.','나무꾼_motion_url'),(1,1,54,'사슴_audio_url1','사슴 역할이 대사를 해야 해요.','사슴_motion_url'),(1,1,55,'나무꾼_audio_url1','나무꾼 역할이 대사를 해야 해요.','나무꾼_motion_url'),(1,1,56,'사냥꾼_audio_url1','사냥꾼 역할이 대사를 해야 해요.','사냥꾼_motion_url'),(1,1,57,'나무꾼_audio_url1','나무꾼 역할이 대사를 해야 해요.','나무꾼_motion_url'),(1,1,58,'사냥꾼_audio_url1','사냥꾼 역할이 대사를 해야 해요.','사냥꾼_motion_url'),(1,1,59,'사슴_audio_url1','사슴 역할이 대사를 해야 해요.','사슴_motion_url'),(1,1,60,'나무꾼_audio_url1','나무꾼 역할이 대사를 해야 해요.','나무꾼_motion_url'),(1,1,61,'사냥꾼_audio_url1','사냥꾼 역할이 대사를 해야 해요.','사냥꾼_motion_url'),(1,1,62,'나무꾼_audio_url1','나무꾼 역할이 대사를 해야 해요.','나무꾼_motion_url'),(1,1,63,'사냥꾼_audio_url1','사냥꾼 역할이 대사를 해야 해요.','사냥꾼_motion_url'),(1,1,64,'나무꾼_audio_url1','나무꾼 역할이 대사를 해야 해요.','나무꾼_motion_url'),(1,1,65,'사슴_audio_url1','사슴 역할이 대사를 해야 해요.','사슴_motion_url'),(1,1,66,'나무꾼_audio_url1','나무꾼 역할이 대사를 해야 해요.','나무꾼_motion_url'),(1,1,67,'사슴_audio_url1','사슴 역할이 대사를 해야 해요.','사슴_motion_url'),(1,1,68,'사냥꾼_audio_url1','사냥꾼 역할이 대사를 해야 해요.','사냥꾼_motion_url');
/*!40000 ALTER TABLE `helper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `social_id` varchar(255) DEFAULT NULL,
  `provider_type` enum('GOOGLE','KAKAO') DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'rlarbfl0702@gmail.com','김규리','','https://lh3.googleusercontent.com/a/ACg8ocIw5VIqTvEKhNPOYvBR2uD5gdysbM3wUmZ-t6yUoW8=s96-c','110900585440875312527','GOOGLE'),(2,'wnstj1799@gmail.com','이준서','junseo','https://s3.ap-northeast-2.amazonaws.com/pj1/user/profile/2','113537229382533450477','GOOGLE');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_room`
--

DROP TABLE IF EXISTS `member_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_room` (
  `is_boss` bit(1) NOT NULL,
  `member_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `member_room_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `room_id` bigint(20) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`member_room_id`),
  KEY `FK2vflmhtgl7j9k7wivlkxbopoa` (`member_id`),
  KEY `FK2334g1d00lpn4wrsm2x4uhp6p` (`role_id`),
  KEY `FKa5u7ysd62qsjsmmr48sp18e28` (`room_id`),
  CONSTRAINT `FK2334g1d00lpn4wrsm2x4uhp6p` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `FK2vflmhtgl7j9k7wivlkxbopoa` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKa5u7ysd62qsjsmmr48sp18e28` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_room`
--

LOCK TABLES `member_room` WRITE;
/*!40000 ALTER TABLE `member_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `book_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`),
  KEY `FKo6vcoufchqo7kemqqynxorna3` (`book_id`),
  CONSTRAINT `FKo6vcoufchqo7kemqqynxorna3` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,1,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/1.png','나무꾼'),(1,2,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/2.png','사슴'),(1,3,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/3.png','사냥꾼'),(2,4,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/4.png','산신령'),(2,5,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/5.png','착한 나무꾼'),(2,6,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/6.png','욕심쟁이 나무꾼'),(3,7,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/7.png','첫째 돼지'),(3,8,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/8.png','둘째 돼지'),(3,9,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/9.png','셋째 돼지'),(3,10,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/10.png','늑대'),(4,11,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/11.png','오빠'),(4,12,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/12.png','여동생'),(4,13,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/13.png','호랑이'),(5,14,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/14.png','토끼'),(5,15,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/15.png','거북이'),(6,16,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/16.png','착한 혹부리 영감'),(6,17,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/17.png','나쁜 혹부리 영감'),(6,18,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/18.png','도깨비'),(7,19,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/1.png','흥부'),(8,20,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/1.png','거북이'),(9,21,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/1.png','견우'),(10,22,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/1.png','백설공주'),(11,23,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/1.png','엄마오리'),(12,24,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/role/1.png','도깨비');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `book_id` int(11) NOT NULL,
  `cur_num` int(11) NOT NULL,
  `room_status` tinyint(4) NOT NULL CHECK (`room_status` between 0 and 2),
  `created_at` datetime(6) NOT NULL,
  `room_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) NOT NULL,
  `room_session_name` varchar(255) NOT NULL,
  PRIMARY KEY (`room_id`),
  KEY `FKvokddjbkrl2em84s9hctetmk` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,1,1,'2024-02-15 10:24:42.099766',1,'2024-02-15 10:24:46.374113','4731ea92-c078-4229-9419-b325bd0983a1'),(2,1,1,'2024-02-15 10:28:18.904277',2,'2024-02-15 10:28:23.084044','8e2f8c3d-5c6e-4755-861e-f8455ce22f2b'),(2,1,1,'2024-02-15 10:28:45.524236',3,'2024-02-15 10:28:49.684761','ca6958b7-9af6-4e94-9859-5d6531a8634e'),(1,3,0,'2024-02-15 12:23:43.784590',4,'2024-02-15 13:13:53.728287','dff2de3e-dee2-402a-ad91-411441265d29'),(1,1,1,'2024-02-15 12:24:16.098824',5,'2024-02-15 12:24:20.757566','01b1a504-f24d-44ba-bb38-bdc63281dd5a'),(1,1,1,'2024-02-15 12:32:11.721553',6,'2024-02-15 12:32:16.849498','2116c950-ae1c-4331-bc08-b278a933a381'),(1,1,1,'2024-02-15 12:50:16.738026',7,'2024-02-15 12:50:20.978371','a7e015a6-5880-44f8-9111-9aff7a635b18'),(1,1,1,'2024-02-15 13:01:14.507635',8,'2024-02-15 13:01:19.090507','8e3be26d-2a01-4d30-8d78-6eaa70665c76'),(1,1,1,'2024-02-15 13:06:20.644588',9,'2024-02-15 13:06:26.340190','209329f0-20fd-479a-887c-9d399f3ac7d0'),(1,1,1,'2024-02-15 13:06:31.747760',10,'2024-02-15 13:06:36.792959','0e812101-c1a7-4249-82e4-8158411bbecb'),(1,1,1,'2024-02-15 13:10:43.283376',11,'2024-02-15 13:10:47.509704','f723abb3-e573-473c-9f97-6384b85f35a6'),(1,3,0,'2024-02-15 13:11:06.795424',12,'2024-02-15 13:17:31.732972','be37b480-e5ad-4100-aced-67a8e3fc9780'),(1,1,1,'2024-02-15 13:14:12.077823',13,'2024-02-15 13:14:16.434119','1bb15334-1e55-4050-8612-d9e5211514b4'),(1,1,1,'2024-02-15 13:17:53.911221',14,'2024-02-15 13:17:58.280861','aa36b704-11c0-41a9-b37f-b8e7c80796b8'),(1,1,1,'2024-02-15 13:20:20.891879',15,'2024-02-15 13:20:25.157987','4a66163b-ca89-45c4-b4ae-523546258bf3'),(1,1,1,'2024-02-15 13:23:27.019913',16,'2024-02-15 13:23:31.020530','3f5ee916-9063-48ee-b160-cf2444531544'),(1,1,1,'2024-02-15 13:37:39.073176',17,'2024-02-15 13:37:43.290385','1b2aef49-4eeb-4aac-b7fe-eea813ad723a'),(1,1,1,'2024-02-15 13:38:32.012171',18,'2024-02-15 13:38:36.012290','c9fd43a6-d2af-4f58-911c-9e995fd6ac97'),(1,1,2,'2024-02-15 13:43:11.543127',19,'2024-02-15 13:45:12.993973','c8ad6ab4-a5b4-45e2-a926-058d683a56c5'),(1,1,1,'2024-02-15 14:09:50.176691',20,'2024-02-15 14:09:50.176691','c058b67b-0f84-4e94-b488-26ebf0579e65'),(1,1,1,'2024-02-15 14:12:53.665805',21,'2024-02-15 14:12:53.665805','e7c214be-333b-45e0-9ac1-9915233cc3b9'),(1,1,1,'2024-02-15 14:15:35.708710',22,'2024-02-15 14:15:35.708710','64bc0261-c5a0-4406-9513-8166525bb1b8'),(1,1,1,'2024-02-15 14:15:38.665551',23,'2024-02-15 14:15:38.665551','076a1f97-579a-4dad-b0a2-54bbde0dce13'),(1,1,1,'2024-02-15 14:16:31.709849',24,'2024-02-15 14:16:31.709849','5ce971b3-5e33-4656-a1c0-0fe6670986e6'),(1,1,2,'2024-02-15 14:16:33.575623',25,'2024-02-15 14:18:33.540654','90b00d90-d28f-4720-bd09-010cef56d3fe'),(1,1,1,'2024-02-15 14:16:34.845711',26,'2024-02-15 14:16:34.845711','5fd7a87e-58c0-47b8-bc37-da7c9aac43ec'),(1,1,1,'2024-02-15 14:24:09.908971',27,'2024-02-15 14:24:09.908971','6c4b159d-703b-4bb6-bb25-793e29fb1264');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `script`
--

DROP TABLE IF EXISTS `script`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `script` (
  `book_id` int(11) NOT NULL,
  `branch_num` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `script_num` int(11) NOT NULL,
  `script_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `background_url` varchar(255) DEFAULT NULL,
  `script_line` varchar(255) NOT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`script_id`),
  KEY `FKhl7yspbi2vitlr3fpuxycyvvq` (`book_id`),
  KEY `FKlv4inwfdmtc1xg16ju3gg5o9i` (`role_id`),
  CONSTRAINT `FKhl7yspbi2vitlr3fpuxycyvvq` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  CONSTRAINT `FKlv4inwfdmtc1xg16ju3gg5o9i` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `script`
--

LOCK TABLES `script` WRITE;
/*!40000 ALTER TABLE `script` DISABLE KEYS */;
INSERT INTO `script` VALUES (1,1,2,1,69,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/1.png','나무꾼님! 나무꾼님! 저를 좀 도와주세요!',NULL),(1,1,1,2,70,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/2.png','사슴아 무슨 일이니?',NULL),(1,1,2,3,71,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/3.png','사냥꾼이 저를 쫓아오고 있어요!',NULL),(1,1,1,4,72,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/4.png','사슴아 이쪽으로 와서 숨으렴.',NULL),(1,1,3,5,73,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/5.png','혹시 이 쪽으로 사슴 한 마리 오지 않았소?',NULL),(1,1,1,6,74,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/6.png','아, 사슴이라면 저쪽으로 가는 것을 보았소.',NULL),(1,1,3,7,75,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/7.png','알려 주셔서 감사하오! 사슴 이놈! 게섰거라',NULL),(1,1,2,8,76,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/8.png','나무꾼님 저를 숨겨주셔서 너무 감사 드려요.',NULL),(1,1,1,9,77,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/9.png','사슴아 그거 별거 아니야. 엇 사냥꾼이 다시 돌아온다 숨으렴.',NULL),(1,1,3,10,78,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/10.png','나무꾼씨 저쪽에 사슴은 없고 낭떠러지가 있소.',NULL),(1,1,1,11,79,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/11.png','앗 그럼 저도 모르겠는데요? 건승하시길... 촤핫',NULL),(1,1,3,12,80,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/12.png','에잇 괜히 시간 낭비를 했네. 궁시렁.',NULL),(1,1,1,13,81,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/13.png','훠이 훠이, 사냥꾼이 드디어 멀리 갔네. 이제 나와도 돼 사슴아',NULL),(1,1,2,14,82,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/14.png','휴... 덕분에 살았네요. 너무 감사해요 나무꾼님!',NULL),(1,1,1,15,83,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/15.png','사슴아, 그거 별거 아니야. 이제 얼른 도망가렴.',NULL),(1,1,2,16,84,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/16.png','이 은혜 잊지 않을게요. 감사해요. 슝!',NULL),(1,1,3,17,85,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/background/17.png','오늘 사슴 잡기는 실패네... 유유',NULL);
/*!40000 ALTER TABLE `script` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `member_id` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `video_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `video_title` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`video_id`),
  KEY `FKt1qraed5ypqn1u5s3jiq0xu1i` (`member_id`),
  CONSTRAINT `FKt1qraed5ypqn1u5s3jiq0xu1i` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (1,'2024-02-15 14:47:39.000000','2024-02-15 14:47:39.000000',7,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/1.png','나무꾼','선녀와 나무꾼','https://pj1.s3.ap-northeast-2.amazonaws.com/video/1.mp4'),(1,'2024-02-15 14:47:39.000000','2024-02-15 14:47:39.000000',8,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/2.png','산신령','금도끼 은도끼','https://pj1.s3.ap-northeast-2.amazonaws.com/video/1.mp4'),(1,'2024-02-15 14:47:39.000000','2024-02-15 14:47:39.000000',9,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/3.png','늑대','아기돼지 삼형제','https://pj1.s3.ap-northeast-2.amazonaws.com/video/1.mp4'),(1,'2024-02-15 14:47:39.000000','2024-02-15 14:47:39.000000',10,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/4.png','오빠','해님과 달님','https://pj1.s3.ap-northeast-2.amazonaws.com/video/1.mp4'),(1,'2024-02-15 14:47:39.000000','2024-02-15 14:47:39.000000',11,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/5.png','토끼','토끼와 거북이','https://pj1.s3.ap-northeast-2.amazonaws.com/video/1.mp4'),(1,'2024-02-15 14:47:39.000000','2024-02-15 14:47:39.000000',12,'https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/6.png','도깨비','혹부리 영감','https://pj1.s3.ap-northeast-2.amazonaws.com/video/1.mp4');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-15 23:49:28
