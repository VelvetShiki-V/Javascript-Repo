/*
 Navicat Premium Data Transfer

 Source Server         : local_8.3
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : tll_server_db

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 14/04/2024 20:35:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `bid` int(1) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `urls` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`bid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (1, 'http://127.0.0.1:8081/uploads/banner/1.png');
INSERT INTO `banner` VALUES (2, 'http://127.0.0.1:8081/uploads/banner/2.png');
INSERT INTO `banner` VALUES (3, 'http://127.0.0.1:8081/uploads/banner/3.png');
INSERT INTO `banner` VALUES (4, 'http://127.0.0.1:8081/uploads/banner/4.png');
INSERT INTO `banner` VALUES (5, 'http://127.0.0.1:8081/uploads/banner/5.png');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `gid` int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `category` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `desc` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `max_price` decimal(10, 2) NOT NULL,
  `stock` int UNSIGNED NOT NULL,
  `profile` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`gid`) USING BTREE,
  UNIQUE INDEX `gid`(`gid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (00001, '键盘', '前行者GX30Z真机械手感游戏键盘鼠标套装有线静音薄膜键鼠台式电脑网吧笔记本', '办公背光USB外接外设 黑色彩虹背光单键盘【加厚升级版】', 199.00, 499.00, 100, 'http://127.0.0.1:8081/uploads/goods/g1/');
INSERT INTO `goods` VALUES (00002, '羽绒服', '90%白鸭绒，儿童棒球领轻薄羽绒服73-140cm', '儿童棒球轻羽绒外套，保暖常备单品', 159.00, 199.00, 99, 'http://127.0.0.1:8081/uploads/goods/g2/');
INSERT INTO `goods` VALUES (00003, '健身器材', '办公家用Mini健身磁控车', '原创设计，小巧精致，安装便捷，收纳方便', 499.00, 899.00, 78, 'http://127.0.0.1:8081/uploads/goods/g3/');
INSERT INTO `goods` VALUES (00004, '乐器', '跟灯按弦超好玩碳纤维智能尤克里里', '指板亮灯，指引按弦。可视化学习，更高效！还有更多游戏闯关，超有乐趣，不知不觉学会弹琴。', 255.00, 654.00, 546, 'http://127.0.0.1:8081/uploads/goods/g4/');
INSERT INTO `goods` VALUES (00005, '乐器', '3秒快速拆琴轻松保养odin奥丁12半音阶口琴', '易吹性好按键灵敏音色优美全黑琴身', 329.00, 599.00, 47, 'http://127.0.0.1:8081/uploads/goods/g5/');
INSERT INTO `goods` VALUES (00006, '健身器材', '麦瑞克家用轻音智能多功能彩屏跑步机S450', '多功能跑步机，畅享彩屏', 2099.00, 3999.00, 86, 'http://127.0.0.1:8081/uploads/goods/g6/');
INSERT INTO `goods` VALUES (00007, '美食', '原产兰州，气清味美，甜百合干168克', '干嚼清甜，一煮即糯', 45.00, 79.00, 25, 'http://127.0.0.1:8081/uploads/goods/g7/');
INSERT INTO `goods` VALUES (00008, '美食', '产自核心产区宁夏中宁，枸杞258克', '粒大色红，甘醇甜糯', 36.00, 66.00, 56, 'http://127.0.0.1:8081/uploads/goods/g8/');
INSERT INTO `goods` VALUES (00009, '美食', '若羌红枣脆片138克', '片片枣干，口口甘香', 18.00, 38.00, 74, 'http://127.0.0.1:8081/uploads/goods/g9/');
INSERT INTO `goods` VALUES (00010, '美食', '竹荪25克', '菌中皇后，汤品添鲜', 28.00, 88.00, 98, 'http://127.0.0.1:8081/uploads/goods/g10/');
INSERT INTO `goods` VALUES (00011, '清洁用品', '亮碟多效合一洗涤块495g', '洗碗机专用，强力去污', 69.00, 99.00, 35, 'http://127.0.0.1:8081/uploads/goods/g11/');
INSERT INTO `goods` VALUES (00012, '服饰', '自我态度男式多功能多层格局休闲胸包', '休闲潮流男士斜挎包', 146.00, 169.00, 68, 'http://127.0.0.1:8081/uploads/goods/g12/');
INSERT INTO `goods` VALUES (00013, '服饰', '女式复古蜥蜴纹质感牛皮钱包', '钱包+卡包+零钱包，三合一多功能设计', 126.00, 173.00, 125, 'http://127.0.0.1:8081/uploads/goods/g13/');
INSERT INTO `goods` VALUES (00014, '服饰', '别致优雅男式新潮头层牛皮钥匙包', '可旋转五金挂钩，悬挂方便', 107.00, 178.00, 576, 'http://127.0.0.1:8081/uploads/goods/g14/');
INSERT INTO `goods` VALUES (00015, '服饰', '品质在内格调在外头层真皮防消磁钥匙卡包', '优质牛皮面料鳄鱼压纹纹理', 80.00, 120.00, 563, 'http://127.0.0.1:8081/uploads/goods/g15/');
INSERT INTO `goods` VALUES (00016, '服饰', '休闲潮流运动男士胸包', '轻便休闲运动斜挎胸包', 136.00, 169.00, 146, 'http://127.0.0.1:8081/uploads/goods/g16/');
INSERT INTO `goods` VALUES (00017, '数码', '平台智造小方盒智能插线板-Pro版', '内外兼修的充电利器，以一抵五，差旅标配', 79.00, 99.00, 576, 'http://127.0.0.1:8081/uploads/goods/g17/');
INSERT INTO `goods` VALUES (00018, '数码', '平台有道翻译王2.0pro', '差旅学习必备，离线翻译神器', 998.00, 1399.00, 998, 'http://127.0.0.1:8081/uploads/goods/g18/');
INSERT INTO `goods` VALUES (00019, '数码', '办公居家必备，3A3U智能插线板', '高颜值插线板，办公居家必备', 59.00, 99.00, 442, 'http://127.0.0.1:8081/uploads/goods/g19/');
INSERT INTO `goods` VALUES (00020, '数码', '平台有道翻译王青春版', '沟通无障碍，学习更轻松', 799.00, 859.00, 550, 'http://127.0.0.1:8081/uploads/goods/g20/');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `oid` int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uid` int(5) UNSIGNED ZEROFILL NOT NULL,
  `gid` int(5) UNSIGNED ZEROFILL NOT NULL,
  `status` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `count` int NOT NULL,
  `supplements` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`oid`) USING BTREE,
  INDEX `uid`(`uid` ASC) USING BTREE,
  INDEX `gid`(`gid` ASC) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`gid`) REFERENCES `goods` (`gid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (00018, 'velvet', 10001, 00012, 'unpaid', 5, '{\"color\":\"http://127.0.0.1:8081/uploads/goods/g12/3.jpg\",\"size\":\"S\"}');
INSERT INTO `orders` VALUES (00019, 'velvet', 10001, 00009, 'unpaid', 2, '{\"color\":\"http://127.0.0.1:8081/uploads/goods/g9/3.jpg\",\"size\":\"L\"}');
INSERT INTO `orders` VALUES (00020, 'velvet', 10001, 00013, 'unpaid', 4, '{\"color\":\"http://127.0.0.1:8081/uploads/goods/g13/3.jpg\",\"size\":\"M\"}');
INSERT INTO `orders` VALUES (00024, 'shiki', 10000, 00007, 'paid', 1, '{\"color\":\"http://127.0.0.1:8081/uploads/goods/g7/1.jpg\",\"size\":\"M\"}');
INSERT INTO `orders` VALUES (00026, 'shiki', 10000, 00006, 'paid', 2, '{\"color\":\"http://127.0.0.1:8081/uploads/goods/g6/3.jpg\",\"size\":\"L\"}');
INSERT INTO `orders` VALUES (00032, 'shiki', 10000, 00003, 'paid', 1, '{\"color\":\"http://127.0.0.1:8081/uploads/goods/g3/2.jpg\",\"size\":\"M\"}');
INSERT INTO `orders` VALUES (00035, 'shiki', 10000, 00002, 'paid', 2, '{\"color\":\"http://127.0.0.1:8081/uploads/goods/g2/2.jpg\",\"size\":\"M\"}');
INSERT INTO `orders` VALUES (00036, 'shiki', 10000, 00001, 'paid', 1, '{\"color\":\"http://127.0.0.1:8081/uploads/goods/g1/1.jpg\",\"size\":\"S\"}');
INSERT INTO `orders` VALUES (00037, 'shiki', 10000, 00001, 'paid', 10, '{\"color\":\"http://127.0.0.1:8081/uploads/goods/g1/1.jpg\",\"size\":\"S\"}');
INSERT INTO `orders` VALUES (00038, 'shiki', 10000, 00007, 'paid', 4, '{\"color\":\"http://127.0.0.1:8081/uploads/goods/g7/1.jpg\",\"size\":\"M\"}');
INSERT INTO `orders` VALUES (00039, 'shiki', 10000, 00007, 'paid', 3, '{\"color\":\"http://127.0.0.1:8081/uploads/goods/g7/1.jpg\",\"size\":\"L\"}');
INSERT INTO `orders` VALUES (00040, 'shiki', 10000, 00007, 'paid', 4, '{\"color\":\"http://127.0.0.1:8081/uploads/goods/g7/3.jpg\",\"size\":\"M\"}');
INSERT INTO `orders` VALUES (00041, 'shiki', 10000, 00003, 'pending', 1, '{\"color\":\"http://127.0.0.1:8081/uploads/goods/g3/3.jpg\",\"size\":\"L\"}');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uid` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `tel` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '电话',
  `prime` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '是否会员',
  PRIMARY KEY (`uid`) USING BTREE,
  UNIQUE INDEX `id`(`uid` ASC) USING BTREE,
  UNIQUE INDEX `tel`(`tel` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10058 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (10000, 'shiki', '123456', '1531', '1');
INSERT INTO `user` VALUES (10001, 'velvet', '123456', '21332432', '0');

SET FOREIGN_KEY_CHECKS = 1;
