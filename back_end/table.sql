CREATE DATABASE bookDB;

CREATE TABLE `customers` (
    `custKey` INT AUTO_INCREMENT PRIMARY KEY,
    `userid` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `userpwd` VARCHAR(150) NOT NULL,
    `nickname` VARCHAR(15) NOT NULL,
    `age` INT(3) NULL,
    `gender` CHAR NULL,
    `contact` INT(11) NULL COMMENT '구매희망도서 등록시 사용',
    `grade` INT(2) NULL DEFAULT NULL,
    `point` INT(3) NULL DEFAULT 0 COMMENT '평균값(1등급:4~5점/2등급:3~4/3등급:2~3/4등급:1~2/5등급:0~1)'
);

CREATE TABLE `address` (
    `addrKey` INT AUTO_INCREMENT,
    `custKey` INT NOT NULL,
    `name` VARCHAR(15) NOT NULL,
    `tel` VARCHAR(15) NOT NULL,
    `postcode` VARCHAR(6) NOT NULL,
    `addr` VARCHAR(300) NOT NULL,
    `addrDetail` VARCHAR(100) NOT NULL,
    `default` CHAR NULL DEFAULT 'N',
    PRIMARY KEY (`addrKey`, `custKey`),
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`)
);

CREATE TABLE `buyerBook` (
    `itemBuyKey` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'PK(구매희망도서)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `itemTitle` VARCHAR(30) NOT NULL,
    `author` VARCHAR(20) NOT NULL,
    `publisher` VARCHAR(20) NOT NULL,
    `expiry` INT NOT NULL,
    `aucStatus` INT NOT NULL DEFAULT 0 COMMENT '낙찰(1)//진행중(2)/기한만료(3)/취소(삭제)',
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`)
);
CREATE TABLE `SellerBook` (
    `itemSellKey` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'PK(판매희망도서)',
    `itemBuyKey` INT NOT NULL COMMENT 'FK(구매희망도서)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `sellerKey` INT NOT NULL COMMENT '판매자',
    `itemImg` VARCHAR(600) NOT NULL,
    `damage` INT NOT NULL COMMENT '체크리스트 갯수별 등급 (0:최상, 1:상, 2-3:중)',
    `date` INT NOT NULL,
    `price` INT(8) NOT NULL COMMENT '판매희망가',
    FOREIGN KEY (`itemBuyKey`) REFERENCES `buyerBook` (`itemBuyKey`),
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`),
    FOREIGN KEY (`sellerKey`) REFERENCES `customers` (`custKey`)
);
CREATE TABLE `orders` (
    `itemKey` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'PK(주문고유번호)',
    `itemSellKey` INT NOT NULL COMMENT 'FK(판매희망도서)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `sellerKey` INT NOT NULL COMMENT '판매자',
    `price` VARCHAR(10) NOT NULL,
    `name` VARCHAR(15) NOT NULL,
    `tel` VARCHAR(15) NOT NULL,
    `postcode` VARCHAR(6) NOT NULL,
    `addr` VARCHAR(300) NOT NULL,
    `addrDetail` VARCHAR(100) NOT NULL,
    `status` VARCHAR(20) NULL COMMENT '논의요망(보류)',
    FOREIGN KEY (`itemSellKey`) REFERENCES `SellerBook` (`itemSellKey`),
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`),
    FOREIGN KEY (`sellerKey`) REFERENCES `SellerBook` (`sellerKey`)
);



CREATE TABLE `enquiry` (
    `boardKey` INT AUTO_INCREMENT PRIMARY KEY,
    `custKey` INT NOT NULL,
    `date` INT NOT NULL COMMENT '질문:자동으로 들어오는 값 NULL or NOT NULL?',
    `boardTitle` VARCHAR(100) NOT NULL,
    `Enquiry` VARCHAR(400) NOT NULL,
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`)
);

CREATE TABLE `admin` (
    `adminKey` INT AUTO_INCREMENT PRIMARY KEY,
    `userid` VARCHAR(15) NOT NULL,
    `username` VARCHAR(15) NOT NULL,
    `userpwd` VARCHAR(150) NOT NULL
);



CREATE TABLE `review` (
    `reviewKey` INT AUTO_INCREMENT PRIMARY KEY COMMENT '논의요망(필요한지?)',
    `itemKey` INT NOT NULL COMMENT 'FK(주문)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `sellerKey` INT NOT NULL COMMENT '판매자',
    `satisfaction` INT NOT NULL COMMENT '1~5점',
    `repurchase` INT NOT NULL COMMENT '1~5점',
    `review` VARCHAR(400) NULL,
    FOREIGN KEY (`itemKey`) REFERENCES `orders` (`itemKey`),
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`),
    FOREIGN KEY (`sellerKey`) REFERENCES `customers` (`custKey`)
);

CREATE TABLE `reply` (
    `replayKey` INT AUTO_INCREMENT PRIMARY KEY,
    `boardKey` INT NOT NULL,
    `adminKey` INT NOT NULL,
    `date` INT NOT NULL,
    `reply` VARCHAR(400) NOT NULL,
    FOREIGN KEY (`boardKey`) REFERENCES `enquiry` (`boardKey`),
    FOREIGN KEY (`adminKey`) REFERENCES `admin` (`adminKey`)
);
